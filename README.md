# 沓沓日花｜水交社花材價目

《2026 珈琲與花物語・南迴篇》台南水交社文化園區（11/20–11/22，12:00–18:00）單支花材零售價目頁。
客人可以看照片、顏色、花語，按「＋」選支數，下方即時算出總價，挑好後把清單畫面給攤主結帳。

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 頁面骨架與安全設定 |
| `app.js` | **花材資料（品項、顏色、價格、花語、照片）**與選購邏輯 |
| `styles.css` | 外觀（沿用線上訂花頁的風格） |
| `fonts.css`、`fonts/` | 字型（放在本站，不連 Google） |
| `images/` | 花材實拍照（已裁切並去除定位等中繼資料） |

## 常改的地方

打開 `app.js`，最上面的 `FLOWERS` 就是全部品項：

```js
{ id: "bluerose", name: "藍玫瑰", en: "Blue Rose", cat: "玫瑰", meaning: "奇蹟、夢想成真",
  colors: [{ id: "blue", label: "藍", swatch: "#7FA6D6", price: 250, img: "images/rose-blue.jpg" }] },  // 800/10支
```

- 改價格：改 `price`（單支、新台幣整數）。目前價位：60（鹿角草、麒麟草、茴香、雪柳）、80（單支進價 15–20）、100（30–40，含珍珠／蒙馬特玫瑰）、180（白鬱金香）、250（80–90），每行後面的註解是進價。
- 加顏色：在 `colors` 裡多加一筆，可以有不同價格與照片。
- 補照片：照片放進 `images/`，把 `img: null` 改成 `img: "images/檔名.jpg"`。
- 示意圖：不是現場實拍的照片列在 `app.js` 的 `REF`，頁面會在照片上標「示意圖」。有 `url` 的是 Wikimedia Commons 開放授權照片，頁尾會列出作者和授權；`{}` 是攤主提供的參考照。換成實拍照後，把 `REF` 裡那一行刪掉。
- 分類：`cat` 只能是 `主花`、`玫瑰`、`配花`（對應 `CATS`）。

## 安全設計

這是純靜態網站，沒有後端、沒有表單、不收任何個人資料。

- **Content-Security-Policy**：只允許載入本站自己的 JS／CSS／圖片／字型，禁止任何外部連線、內嵌腳本、表單送出與 `<base>` 改寫。
- **不連第三方**：字型放在本站，沒有 Google Fonts、CDN、追蹤碼或分析工具，訪客的瀏覽紀錄不會外流。
- **不用 `innerHTML`**：所有畫面都用 `textContent` 建立，沒有 XSS 注入點。
- **資料凍結**：品項與價格在載入時 `Object.freeze`，執行中無法被改。
- **購物清單只存在訪客手機**（localStorage），讀回時只接受清單內的品項與 1–99 的整數支數，其餘丟棄。
- **`Referrer-Policy: no-referrer`**，照片已移除 EXIF／GPS。
- 總價只是試算，實際收款以攤主核對為準。

GitHub Pages 無法自訂 HTTP 標頭，所以 CSP 以 `<meta>` 設定；`frame-ancestors`（防止被嵌入）這類只能用標頭的設定在 GitHub Pages 上無法啟用。

## 上線（GitHub Pages）

Repo → Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main`、資料夾 `/ (root)`，存檔後約 1 分鐘會出現網址。
