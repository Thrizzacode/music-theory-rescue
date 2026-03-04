# responsive-layout Specification

## Purpose

TBD - created by archiving change 'build-practice-platform'. Update Purpose after archive.

## Requirements

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

---
### Requirement: CSS design system

CSS Custom Properties 的主色須從紫色（`#6C5CE7`）更換為薄荷綠（`#52B788`）。
設計系統須透過 CSS Custom Properties 支援 light 和 dark 雙主題變體。

#### Scenario: Light mode 主色

- **WHEN** light mode 啟用時
- **THEN** 互動元素（按鈕、連結、active 狀態）使用薄荷綠（`#52B788`）及其變體

#### Scenario: Dark mode 主色

- **WHEN** dark mode 啟用時
- **THEN** 互動元素使用薄荷綠（`#52B788`）及其變體，並針對深色背景調整對比度

---
### Requirement: Single page application shell

系統須以單頁應用的方式運作，具備固定的頁首/導航區域和動態內容區域。
頁面切換不得觸發整頁重新載入。

#### Scenario: 視圖切換

- **WHEN** 使用者在各視圖間導航（書籍列表、章節列表、曲目列表、播放器）
- **THEN** 僅內容區域更新，不觸發整頁重新載入
- **THEN** 頁首保持可見且穩定

---
### Requirement: Semantic HTML structure

系統須使用語義化 HTML5 元素（header、nav、main、section、article、footer）建構頁面結構。

#### Scenario: 無障礙結構

- **WHEN** 頁面被渲染
- **THEN** 頁面結構使用適當的語義化 HTML5 元素
- **THEN** 互動元素支援鍵盤操作
