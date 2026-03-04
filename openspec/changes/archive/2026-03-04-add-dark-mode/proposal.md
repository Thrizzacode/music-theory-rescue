## Why

目前平台僅有深色主題，且主色為紫色系。使用者（主要為學生）在白天教室環境下使用時，深色背景可能造成閱讀不適。新增 light/dark mode 切換功能，預設為淺色模式，讓使用者根據使用環境自行選擇，同時將主色系從紫色改為薄荷綠，更符合教育平台的視覺定位。

## What Changes

- 將 CSS Custom Properties 的 `:root` 改為淺色主題（light mode）作為預設
- 新增 `[data-theme="dark"]` 選擇器覆蓋為深色主題
- 主色系從紫色（`#6C5CE7`）替換為薄荷綠（`#52B788`）
- 在 header 右側新增 ☀️/🌙 toggle 按鈕
- 使用 localStorage 記住使用者的主題偏好
- 所有元件的 `rgba()` 硬編碼色值改為跟隨主題的 CSS Custom Properties

## Capabilities

### New Capabilities

- `theme-switching`: dark mode / light mode 切換功能，包含 toggle 按鈕、localStorage 偏好儲存、CSS 主題覆蓋

### Modified Capabilities

- `responsive-layout`: CSS design system 的色彩 token 將從紫色系更換為薄荷綠系，並新增雙主題支援

## Impact

- 受影響的檔案：`css/style.css`、`index.html`、`js/app.js`（或新增 `js/theme.js`）
- 無 API 影響
- 無資料結構變更
- 所有互動功能不受影響
