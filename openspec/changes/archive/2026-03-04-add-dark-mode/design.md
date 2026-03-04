## Context

目前平台的 CSS 設計系統使用紫色（`#6C5CE7`）作為主色，僅有深色主題。需新增淺色模式作為預設主題，並提供手動切換功能。所有色彩均已透過 CSS Custom Properties 管理，因此主題切換僅需覆蓋變數值。

## Goals / Non-Goals

**Goals:**

- 新增淺色主題（light mode）作為預設
- 保留深色主題（dark mode）作為可切換選項
- 將主色系從紫色替換為薄荷綠
- 使用者偏好持久化（localStorage）

**Non-Goals:**

- 不做自動跟隨系統設定（`prefers-color-scheme`）
- 不提供自訂主題色功能
- 不修改功能邏輯或資料結構

## Decisions

### 主色系替換為薄荷綠

| Token                   | 舊值（紫色） | 新值（薄荷綠） |
| ----------------------- | :----------: | :------------: |
| `--color-primary`       |  `#6C5CE7`   |   `#52B788`    |
| `--color-primary-light` |  `#A29BFE`   |   `#95D5B2`    |
| `--color-primary-dark`  |  `#4834D4`   |   `#2D6A4F`    |

替代方案：保留紫色 → 拒絕，因為使用者明確要求薄荷綠。

### 使用 data-theme attribute 切換主題

在 `<html>` 標籤上使用 `data-theme="dark"` attribute 來啟用深色模式。`:root` 預設為淺色主題。

```css
:root {
  /* light mode 預設 */
}
[data-theme="dark"] {
  /* dark mode 覆蓋 */
}
```

替代方案：使用 CSS class（如 `.dark-mode`） → 可行但 `data-*` attribute 更語義化。

### 獨立的 theme.js 模組

將主題切換邏輯放在獨立的 `js/theme.js` 模組中，而非混入 `app.js`，職責更清晰。

### 硬編碼 rgba 值的處理

目前 CSS 中有部分 `rgba(108, 92, 231, ...)` 硬編碼值（紫色），需替換為跟隨主題的 CSS Custom Properties，例如 `var(--border-color)` 和 `var(--glow-color)`。

### Slider 軌道色獨立變數

播放器的速度與移調滑桿在 light mode 下，軌道色若與背景同色會導致不可見。新增 `--slider-track` 變數，確保在兩種主題下都有足夠對比度。

| 主題  | `--slider-track` |
| :---: | :--------------: |
| Light |    `#D0D0E0`     |
| Dark  |    `#2A2A44`     |

### 樂譜區域強制白底

AlphaTab 渲染的樂譜 SVG 在深色背景下音符不可見。新增 `--score-bg` 變數，兩種模式下均為白底（`#FFFFFF`），確保樂譜可讀性。

## Risks / Trade-offs

- **初次載入閃爍**：若 localStorage 有 dark 偏好但 CSS 預設為 light，可能出現閃爍。→ 解法：在 `<head>` 中用 inline script 提前套用 `data-theme`。
- **AlphaTab 渲染區域**：AlphaTab 渲染的樂譜 SVG 有自己的背景色，無法跟隨主題。→ 已解決：透過 `--score-bg: #FFFFFF` 強制白底。
