## MODIFIED Requirements

### Requirement: CSS design system

CSS Custom Properties 的主色須從紫色（`#6C5CE7`）更換為薄荷綠（`#52B788`）。
設計系統須透過 CSS Custom Properties 支援 light 和 dark 雙主題變體。

#### Scenario: Light mode 主色

- **WHEN** light mode 啟用時
- **THEN** 互動元素（按鈕、連結、active 狀態）使用薄荷綠（`#52B788`）及其變體

#### Scenario: Dark mode 主色

- **WHEN** dark mode 啟用時
- **THEN** 互動元素使用薄荷綠（`#52B788`）及其變體，並針對深色背景調整對比度
