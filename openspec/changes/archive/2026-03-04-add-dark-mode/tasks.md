## 1. CSS 主題系統重構

- [x] 1.1 主色系替換為薄荷綠 — 將 `:root` 中的 `--color-primary` 系列從紫色改為薄荷綠（CSS design system）
- [x] 1.2 使用 data-theme attribute 切換主題 — `:root` 改為 light mode 預設值，新增 `[data-theme="dark"]` 覆蓋（CSS theme variables）
- [x] 1.3 硬編碼 rgba 值的處理 — 將所有 `rgba(108, 92, 231, ...)` 替換為 CSS Custom Properties

## 2. 主題切換功能

- [x] 2.1 在 `index.html` header 右側新增 theme toggle button
- [x] 2.2 建立獨立的 theme.js 模組 — 實作 theme persistence（localStorage 讀寫）與切換邏輯
- [x] 2.3 實作 smooth theme transition — 切換主題時色彩平滑過渡
- [x] 2.4 在 `<head>` 中加入 inline script 防止初次載入閃爍

## 3. 驗證

- [x] 3.1 驗證 light mode 和 dark mode 的視覺效果
- [x] 3.2 驗證 theme toggle button 在手機、平板、桌機的響應式佈局
