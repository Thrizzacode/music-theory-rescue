# score-player Specification

## Purpose

TBD - created by archiving change 'build-practice-platform'. Update Purpose after archive.

## Requirements

### Requirement: MusicXML score rendering

系統須使用 AlphaTab 將 MusicXML 檔案渲染為可視化的音樂譜面。
渲染的譜面須顯示標準音樂記譜法（譜表、音符、拍號、調號）。

#### Scenario: 樂譜正確顯示

- **WHEN** 使用者從曲目列表中選擇一首曲子
- **THEN** 系統載入對應的 MusicXML 檔案
- **THEN** AlphaTab 在播放器視圖中渲染音樂譜面

#### Scenario: 樂譜載入失敗

- **WHEN** MusicXML 檔案載入失敗
- **THEN** 系統在播放器區域顯示錯誤訊息

---
### Requirement: Playback controls

系統須提供播放、暫停和停止的控制按鈕進行音頻播放。
播放須使用 AlphaTab 內建的 MIDI 合成器搭配 SoundFont2。

#### Scenario: 播放與暫停

- **WHEN** 使用者點擊播放按鈕
- **THEN** 系統開始播放已渲染的樂譜，並以視覺游標追蹤目前播放位置
- **WHEN** 使用者在播放中點擊暫停按鈕
- **THEN** 播放在目前位置暫停

#### Scenario: 停止播放

- **WHEN** 使用者在播放中點擊停止按鈕
- **THEN** 播放停止且位置重置至開頭

---
### Requirement: Measure navigation

系統須提供前進和後退按鈕，在小節之間移動播放位置。

#### Scenario: 前進至下一小節

- **WHEN** 使用者點擊前進按鈕
- **THEN** 播放位置移動至下一個小節

#### Scenario: 後退至上一小節

- **WHEN** 使用者點擊後退按鈕
- **THEN** 播放位置移動至上一個小節

---
### Requirement: Playback speed control

系統須允許使用者調整播放速度（tempo）。
速度控制須支援一定範圍的 tempo 數值。

#### Scenario: 調整播放速度

- **WHEN** 使用者調整速度控制滑桿或輸入控件
- **THEN** 播放 tempo 即時隨之改變

---
### Requirement: Transposition

系統須允許使用者透過**下拉選單**選擇音程來移調樂譜，並透過**升/降方向選擇**決定移調方向。
系統須支援 15 種標準音程選項加上原調（共 16 個選項），涵蓋向上與向下移調。

#### Scenario: 選擇移調音程

- **WHEN** 使用者從下拉選單中選擇一個音程（例如「大三度 (4個半音)」）
- **THEN** 樂譜中所有音符依選定的半音數與方向移調
- **THEN** 渲染的譜面與播放皆反映移調結果

#### Scenario: 切換移調方向

- **WHEN** 使用者切換升/降方向（radio button）
- **THEN** 若已選擇非原調的音程，移調方向立即反映變更
- **THEN** 渲染的譜面與播放皆反映新的移調結果

#### Scenario: 恢復原調

- **WHEN** 使用者從下拉選單中選擇「原調」
- **THEN** 移調重置為 0，樂譜恢復原始調性

#### Scenario: 音程選項清單

- **WHEN** 使用者展開移調下拉選單
- **THEN** 顯示以下 16 個選項：
  - 原調 (0)
  - 小二度 (1個半音)
  - 大二度 (2個半音)
  - 小三度 (3個半音)
  - 大三度 (4個半音)
  - 完全四度 (5個半音)
  - 增四度 (6個半音)
  - 減五度 (6個半音)
  - 完全五度 (7個半音)
  - 增五度 (8個半音)
  - 小六度 (8個半音)
  - 大六度 (9個半音)
  - 增六度 (10個半音)
  - 小七度 (10個半音)
  - 大七度 (11個半音)
  - 完全八度 (12個半音)


<!-- @trace
source: transpose-dropdown
updated: 2026-03-04
code:
  - js/player.js
  - css/style.css
-->

---
### Requirement: Section loop

系統須允許使用者選取一段小節範圍，並在該範圍內循環播放。

#### Scenario: 設定並播放循環

- **WHEN** 使用者選擇循環的起始小節和結束小節
- **THEN** 播放在所選範圍內反覆循環，直到使用者停用循環功能

#### Scenario: 停用循環

- **WHEN** 使用者停用循環功能
- **THEN** 播放正常繼續，不再受範圍限制

---
### Requirement: Tone switching

系統須提供 Tab 樣式按鈕，切換目前曲目的音色版本（鋼琴、長笛、弦樂）。
切換音色須載入該音色對應的 MusicXML 檔案。

#### Scenario: 切換音色

- **WHEN** 使用者點擊不同的音色 Tab（例如從鋼琴切換至長笛）
- **THEN** 系統載入所選音色的 MusicXML 檔案
- **THEN** AlphaTab 以新檔案重新渲染譜面
- **THEN** 播放位置重置至開頭

#### Scenario: 當前音色指示

- **WHEN** 一個音色 Tab 被選取
- **THEN** 該 Tab 以視覺效果標示為當前選取狀態