## Why

目前移調控制使用 slider 滑桿（range input），數值範圍 -15 到 +15。使用者需要拖曳滑桿來選擇半音數，但無法直觀了解每個半音數對應的音程名稱（例如「大三度 = 4 個半音」）。仿照原版 Sibelius Scorch 的移調 UI，改為下拉選單 + 升降方向選擇，讓使用者可以直接根據**音程名稱**點選移調目標。

## What Changes

- 移除移調控制的 slider（`<input type="range">`）
- 新增升/降方向選擇（radio button）
- 新增音程下拉選單（`<select>`），提供 15 個標準音程 + 原調選項
- 選擇後即時套用移調，不需確認按鈕
- 更新播放器 CSS 樣式以適配新控制元件

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `score-player`: 移調控制的 UI 從 slider 改為下拉選單 + 升降方向 radio button

## Impact

- 受影響的 spec: `score-player`（Transposition requirement）
- 受影響的程式碼: `js/player.js`（HTML 模板 + 事件邏輯）、`css/style.css`（移調控制元件樣式）
