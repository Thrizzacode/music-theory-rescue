## Summary

將 AlphaTab 套件從 CDN 動態載入改為自我託管 (Self-host)，並引入 terser + javascript-obfuscator 建立輕量化的代碼壓縮與混淆 build pipeline。

## Motivation

目前網站部署於 HTTP 環境，且無法升級為 HTTPS。`player.js` 中透過 `import("https://cdn.jsdelivr.net/...")` 動態載入 AlphaTab，在 HTTP 頁面上會產生以下問題：

1. **跨域 ES Module import**：HTTP 頁面動態 `import()` HTTPS 資源可能觸發瀏覽器安全限制
2. **Secure Context 限制**：AlphaTab 使用的 `AudioContext`、Web Workers 在非安全環境下可能受限
3. **外部依賴風險**：CDN 可用性直接影響網站功能

此外，目前源碼以原始格式部署，缺乏壓縮與混淆保護。

## Proposed Solution

### 1. 自我託管 AlphaTab

透過 npm 下載 `@coderline/alphatab` 套件，將 dist 目錄的必要檔案（JS 模組、字型、SoundFont）放置於 `lib/alphatab/`，並修改 `player.js` 中的 3 處 CDN 引用改為本地相對路徑。

### 2. 輕量化 Build Pipeline

使用獨立 CLI 工具（不引入 bundler），透過 npm scripts 實現：

- **terser**：壓縮 JS（移除空白、縮短變數名）
- **javascript-obfuscator**：混淆 JS（重命名、字串加密）
- 產出至 `dist/` 目錄，部署時使用 `dist/` 而非 `js/`

## Impact

- Affected specs: `score-player`（AlphaTab 載入方式變更）
- Affected code: `js/player.js`, `package.json`（新增）, `lib/alphatab/`（新增）
