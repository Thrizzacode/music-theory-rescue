/**
 * useTheme.js — 主題切換 Composable
 * 管理 light/dark mode 切換、localStorage 偏好持久化
 * 使用模組層級的 ref，讓多個元件共享同一個主題狀態（類似 singleton）
 */
import { ref } from 'vue'

const THEME_KEY = 'theme-preference'

/** 主題狀態（模組層級，全域共享） */
const currentTheme = ref(
  localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
)

/** 套用主題到 document root */
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

export function useTheme() {
  /** 初始化主題（確保 DOM 與 localStorage 同步） */
  function initTheme() {
    applyTheme(currentTheme.value)
  }

  /** 切換主題 */
  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    applyTheme(currentTheme.value)
    localStorage.setItem(THEME_KEY, currentTheme.value)
  }

  return {
    currentTheme,
    initTheme,
    toggleTheme,
  }
}
