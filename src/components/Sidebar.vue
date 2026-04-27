<template>
  <h2 class="sidebar-title">課程目錄</h2>
  <div class="tree-root">
    <div
      v-for="chapter in chapters"
      :key="chapter.id"
      class="tree-chapter"
      :class="{ collapsed: !expandedChapters.has(chapter.id) }"
    >
      <div
        class="tree-chapter-header"
        role="button"
        :aria-expanded="expandedChapters.has(chapter.id)"
        @click="toggleChapter(chapter.id)"
      >
        <span class="tree-chapter-icon">▼</span>
        <span class="tree-chapter-title">{{ chapter.name }}</span>
      </div>
      <div class="tree-song-list">
        <router-link
          v-for="song in chapter.songs || []"
          :key="song.id"
          :to="{ name: 'player', params: { bookId, chapterId: chapter.id, songId: song.id } }"
          class="tree-song-item"
          :class="{ active: activeParams.chapterId === chapter.id && activeParams.songId === song.id }"
        >
          <span class="tree-song-title">{{ song.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { useManifest } from '../composables/useManifest.js'

const props = defineProps({
  bookId: {
    type: String,
    required: true,
  },
  activeParams: {
    type: Object,
    default: () => ({}),
  },
})

const { getChapters } = useManifest()

const chapters = computed(() => getChapters(props.bookId))

/** 已展開的章節 ID 集合（使用 reactive Set 驅動 v-bind:class） */
const expandedChapters = reactive(new Set())

/** 初始化時展開目前活動的章節 */
function syncExpanded() {
  if (props.activeParams.chapterId) {
    expandedChapters.add(props.activeParams.chapterId)
  }
}

watch(() => props.activeParams.chapterId, syncExpanded, { immediate: true })

function toggleChapter(chapterId) {
  if (expandedChapters.has(chapterId)) {
    expandedChapters.delete(chapterId)
  } else {
    expandedChapters.add(chapterId)
  }
}
</script>
