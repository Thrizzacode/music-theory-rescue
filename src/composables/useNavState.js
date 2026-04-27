/**
 * useNavState.js — 導航狀態 Composable
 * 提供 breadcrumb 與 sidebar 的全域共享響應式狀態
 * 讓各 View 元件可以更新 App.vue 中的導航 UI
 */
import { reactive, readonly } from 'vue'

/** 導航狀態（模組層級，全域共享） */
const state = reactive({
  /** @type {Array<{label: string, hash?: string}>} Breadcrumb 項目 */
  breadcrumbs: [],
  /** @type {string|null} 目前顯示 Sidebar 的書籍 ID */
  sidebarBookId: null,
  /** @type {{chapterId?: string, songId?: string}} Sidebar 中活動的參數 */
  sidebarActiveParams: {},
})

export function useNavState() {
  /**
   * 設定 Breadcrumb
   * @param {Array<{label: string, hash?: string}>} items
   */
  function setBreadcrumbs(items) {
    state.breadcrumbs = items
  }

  /**
   * 設定 Sidebar 狀態
   * @param {string|null} bookId
   * @param {{chapterId?: string, songId?: string}} params
   */
  function setSidebar(bookId, params = {}) {
    state.sidebarBookId = bookId
    state.sidebarActiveParams = params
  }

  return {
    navState: readonly(state),
    setBreadcrumbs,
    setSidebar,
  }
}
