## ADDED Requirements

### Requirement: pc-sidebar-layout

當使用者在 PC 端（螢幕寬度 >= 1024px）查看書籍練習視圖時，應用程式應採用基於側邊欄 (Sidebar) 的佈局。

#### Scenario: desktop-layout-activation

- **WHEN** 使用者在螢幕寬度 >= 1024px 的裝置上導航至書籍練習視圖（例如 `#/play/` 或 `#/book/`）時
- **THEN** 在主內容區域的左側應顯示導航側邊欄

### Requirement: sidebar-tree-structure

側邊欄應顯示一個樹狀結構，代表當前所選書籍的層級（章節 > 曲目）。

#### Scenario: treeitem-selection

- **WHEN** 使用者點擊側邊欄中的曲目項目時
- **THEN** 主內容區域應更新以顯示該特定曲目的樂譜與播放器
