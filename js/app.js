/**
 * app.js — 應用程式主入口
 * 負責 hash-based routing、breadcrumb 導航、SPA shell 管理
 */

import { loadManifest, getBook, getChapter } from "./manifest.js";
import {
  renderBookList,
  renderChapterList,
  renderSongList,
  renderSidebar,
  clearSidebar,
} from "./navigation.js";
import { renderPlayer, destroyPlayer } from "./player.js";
import { initTheme } from "./theme.js";

/** @type {HTMLElement} 內容容器 */
const contentEl = document.getElementById("app-content");

const sidebarContainer = document.querySelector(
  "#app-sidebar .sidebar-content",
);

/** @type {HTMLElement} Sidebar 根元素 */
const sidebarEl = document.getElementById("app-sidebar");

/** @type {HTMLElement} Breadcrumb 導航 */
const breadcrumbEl = document.getElementById("breadcrumb");

/** @type {HTMLOListElement} Breadcrumb 列表 */
const breadcrumbList = breadcrumbEl?.querySelector(".breadcrumb-list");

/** @type {HTMLElement} 載入指示器 */
const loadingEl = document.getElementById("loading");

/**
 * 路由定義與解析
 */
const routes = [
  {
    // 首頁 — 書籍列表
    pattern: /^#?\/?$/,
    handler: () => {
      updateBreadcrumb([]);
      updateSidebar(null);
      renderBookList(contentEl);
    },
  },
  {
    // 章節列表
    pattern: /^#\/book\/([^/]+)$/,
    handler: (matches) => {
      const bookId = matches[1];
      const book = getBook(bookId);
      updateBreadcrumb([
        { label: "首頁", hash: "#/" },
        { label: book?.name || bookId },
      ]);
      updateSidebar(bookId);
      renderChapterList(contentEl, bookId);
    },
  },
  {
    // 曲目列表
    pattern: /^#\/book\/([^/]+)\/([^/]+)$/,
    handler: (matches) => {
      const [, bookId, chapterId] = matches;
      const book = getBook(bookId);
      const chapter = getChapter(bookId, chapterId);
      updateBreadcrumb([
        { label: "首頁", hash: "#/" },
        { label: book?.name || bookId, hash: `#/book/${bookId}` },
        { label: chapter?.name || chapterId },
      ]);
      updateSidebar(bookId, { chapterId });
      renderSongList(contentEl, bookId, chapterId);
    },
  },
  {
    // 播放器
    pattern: /^#\/play\/([^/]+)\/([^/]+)\/([^/]+)$/,
    handler: (matches) => {
      const [, bookId, chapterId, songId] = matches;
      const book = getBook(bookId);
      const chapter = getChapter(bookId, chapterId);
      updateBreadcrumb([
        { label: "首頁", hash: "#/" },
        { label: book?.name || bookId, hash: `#/book/${bookId}` },
        {
          label: chapter?.name || chapterId,
          hash: `#/book/${bookId}/${chapterId}`,
        },
        { label: `${songId}` },
      ]);
      updateSidebar(bookId, { chapterId, songId });
      renderPlayer(contentEl, bookId, chapterId, songId);
    },
  },
];

/**
 * 更新側邊欄內容
 * @param {string|null} bookId
 * @param {Object} activeParams
 */
function updateSidebar(bookId, activeParams = {}) {
  if (!bookId) {
    sidebarEl?.classList.remove("visible");
    clearSidebar(sidebarContainer);
    return;
  }
  sidebarEl?.classList.add("visible");
  renderSidebar(sidebarContainer, bookId, activeParams);
}

/**
 * 路由處理 — 解析目前 hash 並渲染對應視圖
 */
function handleRoute() {
  const hash = window.location.hash || "#/";

  // 離開播放器時銷毀 AlphaTab 實例
  if (!hash.startsWith("#/play/")) {
    destroyPlayer();
  }

  // 比對路由
  for (const route of routes) {
    const matches = hash.match(route.pattern);
    if (matches) {
      hideLoading();
      window.scrollTo(0, 0); // 切換路由時回到最上方
      route.handler(matches);
      return;
    }
  }

  // 找不到對應路由，回到首頁
  window.location.hash = "#/";
}

/**
 * 更新 Breadcrumb 導航
 * @param {Array<{label: string, hash?: string}>} items
 */
function updateBreadcrumb(items) {
  if (!breadcrumbEl || !breadcrumbList) return;

  if (items.length === 0) {
    breadcrumbEl.classList.remove("visible");
    breadcrumbList.innerHTML = "";
    return;
  }

  breadcrumbEl.classList.add("visible");
  breadcrumbList.innerHTML = items
    .map((item, index) => {
      const isLast = index === items.length - 1;
      if (isLast || !item.hash) {
        return `<li>${item.label}</li>`;
      }
      return `<li><a href="${item.hash}">${item.label}</a></li>`;
    })
    .join("");
}

/**
 * 隱藏載入指示器
 */
function hideLoading() {
  if (loadingEl) {
    loadingEl.classList.add("hidden");
  }
}

/**
 * 顯示錯誤訊息
 * @param {string} message
 */
function showError(message) {
  hideLoading();
  contentEl.innerHTML = `
    <div class="error-message">
      <p>${message}</p>
      <p style="margin-top: var(--space-md);">
        <a href="#/">← 返回首頁</a>
      </p>
    </div>`;
}

/**
 * 應用程式初始化
 */
async function init() {
  try {
    // 初始化主題系統
    initTheme();

    // 載入 manifest.json
    await loadManifest();

    // 監聽路由變化
    window.addEventListener("hashchange", handleRoute);

    // 處理初始路由
    handleRoute();
  } catch (error) {
    showError(`資料載入失敗：${error.message}`);
  }
}

// 啟動應用程式
init();
