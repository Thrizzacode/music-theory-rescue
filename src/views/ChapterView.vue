<template>
  <section class="view-section">
    <div v-if="!chapter" class="error-message">
      找不到指定的章節
      <p style="margin-top: var(--space-md);"><a href="#/">← 返回首頁</a></p>
    </div>
    <template v-else-if="songs.length === 0">
      <div class="empty-state">
        <div class="empty-state-icon">🎵</div>
        <p>此章節目前沒有曲目</p>
      </div>
    </template>
    <template v-else>
      <h2 class="view-title">{{ chapter.name }}</h2>
      <div class="list-grid">
        <article
          v-for="(song, index) in songs"
          :key="song.id"
          class="list-item"
          tabindex="0"
          role="button"
          :aria-label="song.title"
          @click="router.push({ name: 'player', params: { bookId, chapterId, songId: song.id } })"
          @keydown.enter.prevent="router.push({ name: 'player', params: { bookId, chapterId, songId: song.id } })"
          @keydown.space.prevent="router.push({ name: 'player', params: { bookId, chapterId, songId: song.id } })"
        >
          <span class="list-item-number">{{ index + 1 }}</span>
          <span class="list-item-title">{{ song.title }}</span>
          <span class="list-item-arrow">♪</span>
        </article>
      </div>
    </template>
  </section>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useManifest } from '../composables/useManifest.js'
import { useNavState } from '../composables/useNavState.js'

const props = defineProps({
  bookId: { type: String, required: true },
  chapterId: { type: String, required: true },
})

const router = useRouter()
const { getBook, getChapter, getSongs } = useManifest()
const { setBreadcrumbs, setSidebar } = useNavState()

const book = computed(() => getBook(props.bookId))
const chapter = computed(() => getChapter(props.bookId, props.chapterId))
const songs = computed(() => getSongs(props.bookId, props.chapterId))

function updateNav() {
  setBreadcrumbs([
    { label: '首頁', to: '/' },
    { label: book.value?.name || props.bookId, to: `/book/${props.bookId}` },
    { label: chapter.value?.name || props.chapterId },
  ])
  setSidebar(props.bookId, { chapterId: props.chapterId })
}

onMounted(updateNav)
watch([() => props.bookId, () => props.chapterId], updateNav)
</script>
