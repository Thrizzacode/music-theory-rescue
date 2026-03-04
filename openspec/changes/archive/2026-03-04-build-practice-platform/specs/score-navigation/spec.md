## ADDED Requirements

### Requirement: Drill-down 書籍列表

系統須以互動式卡片形式顯示所有可用書籍於首頁視圖。
每張卡片須顯示書籍名稱。

#### Scenario: 首頁顯示書籍列表

- **WHEN** 使用者開啟應用程式
- **THEN** 系統從 manifest.json 載入所有書籍並以可選擇的卡片形式顯示

### Requirement: 章節列表

系統須在使用者選擇書籍後，顯示該書籍下的所有章節。

#### Scenario: 進入書籍查看章節

- **WHEN** 使用者從首頁選擇一本書籍
- **THEN** 系統顯示該書籍下的所有章節列表
- **THEN** 系統顯示 breadcrumb 導航路徑

### Requirement: 曲目列表

系統須在使用者選擇章節後，顯示該章節下的所有曲目。

#### Scenario: 進入章節查看曲目

- **WHEN** 使用者從章節列表中選擇一個章節
- **THEN** 系統顯示該章節下的所有曲目列表
- **THEN** 系統顯示 breadcrumb 導航路徑（書籍 > 章節）

### Requirement: Breadcrumb 導航

系統須顯示 breadcrumb 導航路徑，標示使用者目前所在位置。
breadcrumb 的每個區段皆須可點擊，以返回該層級。

#### Scenario: 透過 breadcrumb 返回上層

- **WHEN** 使用者正在查看曲目列表，並點擊 breadcrumb 中的書籍名稱
- **THEN** 系統導航回該書籍的章節列表

### Requirement: Manifest 載入

系統須在啟動時載入並解析 manifest.json 檔案，該檔案包含所有書籍、章節與曲目的完整索引及其 MusicXML 檔案路徑。

#### Scenario: Manifest 載入成功

- **WHEN** 應用程式啟動
- **THEN** 系統擷取並解析 manifest.json
- **THEN** 導航樹以所有索引內容填充完成

#### Scenario: Manifest 載入失敗

- **WHEN** manifest.json 載入失敗或格式錯誤
- **THEN** 系統顯示錯誤訊息，告知無法載入資料

### Requirement: Hash-based routing

系統須使用 hash-based URL 表示目前的導航狀態。
每個導航層級須有唯一的 hash URL，讓使用者可以加入書籤或分享連結。

#### Scenario: URL 反映導航狀態

- **WHEN** 使用者導航至 書籍 > 章節 > 曲目
- **THEN** 瀏覽器的 URL hash 更新以反映目前路徑

#### Scenario: 直接 URL 存取

- **WHEN** 使用者直接開啟已加入書籤的 hash URL
- **THEN** 系統還原導航狀態至對應的視圖
