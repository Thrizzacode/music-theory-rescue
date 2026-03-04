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
        <a href="http://www.musiker.com.tw/PicSearch.asp?page=1&action=1&anclassid=&jiage=&datestart=1996/1/1&dateend=2018/12/31&searchkey=%E3%80%8E%E6%90%B6%E6%95%91%E5%A4%A7%E4%BD%9C%E6%88%B0%E3%80%8F" target="_blank" class="btn-primary btn-lg">
          <span class="btn-icon">🛒</span> 訂購『搶救大作戰』系列教材
        </a>
        <p class="cta-note">實體教材搭配線上練習，學習效果加倍！</p>
      </div>
      <div class="intro-footer">
        <span class="author-name">譚琇文</span>
      </div>
    </section>

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
 * 渲染 Sidebar 樹狀目錄 (PC 端專用)
 * @param {HTMLElement} sidebarContainer - Sidebar 的內容容器 (.sidebar-content)
 * @param {string} bookId - 書籍 ID
 * @param {Object} activeParams - 目前活動中的曲目參數 {chapterId, songId}
 */
export function renderSidebar(sidebarContainer, bookId, activeParams = {}) {
  const book = getBook(bookId);
  const chapters = getChapters(bookId);

  if (!book || chapters.length === 0) {
    sidebarContainer.innerHTML = "";
    return;
  }

  const { chapterId, songId } = activeParams;

  const html = `
    <h2 class="sidebar-title">課程目錄</h2>
    <div class="tree-root">
      ${chapters
        .map((chapter) => {
          const isCurrentChapter = chapter.id === chapterId;
          const songs = chapter.songs || [];

          return `
          <div class="tree-chapter ${isCurrentChapter ? "" : "collapsed"}" data-chapter-id="${chapter.id}">
            <div class="tree-chapter-header" role="button" aria-expanded="${isCurrentChapter}">
              <span class="tree-chapter-icon">▼</span>
              <span class="tree-chapter-title">${chapter.name}</span>
            </div>
            <div class="tree-song-list">
              ${songs
                .map((song) => {
                  const isActive = isCurrentChapter && song.id === songId;
                  const navHash = `#/play/${bookId}/${chapter.id}/${song.id}`;
                  return `
                  <a href="${navHash}" class="tree-song-item ${isActive ? "active" : ""}" data-song-link="${navHash}">
                    <span class="tree-song-title">${song.title}</span>
                  </a>
                `;
                })
                .join("")}
            </div>
          </div>
        `;
        })
        .join("")}
    </div>
  `;

  sidebarContainer.innerHTML = html;
  bindSidebarEvents(sidebarContainer);
}

/**
 * 清除 Sidebar 內容
 * @param {HTMLElement} sidebarContainer
 */
export function clearSidebar(sidebarContainer) {
  if (sidebarContainer) {
    sidebarContainer.innerHTML = "";
  }
}

/**
 * 綁定 Sidebar 互動事件
 * @param {HTMLElement} container
 */
function bindSidebarEvents(container) {
  // 處理章節展開/收合
  const headers = container.querySelectorAll(".tree-chapter-header");
  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const chapterEl = header.parentElement;
      const isCollapsed = chapterEl.classList.toggle("collapsed");
      header.setAttribute("aria-expanded", !isCollapsed);
    });
  });

  // 處理曲目點選 (Sidebar 連結使用 a 標籤，但若需 JS 處理可在此擴充)
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
