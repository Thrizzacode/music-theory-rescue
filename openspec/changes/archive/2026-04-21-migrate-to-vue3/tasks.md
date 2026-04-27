## 1. Init & Setup

- [x] 1.1 使用 Vite 建立 Vue 3 (Vanilla/TS 依專案決定，目前以 JS 優先) 的環境。
- [x] 1.2 引入 `vue-router`，並建立基礎的 `router/index.js` (對應「Vue-Router SPA 設定」)。
- [x] 1.3 調整 `index.html` 的載入方式，改從 Vite 的 `main.js` 進入。
- [x] 1.4 在 `package.json` 加入相關的打包指令，移除舊有 `build.js` 相關的編譯指令。

## 2. Components Refactoring

- [x] 2.1 建立 `App.vue` 為根元件，並加入 `<router-view>`。
- [x] 2.2 將 `js/navigation.js` 的行為重構為 `src/components/Navigation.vue` (對應「重構現有 JavaScript 為 Vue Components / Composables」)。
- [x] 2.3 將 `js/player.js` 中對 AlphaTab 的初始控制，重構為 `src/components/AlphaTabPlayer.vue` 的 `onMounted` 階段綁定 (對應「採用 Vue 3 Composition API 與 Vite」)。
- [x] 2.4 將介面切換的核心行為與 `js/theme.js` 改寫至對應的 Component 或 Composable `src/composables/useTheme.js`。

## 3. Migration and Cleanup

- [x] 3.1 確保 AlphaTab 依賴（CDN 或本地端載入）與新架構沒有衝突。
- [x] 3.2 刪除舊有的 `build.js`、`js/` 原生腳本檔案，確保打包時能透過 Vite 正確建置產出到 `dist/` 且不報錯。
- [x] 3.3 驗證開發伺服器 `npm run dev` 啟動成功並能正常瀏覽與播放樂譜。
