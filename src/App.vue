<template>
  <!-- 頁首區域 -->
  <header id="app-header">
    <div class="header-inner">
      <div class="brand-group">
        <h1 class="site-title">
          <router-link to="/" id="home-link">搶救大作戰</router-link>
        </h1>
        <p class="site-subtitle">音樂樂理練習平台</p>
      </div>
      <div class="header-actions">
        <!-- 訂購按鈕 (行銷亮點) -->
        <a href="http://www.musiker.com.tw/PicSearch.asp?page=1&action=1&anclassid=&jiage=&datestart=1996/1/1&dateend=2018/12/31&searchkey=%E3%80%8E%E6%90%B6%E6%95%91%E5%A4%A7%E4%BD%9C%E6%88%B0%E3%80%8F"
          target="_blank" class="header-cta-btn" aria-label="訂購教材">
          <span class="cta-icon">🛒</span>
          <span class="cta-text">訂購教材</span>
        </a>
        <!-- 主題切換按鈕 -->
        <button
          class="theme-toggle"
          id="theme-toggle"
          :aria-label="currentTheme === 'light' ? '切換至深色模式' : '切換至淺色模式'"
          @click="toggleTheme"
        >
          {{ currentTheme === 'light' ? '🌙' : '☀️' }}
        </button>
      </div>
    </div>
  </header>

  <!-- Breadcrumb 導航 -->
  <nav
    id="breadcrumb"
    :class="{ visible: navState.breadcrumbs.length > 0 }"
    aria-label="導覽路徑"
  >
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in navState.breadcrumbs" :key="index">
        <router-link
          v-if="item.to && index < navState.breadcrumbs.length - 1"
          :to="item.to"
        >{{ item.label }}</router-link>
        <span v-else>{{ item.label }}</span>
      </li>
    </ol>
  </nav>

  <!-- 佈局容器 -->
  <div class="app-layout-container">
    <!-- 側邊欄導航 (PC 端顯示) -->
    <aside
      v-if="navState.sidebarBookId"
      id="app-sidebar"
      class="app-sidebar visible"
      aria-label="書籍目錄"
    >
      <div class="sidebar-content">
        <Sidebar
          :book-id="navState.sidebarBookId"
          :active-params="navState.sidebarActiveParams"
        />
      </div>
    </aside>

    <!-- 主要內容區域 -->
    <main id="app-content">
      <router-view />
    </main>
  </div>

  <!-- 頁尾 -->
  <footer id="app-footer">
    <p>&copy; 樂韻出版社‧台北音樂家書房／出版.發行 2026</p>
  </footer>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme.js'
import { useNavState } from './composables/useNavState.js'
import { useManifest } from './composables/useManifest.js'
import Sidebar from './components/Sidebar.vue'

const { currentTheme, initTheme, toggleTheme } = useTheme()
const { navState } = useNavState()
const { loadManifest } = useManifest()

onMounted(async () => {
  // 確保主題與 localStorage 同步
  initTheme()
  // 預先載入 manifest（供所有 View 共用）
  try {
    await loadManifest()
  } catch {
    // 個別 View 會顯示各自的錯誤訊息
  }
})
</script>
