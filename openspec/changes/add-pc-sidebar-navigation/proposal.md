## Why

目前 PC 端的導覽邏輯沿用手機端的下鑽式 (Drill-down) 模式，導致在大螢幕下畫面顯得空洞，且使用者在切換曲目時需要頻繁點擊「返回」與「進入」，操作路徑過長。為了提昇桌機使用者的練習效率，我們需要一種更專業、直覺且具備全域視野的導覽方式。

## What Changes

在 PC 端環境下，當使用者選定書籍進入練習區後，將在左側引入一個現代化的「樹狀結構導航 Sidebar」。使用者可以透過此 Sidebar 在不離開練習畫面的情況下，快速於章節與曲目間切換。同時，手機端維持原本的 Drill-down 邏輯以符合行動裝置的操作習慣。

## Capabilities

### New Capabilities

(無)

### Modified Capabilities

- `score-navigation`: 修改導覽行為，於 PC 端引入 Sidebar 並調整路由切換時的 UI 表現。
- `responsive-layout`: 定義新的佈局結構，包含 Sidebar 的顯示/隱藏邏輯及其在不同斷點下的行為。

## Impact

- Affected specs: `score-navigation`, `responsive-layout`
- Affected code: `index.html`, `css/style.css`, `js/app.js`, `js/navigation.js`
