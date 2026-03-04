## 1. 移調控制元件重構 (Transposition)

- [x] 1.1 音程資料以常量陣列管理 — 在 `js/player.js` 中定義 `INTERVALS` 常量陣列（16 個音程選項含原調）
- [x] 1.2 使用 `<select>` + radio button 取代 slider — 替換移調 slider HTML 為升/降 radio button + `<select>` 下拉選單
- [x] 1.3 升降方向獨立為 radio button — 更新移調事件邏輯，select `change` 和 radio `change` 事件觸發 `api.transpose()`
- [x] 1.4 在 `css/style.css` 中新增移調下拉選單與 radio button 的樣式

## 2. 驗證

- [x] 2.1 驗證 light/dark mode 下移調控制元件的視覺效果
- [x] 2.2 驗證選擇音程後即時移調功能正常
