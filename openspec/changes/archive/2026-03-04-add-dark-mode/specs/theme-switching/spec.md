## ADDED Requirements

### Requirement: Theme toggle button

系統須在 header 區域顯示一個切換按鈕，讓使用者在 light mode 和 dark mode 之間切換。

#### Scenario: Toggle 按鈕可見性

- **WHEN** 應用程式載入
- **THEN** header 右側顯示一個主題切換按鈕

#### Scenario: 切換至 dark mode

- **WHEN** 使用者在 light mode 下點擊切換按鈕
- **THEN** 介面立即切換至 dark mode
- **THEN** 切換圖示更新以反映目前模式

#### Scenario: 切換至 light mode

- **WHEN** 使用者在 dark mode 下點擊切換按鈕
- **THEN** 介面立即切換至 light mode
- **THEN** 切換圖示更新以反映目前模式

### Requirement: Theme persistence

系統須使用 localStorage 持久化使用者的主題偏好。
當沒有已儲存的偏好時，預設主題須為 light mode。

#### Scenario: 切換時儲存偏好

- **WHEN** 使用者切換主題
- **THEN** 偏好設定儲存至 localStorage

#### Scenario: 載入時還原偏好

- **WHEN** 應用程式載入且 localStorage 中存在主題偏好
- **THEN** 套用已儲存的主題

#### Scenario: 預設為 light mode

- **WHEN** 應用程式載入且 localStorage 中沒有主題偏好
- **THEN** 套用 light mode 作為預設

### Requirement: CSS theme variables

系統須為 light 和 dark 兩種主題定義完整的 CSS Custom Properties。
所有 UI 元件的色彩須完全由這些變數驅動。

#### Scenario: Light mode 色彩

- **WHEN** light mode 啟用時
- **THEN** 背景使用淺色系、文字使用深色系
- **THEN** 主色使用薄荷綠色系（`#52B788`）

#### Scenario: Dark mode 色彩

- **WHEN** dark mode 啟用時
- **THEN** 背景使用深色系、文字使用淺色系
- **THEN** 主色使用薄荷綠色系（`#52B788`）

#### Scenario: Slider 軌道色對比度

- **WHEN** 任一主題啟用時
- **THEN** 播放器滑桿（速度、移調）的軌道色與背景之間須有足夠對比度，確保可見性

#### Scenario: 樂譜區域背景色

- **WHEN** dark mode 啟用時
- **THEN** 樂譜顯示區域（`.score-display`）維持白色底色，確保音符的可讀性

### Requirement: Smooth theme transition

系統須在切換主題時套用平滑的 CSS transition 效果。

#### Scenario: 無閃爍過渡

- **WHEN** 主題被切換
- **THEN** 色彩平滑過渡，不出現突兀的閃爍
