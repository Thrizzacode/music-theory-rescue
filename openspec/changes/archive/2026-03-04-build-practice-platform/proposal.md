## Why

現有的音樂樂理練習平台（搶救大作戰系列，lesson.musiker.com.tw）使用已淘汰的 Sibelius Scorch 瀏覽器 Plugin 技術。
該 Plugin 自 2015 年起已不被現代瀏覽器支援（Chrome 停止 NPAPI），目前僅能在 IE 上運行。
需要以現代 Web 技術重新建構平台，使其能在所有裝置（桌機、平板、手機）的現代瀏覽器中正常使用。

## What Changes

- 以原生 JavaScript + AlphaTab（CDN）取代 Sibelius Scorch Plugin，實現樂譜渲染與音頻播放
- 建構 Drill-down 導航系統（書籍 → 章節 → 曲目 → 播放器）
- 開發功能完整的樂譜播放器（播放/停止/速度調整/移調/段落循環/音色切換）
- 使用 manifest.json 管理約 10,000 筆 MusicXML 樂譜索引
- 實現全站 RWD 響應式設計，支援桌機、平板、手機
- 純靜態架構，無需後端與打包工具

## Capabilities

### New Capabilities

- `score-navigation`: 樂譜瀏覽與導航系統 — 書籍列表、章節列表、曲目列表的 Drill-down 導航，以及 manifest.json 資料索引載入與解析
- `score-player`: 樂譜播放器 — 使用 AlphaTab 渲染 MusicXML 樂譜，提供播放/暫停/停止、前進/後退、速度調整、上下移調（30 種變化）、段落循環、音色切換（鋼琴/長笛/弦樂 Tab）等功能
- `responsive-layout`: 響應式佈局與 UI 框架 — 全站 RWD 佈局、CSS 設計系統（Custom Properties）、Mobile-first 斷點設計、頁面路由（hash-based routing）

### Modified Capabilities

（無 — 全新建構）

## Impact

- 新增檔案：`index.html`、`css/style.css`、`js/app.js`、`js/player.js`、`js/ui.js`、`data/manifest.json`
- 外部依賴：AlphaTab（透過 CDN 引入）、SoundFont2 音色檔
- 資料需求：約 10,000 個 MusicXML 檔案（使用者之後提供，先以 demo 檔案開發）
- 部署方式：純靜態檔案，可部署至任何 Web Server、GitHub Pages 或 Netlify
