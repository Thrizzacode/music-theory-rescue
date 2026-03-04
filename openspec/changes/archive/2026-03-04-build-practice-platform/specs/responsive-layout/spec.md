## ADDED Requirements

### Requirement: Mobile-first responsive design

系統須採用 mobile-first CSS 設計方式，並設定平板（768px）和桌機（1024px）的響應式斷點。
所有視圖須在 320px 至 1920px 寬度的螢幕上完整可用。

#### Scenario: 手機版佈局

- **WHEN** viewport 寬度低於 768px
- **THEN** 內容以單欄佈局顯示
- **THEN** 導航卡片垂直堆疊
- **THEN** 播放器控制以垂直排列，便於觸控操作

#### Scenario: 平板版佈局

- **WHEN** viewport 寬度介於 768px 至 1023px 之間
- **THEN** 導航卡片以雙欄網格顯示
- **THEN** 播放器控制以觸控友善的佈局排列

#### Scenario: 桌機版佈局

- **WHEN** viewport 寬度為 1024px 或以上
- **THEN** 導航卡片以三欄或更寬的網格顯示
- **THEN** 播放器控制以水平工具列佈局顯示

### Requirement: CSS design system

系統須使用 CSS Custom Properties 定義一致的設計系統，包含顏色、字型、間距與圓角等設計 token。

#### Scenario: 主題一致性

- **WHEN** 任何 UI 元件被渲染
- **THEN** 該元件僅使用定義為 CSS Custom Properties 的設計 token
- **THEN** 所有視圖的視覺外觀保持一致

### Requirement: Single page application shell

系統須以單頁應用的方式運作，具備固定的頁首/導航區域和動態內容區域。
頁面切換不得觸發整頁重新載入。

#### Scenario: 視圖切換

- **WHEN** 使用者在各視圖間導航（書籍列表、章節列表、曲目列表、播放器）
- **THEN** 僅內容區域更新，不觸發整頁重新載入
- **THEN** 頁首保持可見且穩定

### Requirement: Semantic HTML structure

系統須使用語義化 HTML5 元素（header、nav、main、section、article、footer）建構頁面結構。

#### Scenario: 無障礙結構

- **WHEN** 頁面被渲染
- **THEN** 頁面結構使用適當的語義化 HTML5 元素
- **THEN** 互動元素支援鍵盤操作
