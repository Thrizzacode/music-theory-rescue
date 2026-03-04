/**
 * theme.js — 主題切換模組
 * 管理 light/dark mode 切換、localStorage 偏好持久化
 */

/** localStorage 鍵名 */
const THEME_KEY = "theme-preference";

/** @type {'light'|'dark'} 目前主題 */
let currentTheme = "light";

/**
 * 初始化主題系統
 * 讀取 localStorage 中的偏好，若無則預設為 light mode
 */
export function initTheme() {
  // 讀取已儲存的偏好（inline script 已在 <head> 中提前套用）
  const saved = localStorage.getItem(THEME_KEY);
  currentTheme = saved === "dark" ? "dark" : "light";

  // 綁定 toggle 按鈕事件
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
    updateToggleIcon(toggleBtn);
  }
}

/**
 * 切換主題
 */
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(currentTheme);
  savePreference(currentTheme);

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    updateToggleIcon(toggleBtn);
  }
}

/**
 * 套用主題到 DOM
 * @param {'light'|'dark'} theme
 */
function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

/**
 * 更新 toggle 按鈕圖示
 * @param {HTMLElement} btn
 */
function updateToggleIcon(btn) {
  btn.textContent = currentTheme === "light" ? "🌙" : "☀️";
  btn.setAttribute(
    "aria-label",
    currentTheme === "light" ? "切換至深色模式" : "切換至淺色模式",
  );
}

/**
 * 儲存主題偏好至 localStorage
 * @param {'light'|'dark'} theme
 */
function savePreference(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
