<template>
  <div>
    <div v-if="!song" class="error-message">
      找不到指定的曲目
      <p style="margin-top: var(--space-md);"><a href="#/">← 返回首頁</a></p>
    </div>
    <template v-else>
      <h2 class="view-title">{{ song.title }} — {{ chapter?.name }}</h2>
      <AlphaTabPlayer :song="song" />
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useManifest } from '../composables/useManifest.js'
import { useNavState } from '../composables/useNavState.js'
import AlphaTabPlayer from '../components/AlphaTabPlayer.vue'

const props = defineProps({
  bookId: { type: String, required: true },
  chapterId: { type: String, required: true },
  songId: { type: String, required: true },
})

const { getBook, getChapter, getSong } = useManifest()
const { setBreadcrumbs, setSidebar } = useNavState()

const book = computed(() => getBook(props.bookId))
const chapter = computed(() => getChapter(props.bookId, props.chapterId))
const song = computed(() => getSong(props.bookId, props.chapterId, props.songId))

function updateNav() {
  setBreadcrumbs([
    { label: '首頁', to: '/' },
    { label: book.value?.name || props.bookId, to: `/book/${props.bookId}` },
    { label: chapter.value?.name || props.chapterId, to: `/book/${props.bookId}/${props.chapterId}` },
    { label: song.value?.title || props.songId },
  ])
  setSidebar(props.bookId, { chapterId: props.chapterId, songId: props.songId })
}

onMounted(updateNav)
watch([() => props.bookId, () => props.chapterId, () => props.songId], updateNav)
</script>
