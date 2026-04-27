## Context

目前的專案完全基於 Vanilla JS、HTML 和原生 CSS 開發，並含有自訂的 `build.js` 腳本（整合了 `javascript-obfuscator` 和 `terser`）來做建置。雖然目前功能單純，但未來要擴充滿版元件、SPA 頁面切換或互動狀態時，原生的程式碼與操作 DOM 的邏輯將難以維護。因此，本提案推動系統向 Vite + Vue 3 遷移。

## Goals / Non-Goals

**Goals:**

- 以 Vite 完全取代原有的 `build.js`。
- 保留現有 AlphaTab 運作邏輯（不再用原生 JS 接管 DOM，而是放在 `<canvas>` / `<div>` ref 的 Vue hook 中掛載）。
- 單純改變檔案目錄與建置流程，套用 Vue 3 的 SFC (Single-File Components)。
- 建立 `vue-router` 架構來提供未來多頁面的擴充能力。

**Non-Goals:**

- 不改變使用者的視覺外觀和行為。
- 不引入重型狀態管理如 Pinia，目前直接使用 Vue 原生的 Reactivity 即足夠。
- 不修改 `openspec/specs` 內的系統行為規格，純屬技術重構。

## Decisions

### 採用 Vue 3 Composition API 與 Vite
- **Rationale**: Vite 能提供極佳的模組替換打包與熱重載性能，並且我們不再需要自己寫建置腳本 `build.js` 處理混淆與壓縮。利用 SFC (Single-File Component) 可以將散落的 DOM 操作轉變為資料驅動 (Data-driven) 狀態。
- **Alternatives**: 我們考慮過只用純 Vite + Vanilla JS，但不套框架仍無法解決未來 DOM 與狀態同步繁雜的問題。

### Vue-Router SPA 設定
- **Rationale**: 由於應用可能會延伸到不同的頁面模組（如：首頁、樂譜練習頁），引入 vue-router 將能方便我們組織不同的 Views，不再像原本只能依賴隱藏/顯示 DOM 區塊（如果有的話）。

### 重構現有 JavaScript 為 Vue Components / Composables
- **Rationale**: 將 `js/app.js`, `js/navigation.js` 轉換為主元件佈局（如 `App.vue`, `components/Navigation.vue` 等）；而 `js/player.js` 中對 AlphaTab 的初始操作轉移至 `components/AlphaTabPlayer.vue` 的 `onMounted` 階段，由 Vue 管理 DOM 掛載而非原生全域操作；若是偏向工具/狀態的 `js/theme.js` 則改作 Composable（如 `composables/useTheme.js`）。

## Risks / Trade-offs

- **[Risk] 第三方庫 (AlphaTab) 與 Vue 生命週期衝突** → *Mitigation:* 使用 Vue 3 的 `onMounted` 來初始化 AlphaTab，並且傳入該元件的 Vue ref node 來做綁定，而非寫死 ID，以避免 DOM 重繪問題。
- **[Risk] 使用者體驗中的載入延遲增加** → *Mitigation:* 確保 Vite 的 build process 包含 CSS/JS 壓縮，且保留原有的快取/壓縮設計。
