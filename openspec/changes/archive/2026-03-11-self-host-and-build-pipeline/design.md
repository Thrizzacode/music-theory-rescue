## Context

目前 `player.js` 中透過 3 處 CDN URL 動態載入 AlphaTab（JS 模組、字型目錄、SoundFont）。網站部署在 HTTP 環境且無法升級 HTTPS，需要消除對外部 HTTPS CDN 的依賴。同時希望對自有 JS 源碼進行壓縮與混淆，但不想引入 Vite/Webpack 等打包工具來改變現有的純 Vanilla ES Modules 架構。

## Goals / Non-Goals

**Goals:**

- 將 AlphaTab 所有資源（JS、字型、SoundFont）下載至本地 `lib/alphatab/` 目錄，從同源載入
- 修改 `player.js` 中的 CDN 引用為本地相對路徑
- 建立基於 `terser` + `javascript-obfuscator` 的 npm scripts build pipeline
- 產出部署用的壓縮/混淆版本至 `dist/` 目錄

**Non-Goals:**

- 不引入 bundler（Vite、Webpack、Rollup 等）
- 不變更現有的 ES Modules 模組架構
- 不處理 CSS 壓縮（未來可擴充）
- 不自動化 CI/CD 部署流程

## Decisions

- **AlphaTab 取得方式**：使用 `npm pack @coderline/alphatab` 下載完整套件 tarball，解壓後僅保留 `dist/` 中的必要檔案。避免直接 curl CDN（之前測試 font 檔回傳 404）。
- **lib/ 目錄結構**：`lib/alphatab/` 保持與 npm 套件 dist 相同的子目錄結構（`font/`、`soundfont/`），方便未來升級時直接替換。
- **Build 產出目錄**：使用 `dist/` 目錄存放壓縮/混淆後的 JS 與 CSS，`lib/` 目錄（第三方套件）和靜態資源直接複製。
- **Build 工具鏈**：`terser`（壓縮）→ `javascript-obfuscator`（混淆），兩者皆為獨立 CLI，串聯在 npm scripts 中。
- **版本鎖定**：`package.json` 中鎖定 AlphaTab 版本號，避免 `@latest` 帶來的不確定性。

## Risks / Trade-offs

- **repo 體積增加**：SoundFont 檔案約 1.3MB，字型檔數十 KB，會增加 git 倉庫大小。可考慮在 `.gitignore` 排除並在 build 時下載，但這增加了 build 複雜度。初期先直接提交。
- **手動升級**：AlphaTab 版本升級需要手動重新下載。可透過 npm script 自動化此流程。
- **混淆後偵錯困難**：壓縮/混淆後的代碼難以偵錯。建議同時產出 source map 但不部署至生產環境。
