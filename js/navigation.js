/**
 * navigation.js — 導航視圖渲染模組
 * 負責渲染書籍列表、章節列表、曲目列表等視圖
 */

import {
  getBooks,
  getBook,
  getChapters,
  getChapter,
  getSongs,
} from "./manifest.js";

/**
 * 渲染書籍列表（首頁 Drill-down 書籍列表）
 * @param {HTMLElement} container - 內容容器
 */
export function renderBookList(container) {
  const books = getBooks();

  if (books.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📚</div>
        <p>目前沒有可用的書籍</p>
      </div>`;
    return;
  }

  const html = `
    <section class="view-section">
      <h2 class="view-title">選擇練習書籍</h2>
      <div class="card-grid">
        ${books
          .map(
            (book) => `
          <article class="card" data-navigate="#/book/${book.id}" tabindex="0" role="button" aria-label="${book.name}">
            <div class="card-icon">${book.icon || "📖"}</div>
            <h3 class="card-title">${book.name}</h3>
            <p class="card-subtitle">${book.chapters ? book.chapters.length : 0} 個章節</p>
          </article>
        `,
          )
          .join("")}
      </div>
    </section>`;

  container.innerHTML = html;
  bindCardNavigation(container);
}

/**
 * 渲染章節列表
 * @param {HTMLElement} container
 * @param {string} bookId
 */
export function renderChapterList(container, bookId) {
  const book = getBook(bookId);
  const chapters = getChapters(bookId);

  if (!book) {
    container.innerHTML = `
      <div class="error-message">找不到指定的書籍</div>`;
    return;
  }

  if (chapters.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <p>此書籍目前沒有章節</p>
      </div>`;
    return;
  }

  const html = `
    <section class="view-section">
      <h2 class="view-title">${book.name}</h2>
      <div class="list-grid">
        ${chapters
          .map(
            (chapter, index) => `
          <article class="list-item" data-navigate="#/book/${bookId}/${chapter.id}" tabindex="0" role="button" aria-label="${chapter.name}">
            <span class="list-item-number">${index + 1}</span>
            <span class="list-item-title">${chapter.name}</span>
            <span class="list-item-arrow">→</span>
          </article>
        `,
          )
          .join("")}
      </div>
    </section>`;

  container.innerHTML = html;
  bindCardNavigation(container);
}

/**
 * 渲染曲目列表
 * @param {HTMLElement} container
 * @param {string} bookId
 * @param {string} chapterId
 */
export function renderSongList(container, bookId, chapterId) {
  const book = getBook(bookId);
  const chapter = getChapter(bookId, chapterId);
  const songs = getSongs(bookId, chapterId);

  if (!book || !chapter) {
    container.innerHTML = `
      <div class="error-message">找不到指定的章節</div>`;
    return;
  }

  if (songs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎵</div>
        <p>此章節目前沒有曲目</p>
      </div>`;
    return;
  }

  const html = `
    <section class="view-section">
      <h2 class="view-title">${chapter.name}</h2>
      <div class="list-grid">
        ${songs
          .map(
            (song, index) => `
          <article class="list-item" data-navigate="#/play/${bookId}/${chapterId}/${song.id}" tabindex="0" role="button" aria-label="${song.title}">
            <span class="list-item-number">${index + 1}</span>
            <span class="list-item-title">${song.title}</span>
            <span class="list-item-arrow">♪</span>
          </article>
        `,
          )
          .join("")}
      </div>
    </section>`;

  container.innerHTML = html;
  bindCardNavigation(container);
}

/**
 * 綁定卡片/列表項目的點擊導航事件
 * @param {HTMLElement} container
 */
function bindCardNavigation(container) {
  const items = container.querySelectorAll("[data-navigate]");
  items.forEach((item) => {
    // 點擊事件
    item.addEventListener("click", () => {
      window.location.hash = item.dataset.navigate;
    });
    // 鍵盤支援（Enter / Space）
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.hash = item.dataset.navigate;
      }
    });
  });
}
