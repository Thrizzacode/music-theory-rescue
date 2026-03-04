## ADDED Requirements

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

### Requirement: Measure navigation

系統須提供前進和後退按鈕，在小節之間移動播放位置。

#### Scenario: 前進至下一小節

- **WHEN** 使用者點擊前進按鈕
- **THEN** 播放位置移動至下一個小節

#### Scenario: 後退至上一小節

- **WHEN** 使用者點擊後退按鈕
- **THEN** 播放位置移動至上一個小節

### Requirement: Playback speed control

系統須允許使用者調整播放速度（tempo）。
速度控制須支援一定範圍的 tempo 數值。

#### Scenario: 調整播放速度

- **WHEN** 使用者調整速度控制滑桿或輸入控件
- **THEN** 播放 tempo 即時隨之改變

### Requirement: Transposition

系統須允許使用者將樂譜上下移調。
系統須支援 30 種移調變化。

#### Scenario: 升調

- **WHEN** 使用者增加移調數值
- **THEN** 樂譜中所有音符依指定半音數上移
- **THEN** 渲染的譜面與播放皆反映移調結果

#### Scenario: 降調

- **WHEN** 使用者減少移調數值
- **THEN** 樂譜中所有音符依指定半音數下移

### Requirement: Section loop

系統須允許使用者選取一段小節範圍，並在該範圍內循環播放。

#### Scenario: 設定並播放循環

- **WHEN** 使用者選擇循環的起始小節和結束小節
- **THEN** 播放在所選範圍內反覆循環，直到使用者停用循環功能

#### Scenario: 停用循環

- **WHEN** 使用者停用循環功能
- **THEN** 播放正常繼續，不再受範圍限制

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
