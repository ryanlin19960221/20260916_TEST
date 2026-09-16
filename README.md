# AIoT-DA 課程 — DIC-1（Do in Class 1）專案說明文件

> **儲存庫網址**：[https://github.com/ryanlin19960221/20260916_TEST](https://github.com/ryanlin19960221/20260916_TEST)  
> **Live Demo Page**：[https://ryanlin19960221.github.io/20260916_TEST/](https://ryanlin19960221.github.io/20260916_TEST/)  

---

## 📌 1. 專案定位與教學故事線（Pedagogical Storyline）

本實作是 **AIoT-DA 課程 Lecture 2** 的核心範例與學生實作藍本（DIC-1），堅持採用 **「零框架、零建構依賴（Zero-Dependency Vanilla Stack）」**，使初學者能穿透現代框架的抽象層，直探 Web 原生底層運作原理：

$$\underbrace{\text{Browser}}_{\text{宿主環境}} \longrightarrow \underbrace{\text{HTML5}}_{\text{語意結構}} \longrightarrow \underbrace{\text{CSS3}}_{\text{Tokens 與毛玻璃}} \longrightarrow \underbrace{\text{Modern JS}}_{\text{邏輯與事件}} \longrightarrow \underbrace{\text{Fetch API / JSON}}_{\text{非同步資料解耦}} \longrightarrow \underbrace{\text{DOM Manipulation}}_{\text{動態渲染}} \longrightarrow \underbrace{\text{LocalStorage}}_{\text{狀態樹持久化}} \longrightarrow \underbrace{\text{GitHub Pages}}_{\text{無伺服器上線}}$$

> 💡 **銜接 Lecture 3 的教學伏筆**：  
> 學生在 L2 學會使用 `fetch('./projects.json')` 實踐「資料與視圖分離」。到了 **Lecture 3**，這個本機靜態 JSON 檔案將自然替換為自建的 **FastAPI + SQLite** 感測器與物聯網後端，使學習曲線平滑且具延續性。

---

## 📁 2. 專案結構與模組說明

```text
d:\Huan Chen\AIoT2026\L2Web\
├── index.html               # 語意化 HTML5 骨架、毛玻璃卡片、時鐘與抽屜面板
├── style.css                # CSS Custom Properties、主題代碼、毛玻璃與動畫系統
├── app.js                   # 高精度時鐘引擎、Web Audio API 合成、狀態機與動態渲染
├── projects.json            # AIoT 代表性作品集資料庫（非同步資料源）
├── requirements.md          # 軟體需求規格書（由 Grilling 訪談沉澱）
├── design.md                # 系統架構設計與資料契約規範
├── README.md                # 課堂專案總結與部署手冊
└── .agents/                 # Workspace 自訂 AI 協作技能
    └── skills/
        ├── grill-me/        # Matt Pocock 需求探索訪談技能
        └── grilling/        # 決策樹探索引擎
```

### 核心檔案職責

| 檔案 | 角色與技術重點 |
| :--- | :--- |
| **`index.html`** | 結構層：語意化標籤、SVG 圓環時鐘、Hero 個人資訊卡片、無障礙 ARIA 標籤、Slide-Out 抽屜面板。 |
| **`style.css`** | 樣式層：CSS 變數系統、`backdrop-filter` 磨砂毛玻璃、三套主題風格（Aurora / Minimal / Sunset）、Zen Mode 隱藏動畫、全響應式 RWD。 |
| **`app.js`** | 行為層：`requestAnimationFrame` 秒級/毫秒時鐘、Web Audio API 微型振盪器機械音效合成、單一狀態樹與 `localStorage` 雙向同步。 |
| **`projects.json`** | 資料層：示範「畫面不寫死資料」，收錄 Edge AI、TinyML、LoRaWAN、數位分身等 AIoT 代表性專案。 |

---

## ✨ 3. 六大核心功能與技術亮點

### 1. 動態高精度時鐘（Hero Timekeeper）
- **向量同心秒級進度環**：使用純 SVG `<circle>` 幾何形狀（半徑 $r=162$，周長 $C=2\pi r \approx 1017.88$），以毫秒級平滑更新 `strokeDashoffset`。
- **時段感知問候**：依當前小時（$05\sim 11$ 早晨、$12\sim 16$ 午後、$17\sim 21$ 傍晚、$22\sim 04$ 深夜）動態切換問候語與圖標。
- **12H / 24H 制無縫切換**：支援 AM/PM 標籤，狀態自動記憶。
- **高科技子資訊列**：即時顯示 UNIX Epoch 秒數與當前毫秒（ms）。

### 2. 即時個人識別與行內編輯（Live Editable Identity）
- 姓名與職稱支援行內點擊編輯（`contenteditable`）。
- 編輯後即時重新計算頭像縮寫（如 `Huan Chen` $\rightarrow$ `HC`），並同步存入 LocalStorage。

### 3. 非同步作品集載入（Fetch API & Dynamic Templating）
- 頁面初始不包含任何專案 HTML 卡片。
- 透過 `fetch('./projects.json')` 非同步取得資料，再以 JavaScript Template Literals 動態插入 DOM。

### 4. 模組化毛玻璃側邊抽屜（Slide-Out Glass Drawer）
- 首頁維持極簡純粹的 Hero 時鐘視覺，避免長頁面滾動破壞專注度。
- 點擊 **`Projects` / `About` / `Connect`** 按鈕，自右側平滑滑出 520px 的毛玻璃抽屜面板。
- 支援標籤頁切換、點擊背景遮罩關閉、以及 <kbd>ESC</kbd> 快捷鍵退場。

### 5. 零依賴 Web Audio API 聲學合成
- **無外部音檔**：不需載入 `.mp3` 或 `.wav`，避免網路延遲與路徑遺失。
- **原生振盪器合成**：透過瀏覽器 `AudioContext` 動態產生 $1400\text{ Hz}\rightarrow 300\text{ Hz}$ 正弦波，搭配 $25\text{ ms}$ 極短衰減包絡線，合成清脆乾淨的機械時鐘滴答聲。
- **預設靜音原則**：遵守現代瀏覽器自動播放政策與使用者體驗，右上角提供 🔊 / 🔇 記憶開關。

### 6. 三套視覺主題與單一狀態樹（Single State Tree）
- **三套主題風格一鍵切換**：
  - `Aurora`：預設 AIoT 科技極光暗黑風格（漸層微光與藍紫基調）
  - `Minimal`：Swiss / Apple 瑞士極簡黑白高對比風格
  - `Sunset`：溫潤暮光暖灰與紫紅色調
- **專注模式（Zen Mode）**：按下 <kbd>Z</kbd> 鍵隱藏所有按鈕與側欄，秒變乾淨的桌面氛圍時鐘。
- **集中狀態管理**：所有偏好整合為單一 JSON 物件持久化於 `localStorage`（Key: `aiot_user_state`）：
  ```json
  {
    "name": "Huan Chen",
    "tagline": "AIoT Pioneer • Instructor",
    "theme": "aurora",
    "format24h": true,
    "soundEnabled": false,
    "zenMode": false
  }
  ```

---

## ⌨️ 4. 鍵盤快捷鍵

| 快捷鍵 | 功能說明 |
| :---: | :--- |
| <kbd>Z</kbd> | 切換 Zen 專注模式（全螢幕桌面時鐘） |
| <kbd>T</kbd> | 切換 12 小時制 / 24 小時制 |
| <kbd>C</kbd> | 複製當前精確時間戳至剪貼簿（附 Toast 提示） |
| <kbd>ESC</kbd> | 關閉側邊抽屜面板 / 退出 Zen 模式 |

---

## 🚀 5. 本機執行與 GitHub Pages 部署指南

### 本機預覽
本專案為純靜態網頁，無需安裝 `node_modules`。使用任何靜態伺服器即可啟動：

```powershell
# 使用 Python 內建 HTTP Server
python -m http.server 5173
```
開啟瀏覽器前往：`http://localhost:5173`

---

### GitHub Pages 2 步驟全域部署

本專案已關聯至 GitHub 遠端儲存庫：

1. **推送程式碼**：
   ```powershell
   git push -u origin main
   ```
2. **開啟 GitHub Pages**：
   - 進入 GitHub 儲存庫頁面 $\rightarrow$ 點選 **Settings**。
   - 側邊選單進入 **Pages**。
   - 在 **Build and deployment** 下方的 **Branch** 選擇 `main` 分支與 `/ (root)` 目錄，按下 **Save**。
3. **完成發布**：
   約 1 分鐘後，即可在以下網址存取線上版本：
   $$\text{https://huanchen1107.github.io/0916-2/}$$

---

## 🎯 6. 學生檢核清單（DIC-1 Checklist）

學生完成本課堂實作後應能理解並驗證以下核心概念：

- [ ] **現代架構思維**：能說明為什麼在 L2 不需要急著使用 React 或 Vite？
- [ ] **非同步資料流**：能否在 `projects.json` 中新增一筆專案，並觀察網頁如何在不更動 HTML 的情況下自動渲染出新卡片？
- [ ] **DOM 與事件循環**：能否解釋 `requestAnimationFrame` 與 `setInterval` 在高精度時鐘實作上的差異？
- [ ] **CSS 設計代碼**：能否透過修改 CSS 自訂屬性（`--bg-base`、`--accent-cyan`）客製化出一套屬於自己的全新主題？
- [ ] **端到端部署**：是否成功透過 GitHub Pages 將自己的作品發布至公開網際網路？
