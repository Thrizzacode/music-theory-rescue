## 1. AlphaTab 自我託管

- [x] [P] 1.1 透過 npm 下載 `@coderline/alphatab` 套件，將 `dist/` 中的 `alphaTab.min.mjs`、`font/` 目錄、`soundfont/sonivox.sf2` 複製至 `lib/alphatab/`
- [x] 1.2 修改 `js/player.js` 中的 3 處 CDN 引用，改為本地相對路徑：dynamic import、fontDirectory、soundFont
- [x] 1.3 清理先前下載失敗的 `lib/alphatab/` 殘留檔案（font/alphatab.woff、font/alphatab.otf 為錯誤回應）
- [x] 1.4 驗證本地載入後樂譜渲染與播放功能正常

## 2. Build Pipeline 建立

- [x] [P] 2.1 初始化 `package.json`，安裝 `terser` 與 `javascript-obfuscator` 為 devDependencies
- [x] 2.2 撰寫 npm scripts：`build:clean`（清理 dist/）、`build:minify`（terser 壓縮）、`build:obfuscate`（混淆）、`build`（串聯全流程）
- [x] 2.3 設定 build 產出至 `dist/` 目錄，包含壓縮/混淆後的 JS、CSS、HTML 及 lib/ 靜態資源複製
- [x] 2.4 驗證 `npm run build` 產出的 `dist/` 目錄能正常運行完整功能
