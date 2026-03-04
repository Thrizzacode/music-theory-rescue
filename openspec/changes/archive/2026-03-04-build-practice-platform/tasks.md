## 1. 專案基礎建置

- [x] 1.1 依檔案架構設計建立 `index.html` SPA 入口，含 semantic HTML structure，AlphaTab 透過 CDN 引入
- [x] [P] 1.2 建立 CSS design system（`css/style.css`），定義 CSS Custom Properties、基礎排版與色彩
- [x] [P] 1.3 依 manifest.json 作為靜態資料索引的設計，建立 `data/manifest.json` demo 資料（含範例書籍、章節、曲目結構）
- [x] [P] 1.4 建立 demo MusicXML 檔案供開發測試使用

## 2. 導航系統

- [x] 2.1 實作 Manifest 載入模組（`js/manifest.js`）— 載入並解析 manifest.json
- [x] 2.2 實作 hash-based routing 實現 SPA 導航（`js/app.js`）— 監聽 hashchange 事件，解析 URL 並分派視圖
- [x] 2.3 實作 Drill-down 書籍列表視圖 — 首頁顯示所有書籍卡片
- [x] 2.4 實作章節列表視圖 — 顯示所選書籍的所有章節
- [x] 2.5 實作曲目列表視圖 — 顯示所選章節的所有曲目
- [x] 2.6 實作 Breadcrumb 導航元件 — 顯示導航路徑並支援點擊返回
- [x] 2.7 實作 single page application shell — 頁首區域 + 動態內容區域切換
- [x] 2.8 實作 direct URL access — 開啟書籤 hash URL 時還原導航狀態

## 3. 樂譜播放器

- [x] 3.1 實作 MusicXML score rendering — 使用 AlphaTab 載入並渲染 MusicXML 樂譜
- [x] 3.2 實作 playback controls — 播放、暫停、停止按鈕與 AlphaTab Player API 整合
- [x] 3.3 實作 measure navigation — 前進/後退按鈕在小節間移動播放位置
- [x] 3.4 實作 playback speed control — 速度調整滑桿/輸入控件
- [x] 3.5 實作 transposition — 上下移調控制（30 種變化）
- [x] 3.6 實作 section loop — 選取段落範圍並循環播放
- [x] 3.7 實作 tone switching — 音色以 Tab 切換而非導航層級，鋼琴/長笛/弦樂切換載入對應 MusicXML 檔案

## 4. 響應式設計

- [x] [P] 4.1 實作 mobile-first responsive design — 手機版（< 768px）單欄佈局
- [x] [P] 4.2 實作平板版響應式佈局（768px ~ 1023px）— 雙欄網格 + 觸控友善播放控制
- [x] [P] 4.3 實作桌機版響應式佈局（≥ 1024px）— 多欄網格 + 水平工具列
- [x] 4.4 播放器控制列的響應式排版 — 根據螢幕寬度調整控制元件佈局

## 5. 整合與收尾

- [x] 5.1 整合所有模組，確認完整導航流程（書籍 → 章節 → 曲目 → 播放器）
- [x] 5.2 錯誤處理 — manifest load failure、score load failure 的提示訊息
- [x] 5.3 SoundFont 載入進度提示
- [x] 5.4 跨瀏覽器測試（Chrome、Firefox、Safari、Edge）
- [x] 5.5 行動裝置實機測試（手機與平板觸控操作）
