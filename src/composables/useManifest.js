/**
 * useManifest.js — Manifest 資料 Composable
 * 以 Vue 響應式狀態包裝原 manifest.js 的載入與查詢邏輯
 * 使用模組層級的 ref，確保 manifest 只載入一次
 */
import { ref, readonly } from 'vue'

const MANIFEST_URL = 'data/manifest.json'

/** 快取的 manifest 資料（模組層級，全域共享） */
const manifestData = ref(null)
const loading = ref(false)
const error = ref(null)

export function useManifest() {
  /**
   * 載入 manifest.json（已載入則直接返回快取）
   * @returns {Promise<void>}
   */
  async function loadManifest() {
    if (manifestData.value) return
    loading.value = true
    error.value = null
    try {
      const response = await fetch(MANIFEST_URL)
      if (!response.ok) {
        throw new Error(`Manifest 載入失敗：HTTP ${response.status}`)
      }
      manifestData.value = await response.json()
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  /** 取得所有書籍 */
  function getBooks() {
    return manifestData.value?.books ?? []
  }

  /** 依 ID 取得書籍 */
  function getBook(bookId) {
    return getBooks().find((b) => b.id === bookId)
  }

  /** 取得書籍下的所有章節 */
  function getChapters(bookId) {
    return getBook(bookId)?.chapters ?? []
  }

  /** 依 ID 取得章節 */
  function getChapter(bookId, chapterId) {
    return getChapters(bookId).find((c) => c.id === chapterId)
  }

  /** 取得章節下的所有曲目 */
  function getSongs(bookId, chapterId) {
    return getChapter(bookId, chapterId)?.songs ?? []
  }

  /** 依 ID 取得曲目 */
  function getSong(bookId, chapterId, songId) {
    return getSongs(bookId, chapterId).find((s) => s.id === songId)
  }

  return {
    manifestData: readonly(manifestData),
    loading: readonly(loading),
    error: readonly(error),
    loadManifest,
    getBooks,
    getBook,
    getChapters,
    getChapter,
    getSongs,
    getSong,
  }
}
