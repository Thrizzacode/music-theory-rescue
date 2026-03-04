/**
 * player.js — 樂譜播放器模組
 * 使用 AlphaTab 渲染 MusicXML 並提供播放控制
 */

import { getSong, getBook, getChapter } from "./manifest.js";

/** @type {Object|null} AlphaTab API 實例 */
let alphaTabApi = null;

/** @type {Object} 目前播放的曲目資訊 */
let currentSong = null;

/** @type {string} 目前選擇的音色 */
let currentTone = "piano";

/** @type {boolean} 是否正在播放 */
let isPlaying = false;

/** @type {boolean} 循環模式是否啟用 */
let isLooping = false;

/** 音色定義 */
const TONES = [
  { id: "piano", name: "🎹 鋼琴", label: "Piano" },
  { id: "flute", name: "🎵 長笛", label: "Flute" },
  { id: "strings", name: "🎻 弦樂", label: "Strings" },
];

/** 音程定義（移調下拉選單選項） */
const INTERVALS = [
  { name: "原調", semitones: 0 },
  { name: "小二度 (1個半音)", semitones: 1 },
  { name: "大二度 (2個半音)", semitones: 2 },
  { name: "小三度 (3個半音)", semitones: 3 },
  { name: "大三度 (4個半音)", semitones: 4 },
  { name: "完全四度 (5個半音)", semitones: 5 },
  { name: "增四度 (6個半音)", semitones: 6 },
  { name: "減五度 (6個半音)", semitones: 6 },
  { name: "完全五度 (7個半音)", semitones: 7 },
  { name: "增五度 (8個半音)", semitones: 8 },
  { name: "小六度 (8個半音)", semitones: 8 },
  { name: "大六度 (9個半音)", semitones: 9 },
  { name: "增六度 (10個半音)", semitones: 10 },
  { name: "小七度 (10個半音)", semitones: 10 },
  { name: "大七度 (11個半音)", semitones: 11 },
  { name: "完全八度 (12個半音)", semitones: 12 },
];

/**
 * 渲染播放器視圖
 * @param {HTMLElement} container
 * @param {string} bookId
 * @param {string} chapterId
 * @param {string} songId
 */
export function renderPlayer(container, bookId, chapterId, songId) {
  const song = getSong(bookId, chapterId, songId);
  const book = getBook(bookId);
  const chapter = getChapter(bookId, chapterId);

  if (!song || !book || !chapter) {
    container.innerHTML = `
      <div class="error-message">找不到指定的曲目</div>`;
    return;
  }

  currentSong = { bookId, chapterId, songId, data: song };
  currentTone = "piano";

  const html = `
    <section class="player-container">
      <h2 class="view-title">${song.title} — ${chapter.name}</h2>

      <!-- 音色切換 Tab -->
      <div class="tone-tabs" role="tablist" aria-label="音色切換">
        ${TONES.map(
          (tone) => `
          <button class="tone-tab ${tone.id === currentTone ? "active" : ""}"
                  role="tab"
                  aria-selected="${tone.id === currentTone}"
                  data-tone="${tone.id}"
                  id="tone-tab-${tone.id}">
            ${tone.name}
          </button>
        `,
        ).join("")}
      </div>

      <!-- SoundFont 載入進度 -->
      <div id="soundfont-progress" class="loading-indicator hidden">
        <div style="width: 100%; text-align: center;">
          <div class="progress-text">正在載入音色資源...</div>
          <div class="progress-bar-container">
            <div class="progress-bar" id="progress-bar"></div>
          </div>
        </div>
      </div>

      <!-- 樂譜顯示區 -->
      <div class="score-display" id="alphatab-container">
        <div class="loading-indicator" id="score-loading">
          <span class="loading-spinner"></span>
          <span>載入樂譜中...</span>
        </div>
      </div>

      <!-- 播放控制列 -->
      <div class="player-controls">
        <!-- 主要播放按鈕 -->
        <div class="controls-row">
          <button class="control-btn" id="btn-prev" title="後退" aria-label="後退至上一小節">◀</button>
          <button class="control-btn play-btn" id="btn-play" title="播放" aria-label="播放">▶</button>
          <button class="control-btn" id="btn-stop" title="停止" aria-label="停止播放">⏹</button>
          <button class="control-btn" id="btn-next" title="前進" aria-label="前進至下一小節">▶▶</button>
          <button class="control-btn" id="btn-loop" title="循環" aria-label="段落循環">🔁</button>
        </div>

        <!-- 速度控制 -->
        <div class="controls-row">
          <div class="control-slider">
            <label for="speed-slider">速度</label>
            <input type="range" id="speed-slider" min="25" max="200" value="100" step="5">
            <span class="slider-value" id="speed-value">100%</span>
          </div>
        </div>

        <!-- 移調控制 -->
        <div class="controls-row">
          <div class="transpose-control">
            <label>移調</label>
            <div class="transpose-direction" role="radiogroup" aria-label="移調方向">
              <label class="radio-label">
                <input type="radio" name="transpose-dir" value="up" checked> 升
              </label>
              <label class="radio-label">
                <input type="radio" name="transpose-dir" value="down"> 降
              </label>
            </div>
            <select id="transpose-select" aria-label="移調音程">
              ${INTERVALS.map(
                (iv, i) => `<option value="${i}">${iv.name}</option>`,
              ).join("")}
            </select>
          </div>
        </div>
      </div>
    </section>`;

  container.innerHTML = html;
  bindPlayerEvents(container);
  initAlphaTab(song);
}

/**
 * 初始化 AlphaTab
 * @param {Object} song - 曲目資料
 */
async function initAlphaTab(song) {
  const containerEl = document.getElementById("alphatab-container");
  const scoreLoading = document.getElementById("score-loading");

  try {
    // 動態引入 AlphaTab（CDN）
    const alphaTab =
      await import("https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.min.mjs");

    // 銷毀之前的實例
    if (alphaTabApi) {
      alphaTabApi.destroy();
      alphaTabApi = null;
    }

    // 清除載入指示
    if (scoreLoading) scoreLoading.remove();

    // 取得目前音色的檔案路徑
    const filePath = song.tones[currentTone];
    if (!filePath) {
      containerEl.innerHTML = `<div class="error-message">找不到 ${currentTone} 音色的樂譜檔案</div>`;
      return;
    }

    // 初始化 AlphaTab API
    alphaTabApi = new alphaTab.AlphaTabApi(containerEl, {
      core: {
        fontDirectory:
          "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/font/",
        file: filePath,
      },
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont:
          "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2",
      },
      display: {
        layoutMode: alphaTab.LayoutMode.Page,
      },
    });

    // SoundFont 載入進度
    alphaTabApi.soundFontLoad.on((e) => {
      const progressEl = document.getElementById("soundfont-progress");
      const barEl = document.getElementById("progress-bar");
      if (progressEl && barEl) {
        progressEl.classList.remove("hidden");
        const percent = Math.round((e.loaded / e.total) * 100);
        barEl.style.width = `${percent}%`;
        if (percent >= 100) {
          setTimeout(() => progressEl.classList.add("hidden"), 500);
        }
      }
    });

    // 播放狀態變化
    alphaTabApi.playerStateChanged.on((e) => {
      isPlaying = e.state === 1; // 1 = Playing
      updatePlayButton();
    });
  } catch (error) {
    console.error("AlphaTab 初始化失敗：", error);
    containerEl.innerHTML = `
      <div class="error-message">
        樂譜載入失敗：${error.message}
      </div>`;
  }
}

/**
 * 綁定播放器事件
 * @param {HTMLElement} container
 */
function bindPlayerEvents(container) {
  // 播放/暫停
  container.querySelector("#btn-play")?.addEventListener("click", () => {
    if (alphaTabApi) {
      alphaTabApi.playPause();
    }
  });

  // 停止
  container.querySelector("#btn-stop")?.addEventListener("click", () => {
    if (alphaTabApi) {
      alphaTabApi.stop();
      isPlaying = false;
      updatePlayButton();
    }
  });

  // 前進
  container.querySelector("#btn-next")?.addEventListener("click", () => {
    if (alphaTabApi) {
      alphaTabApi.moveToNextMeasure();
    }
  });

  // 後退
  container.querySelector("#btn-prev")?.addEventListener("click", () => {
    if (alphaTabApi) {
      alphaTabApi.moveToPreviousMeasure();
    }
  });

  // 循環
  container.querySelector("#btn-loop")?.addEventListener("click", () => {
    isLooping = !isLooping;
    const btn = container.querySelector("#btn-loop");
    if (btn) {
      btn.classList.toggle("active", isLooping);
    }
    if (alphaTabApi) {
      alphaTabApi.isLooping = isLooping;
    }
  });

  // 速度控制
  const speedSlider = container.querySelector("#speed-slider");
  const speedValue = container.querySelector("#speed-value");
  speedSlider?.addEventListener("input", () => {
    const speed = parseInt(speedSlider.value);
    if (speedValue) speedValue.textContent = `${speed}%`;
    if (alphaTabApi) {
      alphaTabApi.playbackSpeed = speed / 100;
    }
  });

  // 移調控制 — 下拉選單 + 升降方向
  const transposeSelect = container.querySelector("#transpose-select");
  const dirRadios = container.querySelectorAll('input[name="transpose-dir"]');

  /** 計算並套用移調 */
  function applyTranspose() {
    if (!transposeSelect) return;
    const idx = parseInt(transposeSelect.value);
    const interval = INTERVALS[idx];
    if (!interval) return;

    // 判斷方向
    const dirRadio = container.querySelector(
      'input[name="transpose-dir"]:checked',
    );
    const direction = dirRadio?.value === "down" ? -1 : 1;
    const semitones = interval.semitones * direction;

    if (alphaTabApi) {
      const tracks = alphaTabApi.tracks;
      if (tracks && tracks.length > 0) {
        for (const track of tracks) {
          for (const staff of track.staves) {
            staff.transpositionPitch = semitones;
          }
        }
        alphaTabApi.render();
      }
    }
  }

  transposeSelect?.addEventListener("change", applyTranspose);
  dirRadios.forEach((radio) => {
    radio.addEventListener("change", applyTranspose);
  });

  // 音色切換 Tab
  const toneTabs = container.querySelectorAll(".tone-tab");
  toneTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tone = tab.dataset.tone;
      if (tone === currentTone) return;

      // 更新 Tab 狀態
      toneTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      // 切換音色
      currentTone = tone;
      if (currentSong) {
        // 停止播放
        if (alphaTabApi) {
          alphaTabApi.stop();
        }
        // 重新初始化 AlphaTab
        initAlphaTab(currentSong.data);
      }
    });
  });
}

/**
 * 更新播放按鈕狀態
 */
function updatePlayButton() {
  const btn = document.getElementById("btn-play");
  if (btn) {
    btn.textContent = isPlaying ? "⏸" : "▶";
    btn.title = isPlaying ? "暫停" : "播放";
    btn.setAttribute("aria-label", isPlaying ? "暫停" : "播放");
  }
}

/**
 * 銷毀播放器
 */
export function destroyPlayer() {
  if (alphaTabApi) {
    alphaTabApi.destroy();
    alphaTabApi = null;
  }
  currentSong = null;
  isPlaying = false;
  isLooping = false;
}
