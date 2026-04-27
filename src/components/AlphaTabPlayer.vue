<template>
  <div class="player-container">
    <!-- 音色切換 Tab -->
    <div class="tone-tabs" role="tablist" aria-label="音色切換">
      <button
        v-for="tone in TONES"
        :key="tone.id"
        class="tone-tab"
        :class="{ active: currentTone === tone.id }"
        role="tab"
        :aria-selected="currentTone === tone.id"
        :id="`tone-tab-${tone.id}`"
        @click="changeTone(tone.id)"
      >
        {{ tone.name }}
      </button>
    </div>

    <!-- SoundFont 載入進度 -->
    <div v-show="soundFontLoading" class="loading-indicator">
      <div style="width: 100%; text-align: center;">
        <div class="progress-text">正在載入音色資源...</div>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: soundFontPercent + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 樂譜顯示區 (AlphaTab 掛載於此 div，使用 template ref) -->
    <div class="score-display" ref="alphaTabContainer">
      <div v-if="scoreLoading" class="loading-indicator" id="score-loading">
        <span class="loading-spinner"></span>
        <span>載入樂譜中...</span>
      </div>
    </div>

    <!-- 播放控制列 -->
    <div class="player-controls">
      <!-- 主要播放按鈕 -->
      <div class="controls-row">
        <button class="control-btn" title="後退" aria-label="後退至上一小節" @click="onPrev">◀</button>
        <button class="control-btn play-btn" id="btn-play" :title="isPlaying ? '暫停' : '播放'" :aria-label="isPlaying ? '暫停' : '播放'" @click="onPlayPause">
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
        <button class="control-btn" title="停止" aria-label="停止播放" @click="onStop">⏹</button>
        <button class="control-btn" title="前進" aria-label="前進至下一小節" @click="onNext">▶▶</button>
        <button class="control-btn" :class="{ active: isLooping }" title="循環" aria-label="段落循環" @click="onToggleLoop">🔁</button>
      </div>

      <!-- 速度控制 -->
      <div class="controls-row">
        <div class="control-slider">
          <label for="speed-slider">速度</label>
          <input
            type="range"
            id="speed-slider"
            min="25"
            max="200"
            :value="speed"
            step="5"
            @input="onSpeedChange"
          >
          <span class="slider-value">{{ speed }}%</span>
        </div>
      </div>

      <!-- 移調控制 -->
      <div class="controls-row">
        <div class="transpose-control">
          <label>移調</label>
          <div class="transpose-direction" role="radiogroup" aria-label="移調方向">
            <label class="radio-label">
              <input type="radio" name="transpose-dir" value="up" v-model="transposeDir" @change="applyTranspose"> 升
            </label>
            <label class="radio-label">
              <input type="radio" name="transpose-dir" value="down" v-model="transposeDir" @change="applyTranspose"> 降
            </label>
          </div>
          <select id="transpose-select" aria-label="移調音程" v-model="transposeIndex" @change="applyTranspose">
            <option v-for="(iv, i) in INTERVALS" :key="i" :value="i">{{ iv.name }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as alphaTab from '@coderline/alphatab'

const props = defineProps({
  /** 曲目資料物件（來自 manifest） */
  song: {
    type: Object,
    required: true,
  },
})

// ─── 常數定義 ───────────────────────────────────────────────
const TONES = [
  { id: 'piano', name: '🎹 鋼琴', label: 'Piano' },
  { id: 'flute', name: '🎵 長笛', label: 'Flute' },
  { id: 'strings', name: '🎻 弦樂', label: 'Strings' },
]

const INTERVALS = [
  { name: '原調', semitones: 0 },
  { name: '小二度 (1個半音)', semitones: 1 },
  { name: '大二度 (2個半音)', semitones: 2 },
  { name: '小三度 (3個半音)', semitones: 3 },
  { name: '大三度 (4個半音)', semitones: 4 },
  { name: '完全四度 (5個半音)', semitones: 5 },
  { name: '增四度 (6個半音)', semitones: 6 },
  { name: '減五度 (6個半音)', semitones: 6 },
  { name: '完全五度 (7個半音)', semitones: 7 },
  { name: '增五度 (8個半音)', semitones: 8 },
  { name: '小六度 (8個半音)', semitones: 8 },
  { name: '大六度 (9個半音)', semitones: 9 },
  { name: '增六度 (10個半音)', semitones: 10 },
  { name: '小七度 (10個半音)', semitones: 10 },
  { name: '大七度 (11個半音)', semitones: 11 },
  { name: '完全八度 (12個半音)', semitones: 12 },
]

// ─── Template Refs ───────────────────────────────────────────
/** AlphaTab 掛載容器的 DOM ref */
const alphaTabContainer = ref(null)

// ─── 響應式狀態 ──────────────────────────────────────────────
const currentTone = ref('piano')
const isPlaying = ref(false)
const isLooping = ref(false)
const speed = ref(100)
const transposeDir = ref('up')
const transposeIndex = ref(0)
const scoreLoading = ref(true)
const soundFontLoading = ref(false)
const soundFontPercent = ref(0)

// ─── AlphaTab 實例 ────────────────────────────────────────────
let alphaTabApi = null

// ─── AlphaTab 初始化 ─────────────────────────────────────────
/**
 * 解析 MusicXML 中標記為白色的隱藏音符
 * @param {string} filePath
 * @returns {Promise<Set<string>>}
 */
async function parseHiddenNotes(filePath) {
  const hiddenSet = new Set()
  try {
    const response = await fetch(filePath)
    const xmlText = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    const measures = xmlDoc.querySelectorAll('measure')
    measures.forEach((measure, measureIndex) => {
      const notes = measure.querySelectorAll('note')
      let noteIndex = 0
      notes.forEach((note) => {
        const color = note.getAttribute('color')
        if (color && color.toUpperCase() === '#FFFFFF') {
          hiddenSet.add(`${measureIndex}-${noteIndex}`)
        }
        noteIndex++
      })
    })
  } catch (e) {
    console.warn('無法解析 MusicXML 隱藏標記：', e)
  }
  return hiddenSet
}

/**
 * 隱藏樂譜中標記為白色音符
 * @param {Object} score - AlphaTab Score 物件
 * @param {Set<string>} hiddenSet
 */
function hideMarkedNotes(score, hiddenSet) {
  if (!hiddenSet || hiddenSet.size === 0) return
  for (const track of score.tracks) {
    for (const staff of track.staves) {
      staff.bars.forEach((bar, measureIndex) => {
        let noteIndex = 0
        for (const voice of bar.voices) {
          for (const beat of voice.beats) {
            for (const note of beat.notes) {
              const key = `${measureIndex}-${noteIndex}`
              if (hiddenSet.has(key)) {
                note.isVisible = false
              }
              noteIndex++
            }
          }
        }
      })
    }
  }
}

/**
 * 銷毀現有 AlphaTab 實例
 */
function destroyAlphaTab() {
  if (alphaTabApi) {
    alphaTabApi.destroy()
    alphaTabApi = null
  }
}

/**
 * 初始化 AlphaTab（使用 /* @vite-ignore *\/ 讓瀏覽器在 runtime 解析，
 * 不讓 Vite 嘗試打包 AlphaTab 的複雜模組）
 */
async function initAlphaTab() {
  if (!alphaTabContainer.value) return

  scoreLoading.value = true
  soundFontLoading.value = false
  soundFontPercent.value = 0

  try {
    // 取得目前音色的檔案路徑
    const filePath = props.song.tones?.[currentTone.value]
    if (!filePath) {
      alphaTabContainer.value.innerHTML = `<div class="error-message">找不到 ${currentTone.value} 音色的樂譜檔案</div>`
      scoreLoading.value = false
      return
    }

    // 銷毀舊實例
    destroyAlphaTab()

    // 預先解析隱藏音符
    const hiddenNotes = await parseHiddenNotes(filePath)

    // 初始化 AlphaTab API，傳入 Vue template ref 的 DOM 元素
    // 字體與 SoundFont 路徑由 @coderline/alphatab-vite 插件自動管理
    alphaTabApi = new alphaTab.AlphaTabApi(alphaTabContainer.value, {
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont: '/soundfont/sonivox.sf2',
      },
      display: {
        layoutMode: alphaTab.LayoutMode.Page,
      },
    })

    // SoundFont 載入進度
    alphaTabApi.soundFontLoad.on((e) => {
      soundFontLoading.value = true
      soundFontPercent.value = Math.round((e.loaded / e.total) * 100)
      if (soundFontPercent.value >= 100) {
        setTimeout(() => {
          soundFontLoading.value = false
        }, 500)
      }
    })

    // 樂譜載入完成 — 套用隱藏音符
    alphaTabApi.scoreLoaded.on((score) => {
      scoreLoading.value = false
      hideMarkedNotes(score, hiddenNotes)
    })

    // 播放狀態變化
    alphaTabApi.playerStateChanged.on((e) => {
      isPlaying.value = e.state === 1 // 1 = Playing
    })

    // 套用目前速度（防止音色切換後速度被重置）
    alphaTabApi.playbackSpeed = speed.value / 100

    // 載入樂譜檔案（所有事件完成綁定後再載入）
    alphaTabApi.load(filePath)
  } catch (error) {
    console.error('AlphaTab 初始化失敗：', error)
    if (alphaTabContainer.value) {
      alphaTabContainer.value.innerHTML = `<div class="error-message">樂譜載入失敗：${error.message}</div>`
    }
    scoreLoading.value = false
  }
}

// ─── 控制事件處理 ─────────────────────────────────────────────
function onPlayPause() {
  alphaTabApi?.playPause()
}

function onStop() {
  if (alphaTabApi) {
    alphaTabApi.stop()
    isPlaying.value = false
  }
}

function onNext() {
  alphaTabApi?.moveToNextMeasure()
}

function onPrev() {
  alphaTabApi?.moveToPreviousMeasure()
}

function onToggleLoop() {
  isLooping.value = !isLooping.value
  if (alphaTabApi) {
    alphaTabApi.isLooping = isLooping.value
  }
}

function onSpeedChange(e) {
  speed.value = parseInt(e.target.value)
  if (alphaTabApi) {
    alphaTabApi.playbackSpeed = speed.value / 100
  }
}

function applyTranspose() {
  if (!alphaTabApi) return
  const interval = INTERVALS[transposeIndex.value]
  if (!interval) return
  const direction = transposeDir.value === 'down' ? -1 : 1
  const semitones = interval.semitones * direction
  const tracks = alphaTabApi.tracks
  if (tracks && tracks.length > 0) {
    for (const track of tracks) {
      for (const staff of track.staves) {
        staff.transpositionPitch = semitones
      }
    }
    alphaTabApi.render()
  }
}

function changeTone(toneId) {
  if (toneId === currentTone.value) return
  if (alphaTabApi) alphaTabApi.stop()
  currentTone.value = toneId
  initAlphaTab()
}

// ─── 生命週期 ─────────────────────────────────────────────────
onMounted(() => {
  initAlphaTab()
})

onUnmounted(() => {
  destroyAlphaTab()
})

// 當曲目切換時重新初始化
watch(() => props.song, () => {
  currentTone.value = 'piano'
  isPlaying.value = false
  isLooping.value = false
  speed.value = 100
  transposeDir.value = 'up'
  transposeIndex.value = 0
  initAlphaTab()
})
</script>
