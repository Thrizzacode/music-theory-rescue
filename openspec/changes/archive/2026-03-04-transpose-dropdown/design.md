## Context

目前播放器的移調控制使用 `<input type="range">`（slider），數值 -15 到 +15。使用者無法從數字直覺了解音程，需改為下拉選單搭配升降方向選擇。AlphaTab API 的 `api.transpose(semitones)` 接受正負半音數。

## Goals / Non-Goals

**Goals:**

- 將移調 slider 替換為 `<select>` 下拉選單 + 升/降 radio button
- 選項使用中文音程名稱 + 半音數標示
- 選擇後即時套用移調
- 佈局適配 RWD

**Non-Goals:**

- 不新增自定義半音數輸入
- 不修改速度控制（保留 slider）
- 不修改 AlphaTab API 呼叫方式

## Decisions

### 使用 `<select>` + radio button 取代 slider

移調不是連續值，而是離散的音程選擇。下拉選單比 slider 更適合：

- 使用者可直接看到音程名稱
- 不需猜測數字的音樂意義
- 異名同音（如增四度/減五度）可同時列出

替代方案：使用按鈕群組 → 拒絕，16 個按鈕太佔空間。

### 升降方向獨立為 radio button

方向與音程分離，邏輯更清晰。最終 transpose 值 = 方向(±1) × 選中音程半音數。

### 音程資料以常量陣列管理

在 `player.js` 中定義 `INTERVALS` 常量陣列，包含 `{ name, semitones }` 物件。便於維護和擴展。

```javascript
const INTERVALS = [
  { name: "原調", semitones: 0 },
  { name: "小二度 (1個半音)", semitones: 1 },
  // ...
];
```

## Risks / Trade-offs

- **異名同音選項**：增四度/減五度都是 6 個半音，增五度/小六度都是 8 個半音。對 AlphaTab 來說效果相同，但對音樂學習者有不同意義，所以保留兩個選項。
- **RWD**：手機版 `<select>` 會觸發原生選擇器，體驗良好。但需確保 radio button + select 在小螢幕下不會換行混亂。
