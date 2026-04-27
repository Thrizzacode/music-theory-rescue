## 1. 結構與樣式準備

- [x] [P] 1.1 在 `index.html` 中調整佈局結構，引入 `#app-sidebar` 與內容區的容器包裝
- [x] [P] 1.2 在 `style.css` 中定義 Sidebar 的基本樣式、斷點隱藏邏輯（Mobile 隱藏，PC 顯示）
- [x] [P] 1.3 為 Sidebar 的樹狀項目（章節、曲目）設計現代化的 UI 樣式，包含縮排與選中狀態

## 2. 導覽邏輯開發

- [x] [P] 2.1 在 `navigation.js` 中新增 `renderSidebar` 函數，負責根據 manifest 資料渲染樹狀目錄
- [x] [P] 2.2 實作 Sidebar 的「展開/收合」點擊行為 (sidebar-toggle-behavior)，並確保選中狀態能隨路由更新 (sidebar-navigation-state)
- [x] 2.3 在 `app.js` 的 `handleRoute` 邏輯中，整合 Sidebar 的更新機制，確保進入書籍後自動顯示正確內容

## 3. 響應式優化與驗證

- [x] 3.1 驗證 PC 端 (>= 1024px) 佈局正常 (pc-sidebar-layout)，且內容區域能隨 Sidebar 寬度自適應
- [x] 3.2 驗證 Mobile 端維持原本的下鑽式導覽，不顯示 Sidebar
- [x] 3.3 測試跨書籍切換時，Sidebar 的內容能同步重載與更新
