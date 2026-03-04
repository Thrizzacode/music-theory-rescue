## Context

目前的「搶救大作戰」練習平台採用單頁式應用 (SPA) 架構，所有視圖內容都動態注入到 `#app-content` 容器中。當使用者在 PC 端進入練習畫面時，側邊沒有導航列，需退回上一層才能切換曲目，對於擁有寬大螢幕空間的桌機環境來說，效率有待提升。

## Goals / Non-Goals

**Goals:**

- 在 PC 端引入側邊欄 (Sidebar) 導覽，提升切換曲目的效率。
- 實現樹狀結構 (Tree View) 展示書籍層級。
- 保持手機端的 Drill-down 模式不變。
- 統一視覺風格，延續專案的薄荷綠色調與現代圓角設計。

**Non-Goals:**

- 在手機端實現全功能 Sidebar（手機端將維持 Drill-down）。
- 更改現有的樂譜渲染核心 (AlphaTab)。

## Decisions

- **Layout 結構變更**：將原本的 `main#app-content` 包裝在一個 Grid 或 Flex 佈局容器中，當在 PC 斷點時顯示 Sidebar。
- **Tree View 實現**：採用遞歸渲染或扁平化列表縮排的方式呈現書籍 > 章節 > 曲目。
- **狀態聯動**：正在播放的曲目應在 Sidebar 中以 `active` 狀態（如薄荷綠背景）標註。
- **路由優化**：當點選 Sidebar 項目時，透過更新 `window.location.hash` 來驅動內容區域更新。

## Risks / Trade-offs

- **佈局複雜度**：引入 Sidebar 會壓縮樂譜顯示空間，需確保 AlphaTab 能在容器尺寸變化時正確響應。
- **斷點切換**：需謹慎處理從 Mobile（無 Sidebar）切換至 PC（有 Sidebar）時的 DOM 元素載入邏輯。
