<template>
  <section class="view-section">
    <div v-if="!book" class="error-message">
      找不到指定的書籍
      <p style="margin-top: var(--space-md);"><a href="#/">← 返回首頁</a></p>
    </div>
    <template v-else-if="chapters.length === 0">
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <p>此書籍目前沒有章節</p>
      </div>
    </template>
    <template v-else>
      <h2 class="view-title">{{ book.name }}</h2>
      <div class="list-grid">
        <article
          v-for="(chapter, index) in chapters"
          :key="chapter.id"
          class="list-item"
          tabindex="0"
          role="button"
          :aria-label="chapter.name"
          @click="router.push({ name: 'chapter', params: { bookId, chapterId: chapter.id } })"
          @keydown.enter.prevent="router.push({ name: 'chapter', params: { bookId, chapterId: chapter.id } })"
          @keydown.space.prevent="router.push({ name: 'chapter', params: { bookId, chapterId: chapter.id } })"
        >
          <span class="list-item-number">{{ index + 1 }}</span>
          <span class="list-item-title">{{ chapter.name }}</span>
          <span class="list-item-arrow">→</span>
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
})

const router = useRouter()
const { getBook, getChapters } = useManifest()
const { setBreadcrumbs, setSidebar } = useNavState()

const book = computed(() => getBook(props.bookId))
const chapters = computed(() => getChapters(props.bookId))

function updateNav() {
  setBreadcrumbs([
    { label: '首頁', to: '/' },
    { label: book.value?.name || props.bookId },
  ])
  setSidebar(props.bookId)
}

onMounted(updateNav)
watch(() => props.bookId, updateNav)
</script>
