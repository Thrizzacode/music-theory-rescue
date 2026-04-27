<template>
  <div>
    <!-- 錯誤狀態 -->
    <div v-if="loadError" class="error-message">
      <p>資料載入失敗：{{ loadError.message }}</p>
      <p style="margin-top: var(--space-md);">
        <a href="#/">← 返回首頁</a>
      </p>
    </div>

    <template v-else>
      <!-- 載入中 -->
      <div v-if="loading" id="loading" class="loading-indicator" role="status" aria-live="polite">
        <span class="loading-spinner"></span>
        <span>載入中...</span>
      </div>

      <template v-else>
        <!-- 書籍列表為空 -->
        <div v-if="books.length === 0" class="empty-state">
          <div class="empty-state-icon">📚</div>
          <p>目前沒有可用的書籍</p>
        </div>

        <template v-else>
          <!-- 作者介紹 -->
          <section class="intro-section">
            <h2 class="intro-title">作者的話</h2>
            <div class="intro-content">
              <p>教學多年常常聽見學生提問，「老師我音程很不好，怎麼辦？」、「老師我和弦不好怎麼辦？」、「老師我......」。學生自己有心在家練習，但不是沒人能幫忙，就是自行在鋼琴上練習時，其實大略也知道音高的位置，因而達不到充分練習的目的。</p>
              <p>因此我出了<strong>搶救大作戰系列</strong>的叢書，讓孩子們可以自行在家不受時間、地點及人員的限制隨時練習。</p>
              <p>音程、和弦......等的練習是需要長時間耐心訓練和累積的，本書首先分別練習各種音感，熟練之後再加入新的元素，慢慢累積、重複練習，最終達到熟練的目的。接下來，我找出大家容易混淆的音感，加以比較、練習，讓學生們更能清楚分辨出各種音感性質的不同。</p>
              <p>這套系統更可以依自己的程度、能力選擇不同的速度、次數、樂器音色，甚至可以移調練習，長久下來你的音感能力一定能大幅提升。</p>
              <p>希望本系列教材使用下來，你再也不會覺得音感、和弦、音程很可怕了。</p>
            </div>
            <div class="intro-cta-wrapper">
              <a
                href="http://www.musiker.com.tw/PicSearch.asp?page=1&action=1&anclassid=&jiage=&datestart=1996/1/1&dateend=2018/12/31&searchkey=%E3%80%8E%E6%90%B6%E6%95%91%E5%A4%A7%E4%BD%9C%E6%88%B0%E3%80%8F"
                target="_blank"
                class="btn-primary btn-lg"
              >
                <span class="btn-icon">🛒</span> 訂購『搶救大作戰』系列教材
              </a>
              <p class="cta-note">實體教材搭配線上練習，學習效果加倍！</p>
            </div>
            <div class="intro-footer">
              <span class="author-name">譚琇文</span>
            </div>
          </section>

          <!-- 書籍列表 -->
          <section class="view-section">
            <h2 class="view-title">選擇練習書籍</h2>
            <div class="card-grid">
              <article
                v-for="book in books"
                :key="book.id"
                class="card"
                tabindex="0"
                role="button"
                :aria-label="book.name"
                @click="router.push({ name: 'book', params: { bookId: book.id } })"
                @keydown.enter.prevent="router.push({ name: 'book', params: { bookId: book.id } })"
                @keydown.space.prevent="router.push({ name: 'book', params: { bookId: book.id } })"
              >
                <div class="card-icon">{{ book.icon || '📖' }}</div>
                <h3 class="card-title">{{ book.name }}</h3>
                <p class="card-subtitle">{{ book.chapters?.length || 0 }} 個章節</p>
              </article>
            </div>
          </section>
        </template>
      </template>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useManifest } from '../composables/useManifest.js'
import { useNavState } from '../composables/useNavState.js'

const router = useRouter()
const { manifestData, loading, error: loadError, loadManifest, getBooks } = useManifest()
const { setBreadcrumbs, setSidebar } = useNavState()

const books = computed(() => getBooks())

onMounted(async () => {
  // 首頁：清除 breadcrumb 和 sidebar
  setBreadcrumbs([])
  setSidebar(null)
  // manifest 通常已由 App.vue 預載，此處為保險
  if (!manifestData.value) {
    await loadManifest()
  }
})
</script>
