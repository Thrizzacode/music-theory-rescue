/**
 * manifest.js — Manifest 載入模組
 * 載入並解析 manifest.json，提供樂譜索引的查詢功能
 */

/** @type {Object|null} 快取已載入的 manifest 資料 */
let manifestData = null;

/**
 * 載入 manifest.json
 * @returns {Promise<Object>} manifest 資料
 */
export async function loadManifest() {
  if (manifestData) return manifestData;

  try {
    const response = await fetch("data/manifest.json");
    if (!response.ok) {
      throw new Error(`Manifest 載入失敗：HTTP ${response.status}`);
    }
    manifestData = await response.json();
    return manifestData;
  } catch (error) {
    console.error("Manifest 載入錯誤：", error);
    throw error;
  }
}

/**
 * 取得所有書籍列表
 * @returns {Array} 書籍陣列
 */
export function getBooks() {
  if (!manifestData) return [];
  return manifestData.books || [];
}

/**
 * 依 ID 取得書籍
 * @param {string} bookId
 * @returns {Object|undefined}
 */
export function getBook(bookId) {
  return getBooks().find((b) => b.id === bookId);
}

/**
 * 取得書籍下的所有章節
 * @param {string} bookId
 * @returns {Array} 章節陣列
 */
export function getChapters(bookId) {
  const book = getBook(bookId);
  return book ? book.chapters || [] : [];
}

/**
 * 依 ID 取得章節
 * @param {string} bookId
 * @param {string} chapterId
 * @returns {Object|undefined}
 */
export function getChapter(bookId, chapterId) {
  return getChapters(bookId).find((c) => c.id === chapterId);
}

/**
 * 取得章節下的所有曲目
 * @param {string} bookId
 * @param {string} chapterId
 * @returns {Array} 曲目陣列
 */
export function getSongs(bookId, chapterId) {
  const chapter = getChapter(bookId, chapterId);
  return chapter ? chapter.songs || [] : [];
}

/**
 * 依 ID 取得曲目
 * @param {string} bookId
 * @param {string} chapterId
 * @param {string} songId
 * @returns {Object|undefined}
 */
export function getSong(bookId, chapterId, songId) {
  return getSongs(bookId, chapterId).find((s) => s.id === songId);
}
