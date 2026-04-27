## Summary

將專案從現有的 Vanilla JS / HTML / 自訂 Build Script 架構重構為使用 Vite + Vue 3 (Composition API) 的現代前端架構。

## Motivation

目前的進展已經建立了一些基礎功能，如使用 AlphaTab 解析與播放樂譜。然而，純 JS 和 DOM 操控的方式隨著專案變得複雜會愈加難以維護。導入 Vue 3 以及 Vite 將能提供更好的模組化、響應式狀態管理、更快的開發體驗（HMR），並且能為後續的擴充（如路由切換）打下穩定的基礎。

## Proposed Solution

1. 導入 Vite 作為打包工具，取代舊有的 `build.js`。
2. 將原有的 JS 邏輯（如 `app.js`, `navigation.js`, `player.js`, `theme.js` 等）依照畫面或是功能逐步重構為 Vue 3 Components 或 Composables。
3. 採用 `vue-router` 來管理單頁應用程式 (SPA) 的路由。
4. 維持現有的外部庫整合（例如 AlphaTab），但以 Vue Component 的形式封裝。

## Non-Goals

- 不會改變現有使用者的功能邏輯與介面操作行為，只進行架構升級（除非因框架特性需要稍微調整 UI 呈現）。
- 暫不引入複雜的全域狀態管理庫（如 Pinia），若有共同狀態優先使用 Vue 原生的 Reactivity (`ref`, `reactive`, `provide/inject`)。
- 不會改寫或取代 AlphaTab 的核心，只是改變其掛載與互動方式。

## Alternatives Considered

- **保留純 JS 架構**：隨著介面互動增多，狀態跟 UI 同步會變得極度脆弱。
- **使用 React 或 Svelte**：由於 Vue 3 的 Composition API 對於逐步遷移與封裝第三方傳統 JS 庫（如 AlphaTab）提供了非常清晰與彈性的生命週期控制，故選擇 Vue 3 為主。

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none)

## Impact

- Affected specs: 不涉及行為邏輯更改。
- Affected code:
  - 移除 `build.js`，新增 `vite.config.js` 等設定。
  - 將 `index.html` 轉向 Vite 要求的格式。
  - 原本 `js/` 資料夾下的腳本轉移並重寫為 `src/components/`, `src/views/`, `src/composables/` 內的 `.vue` 或 `.ts/.js` 檔案。
