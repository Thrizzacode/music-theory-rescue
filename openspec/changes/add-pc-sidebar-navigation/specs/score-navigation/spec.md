## ADDED Requirements

### Requirement: sidebar-navigation-state

側邊欄應反映當前的導航狀態，並醒目提示 (Highlight) 當前活動的章節或曲目。

#### Scenario: automatic-highlighting

- **WHEN** 當前的 hash 路由發生變化時
- **THEN** 側邊欄中對應的項目應被視覺化標記為「活動中」（例如使用不同的背景顏色）

### Requirement: sidebar-toggle-behavior

側邊欄中的章節應可折疊 (Collapsible)，以優化垂直空間的利用。

#### Scenario: chapter-collapse

- **WHEN** 使用者點擊側邊欄中的章節標題時
- **THEN** 其關連的曲目列表應在顯示與隱藏狀態之間切換
