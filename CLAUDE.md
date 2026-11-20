# 給 Claude 的工作說明（沓沓日花｜水交社花材價目）

攤主會用手機請你更新花材。照下面的規則做，做完直接推到 `main`，網站就會更新。

## 網站是什麼

- 純靜態網站，用 GitHub Pages 從 `main` 分支根目錄發布：https://zasaeve.github.io/tata-market/
- 沒有後端、沒有建置步驟。改完檔案、推到 `main`，大約 1–2 分鐘後正式網站就會更新。

| 檔案 | 用途 |
|---|---|
| `app.js` | 最上面的 `FLOWERS` 是全部花材資料。`REF` 是要標「示意圖」的照片。`CLOSE_AT` 是網站關閉時間 |
| `styles.css` | 外觀 |
| `fonts.css`、`fonts/` | 自架字型子集，只含網站用到的字 |
| `images/` | 花材照片 |
| `index.html` | 頁面骨架與安全設定（CSP） |
| `.github/workflows/close-site.yml` | 11/22 19:00 自動下架網站 |

## 花材資料格式（app.js 的 FLOWERS）

```js
{ id: "pearl", name: "珍珠玫瑰", en: "Pearl Rose", cat: "玫瑰", meaning: "溫柔、感激、欣賞",
  colors: [{ id: "std", label: "當日色", swatch: "#F6D3BE", price: 100, img: "images/rose-pearl.jpg" }] },  // 350/20支
```

- `id`：英文小寫，不能重複。
- `cat`：只能是 `主花`、`玫瑰`、`配花`。
- `price`：單支售價，新台幣整數。
- `colors`：通常只有一筆。只有一種顏色時，網頁不會顯示顏色按鈕。有多種顏色時（例如小太陽白／粉／黃），每種顏色一筆，各自有價格和照片。
- `swatch`：取照片上花的主要顏色。
- 行尾註解寫進價，例如 `// 350/20支`。不知道就寫 `// 進價待補`。
- 下架或售完：把整筆資料刪掉，`images/` 裡沒用到的照片也一起刪掉，`REF` 裡對應的那一行也要刪。

## 照片

- 裁成直式 3:4，高 900px，存成 JPEG（品質約 80），**一定要去除 EXIF／GPS 等中繼資料**。
- 先依 EXIF 轉正方向再裁切。可以用 Python Pillow：`ImageOps.exif_transpose()` 轉正，裁切後縮放，`save(..., quality=80)`，不要帶 `exif=`。
- 檔名用英文小寫，例如 `images/spray-rose-white.jpg`。
- 攤主自己拍的照片不加進 `REF`。網路或廠商照片要加進 `REF`，網頁會在照片上標「示意圖」：
  - 攤主提供的廠商照：`"images/xxx.jpg": {},`
  - Wikimedia Commons 開放授權照：`"images/xxx.jpg": { by: "作者", lic: "授權", url: "檔案頁網址" },`，頁尾會自動列出來源。
- 只有在攤主明確要求「去網路找照片」時，才用 Wikimedia Commons 上可商用的開放授權照片。不要用其他網站有版權的照片。

## 花語

- **一定要上網查**，不可以自己編。依中文、日文（花言葉）、英文花語資料，選常見而且正面的說法，翻成簡短中文，例如「純潔、長久的愛」。
- 查不到就寫 `meaning: ""`，網頁會自動不顯示花語。
- 回報時告訴攤主花語的根據。

## 字型（新的中文字一定要檢查）

網站字型只含用過的字。新加的中文字如果不在字型裡，會顯示成手機的系統字，看起來不一致。

1. 從 `fonts.css` 裡所有 `font-family:'Chiron GoRound TC'` 那幾行的 `unicode-range` 收集已有的字。
2. 把 `app.js` 字串和 `index.html` 裡缺的中文字找出來。
3. 向 Google Fonts 下載只含這些字的子集：
   `https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC:wght@400..900&display=swap&text=<缺的字，URL 編碼>`
   要帶一般瀏覽器的 User-Agent，回應的 CSS 裡才會是 woff2 網址。抓下那個 woff2，存成 `fonts/chiron-<下一個編號>.woff2`。
4. 在 `fonts.css` 最後加一行，格式照現有的寫：
   `@font-face{font-family:'Chiron GoRound TC';font-style:normal;font-weight:400 900;font-display:swap;src:url(fonts/chiron-N.woff2) format('woff2');unicode-range:U+xxxx, U+yyyy}`
5. 如果環境不能連外網，就跳過這一步，並告訴攤主「新字會先用系統字顯示」。

## 版本號（每次都要做）

改過 `app.js`、`styles.css`、`fonts.css` 任何一個，都要把 `index.html` 裡這三個檔名後面的 `?v=` 換成新的版本號，例如三個檔案內容 sha1 的前 8 碼。否則客人的手機會繼續用舊檔。

## 安全規則（不要破壞）

- 不用 `innerHTML`，畫面一律用 `el()` 和 `textContent` 建立。
- 不加任何外部資源（CDN、Google Fonts 連結、追蹤碼），不改 `index.html` 的 CSP。
- 不收集任何個人資料。

## 關閉時間

- `app.js` 的 `CLOSE_AT` 和 `.github/workflows/close-site.yml` 設定台灣時間 2026/11/22 19:00 關站。
- 攤主沒有要求就不要改。要延後或提早時，兩邊都要一起改，包括 workflow 的 cron 和時間判斷。

## 做完之前的檢查

1. `node --check app.js` 沒有錯誤。
2. commit 訊息用中文寫改了什麼，**直接推到 `main`**。攤主已同意這個網站的更新直接上線，不需要開 PR。
3. 等 1–2 分鐘，確認 `https://zasaeve.github.io/tata-market/app.js?t=<隨機數>` 已經有新內容。
4. 用簡短的中文回報：改了什麼、價格、花語根據、哪些照片標了「示意圖」、有沒有沒做到的事。
