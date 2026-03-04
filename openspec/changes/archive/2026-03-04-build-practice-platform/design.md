## Context

現有的音樂樂理練習平台使用已淘汰的 Sibelius Scorch 瀏覽器 Plugin，僅能在 IE 上運行。
需以現代 Web 技術重建，讓所有裝置的現代瀏覽器都能使用。
平台包含約 10,000 個 MusicXML 樂譜檔案，分屬 5 本書籍、3 種音色、多個章節。

## Goals / Non-Goals

**Goals:**

- 以原生 JavaScript + AlphaTab 完全取代 Sibelius Scorch Plugin
- 提供 Drill-down 導航瀏覽所有樂譜
- 建構功能完整的播放器（播放/速度/移調/循環/音色切換）
- 實現桌機、平板、手機的 RWD 響應式設計
- 純靜態部署，無需後端伺服器

**Non-Goals:**

- 不做使用者帳號或登入系統
- 不做互動測驗或計分功能
- 不做即時協作功能
- 不建構後端 API 或資料庫
- 不處理音效卡選擇功能

## Decisions

### AlphaTab 透過 CDN 引入

使用 jsdelivr CDN 引入 AlphaTab，而非使用 npm + 打包工具。

**理由**：專案為純靜態網站，不使用框架，CDN 引入最為簡潔。省去 Vite/Webpack 等打包工具的設定與維護成本。

**替代方案**：

- npm + Vite：功能強大但增加不必要的複雜度
- 本地下載 AlphaTab：可行但需手動管理版本更新

**引入方式**：

```html
<script type="module">
  import * as alphaTab from "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.min.mjs";
</script>
```

### manifest.json 作為靜態資料索引

使用單一 JSON 檔案作為所有樂譜的索引，前端啟動時載入並解析。

**理由**：純靜態架構下，這是最簡單的資料管理方式。JSON 檔案可以手動維護或用腳本自動生成。

**結構設計**：

```json
{
  "books": [
    {
      "id": "ear-training",
      "name": "音感(音準)練習篇",
      "chapters": [
        {
          "id": "p1",
          "name": "P.1 單音無升降練習",
          "songs": [
            {
              "id": "no1",
              "title": "No.1",
              "tones": {
                "piano": "ear-training/p1/no1-piano.musicxml",
                "flute": "ear-training/p1/no1-flute.musicxml",
                "strings": "ear-training/p1/no1-strings.musicxml"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

**替代方案**：

- 後端 API：過度設計，不符合純靜態需求
- 按資料夾結構動態掃描：靜態託管不支援目錄列舉

### Hash-based routing 實現 SPA 導航

使用 `window.location.hash` + `hashchange` 事件實現單頁應用導航。

**理由**：原生 JavaScript 即可實現，不需要 History API 的 server-side fallback 設定，完美適配靜態託管。

**URL 格式**：

```
#/                           → 書籍列表（首頁）
#/book/{bookId}              → 章節列表
#/book/{bookId}/{chapterId}  → 曲目列表
#/play/{bookId}/{chapterId}/{songId}  → 播放器
```

**替代方案**：

- History API (pushState)：URL 更美觀但需要 server-side fallback 設定，靜態託管不方便

### 音色以 Tab 切換而非導航層級

音色（Piano/Flute/Strings）在播放器頁面以 Tab 按鈕切換，不佔用獨立的導航層級。

**理由**：三種音色是同一首曲子的不同樂器版本，語義上屬於播放器的設定而非內容分類。Drill-down 保持「書籍 → 章節 → 曲目」三層即可。

### 檔案架構設計

```
theory-practice/
├── index.html              ← SPA 入口
├── css/
│   └── style.css           ← 全站樣式 + RWD + 設計系統
├── js/
│   ├── app.js              ← 路由 + 應用初始化
│   ├── manifest.js         ← manifest.json 載入與解析
│   ├── navigation.js       ← 導航視圖渲染（書籍/章節/曲目列表）
│   └── player.js           ← AlphaTab 初始化 + 播放器控制
├── data/
│   └── manifest.json       ← 樂譜索引
└── scores/                 ← MusicXML 檔案（使用者提供）
```

## Risks / Trade-offs

- **[CDN 依賴] → 離線無法使用**：若 CDN 不可用，AlphaTab 無法載入。可考慮之後加入 Service Worker 做離線快取，但目前不在範圍內。
- **[manifest.json 體積] → 萬筆資料的 JSON 可能較大**：預估 10,000 筆歌曲的 JSON 約 1-3MB。首次載入稍慢但之後會被瀏覽器快取。必要時可分拆為每本書一個 JSON。
- **[SoundFont 檔案大小] → AlphaTab 的 SoundFont2 檔案通常 10-30MB**：首次播放需載入，之後快取。可顯示載入進度提示使用者。
- **[AlphaTab 版本鎖定] → CDN 使用 @latest 有風險**：正式部署時應鎖定特定版本號避免破壞性更新。
