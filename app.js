/* 沓沓日花｜市集花材價目
 * 要改品項、價格、顏色、花語：只改下面 FLOWERS 這一段。
 * price 是「單支」零售價（新台幣、整數）。unit 可改計價單位（例如桔梗用 "花朵"），沒寫就是「支」。
 */
"use strict";

/* 依 11/26、11/27 進貨（成本表「支出明細」，市集-中央公園）定價：大致為單支進價 × 3，取 60／80／100／120／150／180 這幾個價位。
 * img: null 代表還沒有實拍照，頁面會顯示「實拍照準備中」的色塊。
 * 補照片：把照片放進 images/ 資料夾，再把 null 改成 "images/檔名.jpg"。 */
const W = "#F7F5EE";
const FLOWERS = [
  /* 現場彈性價：沒有列在網頁上的花，或依花況調整，現場選 40／60／80 */
  { id: "onsite", name: "現場花材", en: "Market Pick", cat: "配花", meaning: "", note: "依現場花況選價格",
    colors: [{ id: "p40", label: "40 元", swatch: "#E8E2D2", price: 40, img: null },
             { id: "p60", label: "60 元", swatch: "#D9CFB4", price: 60, img: null },
             { id: "p80", label: "80 元", swatch: "#C7B98F", price: 80, img: null }] },
  // 主花
  { id: "carnation", name: "大康乃馨", en: "Carnation", cat: "主花", meaning: "純真而深刻的愛",
    colors: [{ id: "std", label: "當日色", swatch: "#F3EED8", price: 80, img: "images/carnation.jpg" }] },          // 380/20支
  /* 桔梗依花朵計價：每朵 40 元 */
  { id: "lisianthus", name: "桔梗", en: "Lisianthus", cat: "主花", meaning: "優美、希望", unit: "花朵",
    colors: [
      { id: "white", label: "白", swatch: W, price: 40, img: "images/lisianthus-white.jpg" },          // 200/10支（11/26）、600/20支（11/27）
      { id: "pink", label: "粉", swatch: "#F2BFAE", price: 40, img: "images/lisianthus-mini.jpg" },          // 280/10支（11/26）、700/20支（11/27）
      { id: "purple", label: "紫", swatch: "#9C84D0", price: 40, img: "images/lisianthus-purple.jpg" },          // 360/20支（11/27）
      { id: "lilac", label: "淺紫", swatch: "#B9A2DE", price: 40, img: "images/lisianthus-purple.jpg" }] },          // 200/10支（11/26）
  { id: "calla", name: "海芋", en: "Calla Lily", cat: "主花", meaning: "華麗之美、清純",
    colors: [{ id: "white", label: "白", swatch: "#F4F2E8", price: 100, img: null }] },          // 300/10支
  { id: "mum", name: "牡丹菊", en: "Chrysanthemum", cat: "主花", meaning: "高潔",
    colors: [{ id: "orange", label: "橘", swatch: "#E98A3A", price: 180, img: null }] },          // 300/5支
  { id: "pingpong", name: "白乒乓菊", en: "Ping Pong Mum", cat: "主花", meaning: "高潔、長壽、吉祥",
    colors: [{ id: "white", label: "白", swatch: "#F4F1E4", price: 80, img: "images/pingpong-white.jpg" }] },          // 150/10支
  { id: "gerbera", name: "小太陽", en: "Gerbera", cat: "主花", meaning: "希望、永遠向前、崇高之美",
    colors: [
      { id: "white", label: "白", swatch: W, price: 60, img: "images/gerbera-white.jpg" },          // 80/10支（11/26）、100/10支（11/27）
      { id: "pink", label: "粉", swatch: "#F2B4C2", price: 60, img: "images/gerbera-pink.jpg" }] },          // 迷你太陽 100/10支
  { id: "eryngium", name: "海膽紫薊", en: "Eryngium", cat: "主花", meaning: "讚賞",
    colors: [{ id: "blue", label: "藍紫", swatch: "#6F7FB0", price: 180, img: "images/eryngium.jpg" }] },          // 200/5支
  // 配花・葉材
  { id: "dianthus-green", name: "綠石竹", en: "Green Dianthus", cat: "配花", meaning: "愛、熱情、欣賞",
    colors: [{ id: "green", label: "綠", swatch: "#9BC25A", price: 80, img: "images/dianthus-green.jpg" }] },          // 100/5支（11/26）、120/5支（11/27）
  { id: "oncidium", name: "文心蘭", en: "Oncidium", cat: "配花", meaning: "愛與才能",
    colors: [{ id: "yellow", label: "黃", swatch: "#EBD31A", price: 80, img: "images/oncidium.jpg" }] },          // 180/10支
  { id: "limonium", name: "卡斯比亞", en: "Caspia", cat: "配花", meaning: "不變的心、不變的誓言、永不褪色的記憶",
    colors: [{ id: "purple", label: "紫", swatch: "#A396D6", price: 80, img: "images/limonium.jpg" }] },          // 170/10支
  { id: "gypsophila", name: "滿天星", en: "Baby's Breath", cat: "配花", meaning: "純潔、長久的愛",
    colors: [{ id: "white", label: "白", swatch: W, price: 80, img: "images/gypsophila.jpg" }] },          // 小滿天星 230/10支（11/26）、滿天星 500/20支（11/27）
  { id: "statice", name: "星辰花", en: "Statice", cat: "配花", meaning: "不變的心、永不褪色的記憶",
    colors: [{ id: "pink", label: "粉", swatch: "#E7A8C4", price: 100, img: null },
             { id: "white", label: "白", swatch: W, price: 100, img: null }] },          // 200/5支
  { id: "bletilla", name: "白芨", en: "Bletilla", cat: "配花", meaning: "",
    colors: [{ id: "white", label: "白", swatch: "#F1EEF2", price: 100, img: "images/bletilla-white.jpg" }] },          // 200/5支
  { id: "aster", name: "孔雀紫苑", en: "Aster", cat: "配花", meaning: "優雅、精緻、新的開始",
    colors: [{ id: "std", label: "紫", swatch: "#B07CC9", price: 60, img: "images/aster.jpg" }] },          // 紫孔雀 100/20支
  { id: "moluccella", name: "綠鈴草", en: "Bells of Ireland", cat: "配花", meaning: "好運、繁榮",
    colors: [{ id: "green", label: "綠", swatch: "#B5D27A", price: 60, img: "images/moluccella.jpg" }] },          // 120/20支
  { id: "waxflower", name: "臘梅", en: "Waxflower", cat: "配花", meaning: "永恆的愛、幸福的婚姻",
    colors: [{ id: "white", label: "白", swatch: "#F3E9EA", price: 80, img: "images/waxflower.jpg" }] },          // 250/5支
  { id: "pittosporum", name: "小海桐", en: "Pittosporum", cat: "配花", meaning: "記住我、不要忘記我",
    colors: [{ id: "green", label: "綠", swatch: "#7E9A4E", price: 150, img: "images/pittosporum.jpg" }] },          // 230/5支
  { id: "cedar", name: "雪松", en: "Cedar", cat: "配花", meaning: "",
    colors: [{ id: "green", label: "綠", swatch: "#8FA58A", price: 180, img: "images/cedar.jpg" }] }          // 180/3支
];

/* 不是現場實拍的照片：頁面會在照片上標「示意圖」。
 * 有 url 的是 Wikimedia Commons 開放授權照片，頁尾會列出作者與授權；{} 是攤主提供的參考照。
 * 換成實拍照時，把這裡那一行刪掉即可。 */
const REF = {
  "images/lisianthus-purple.jpg": {},
  "images/dianthus-green.jpg": {},
  "images/pittosporum.jpg": {},
  "images/moluccella.jpg":  { by: "Agnieszka Kwiecień, Nova", lic: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Moluccella_laevis_Molukia_g%C5%82adka_2020-09-20_01.jpg" },
  "images/cedar.jpg": {},
};

/* 市集結束後關閉：設定時間（台灣時間）後頁面只顯示「已結束」。null 代表不關閉。
 * 例：const CLOSE_AT = Date.parse("2026-12-20T19:00:00+08:00"); */
const CLOSE_AT = null;

const CATS = ["全部", "主花", "玫瑰", "配花"];
const MAX_QTY = 99;
const STORE_KEY = "tata-market-cart-v1";

/* ---------- 資料凍結：頁面執行時無法被竄改 ---------- */
/* 依價格由低到高排列（同價格維持上面的順序），編號也跟著這個順序 */
const minPrice = f => Math.min(...f.colors.map(c => c.price));
FLOWERS.sort((a, b) => minPrice(a) - minPrice(b));
FLOWERS.forEach(f => { f.colors.forEach(Object.freeze); Object.freeze(f.colors); Object.freeze(f); });
Object.freeze(FLOWERS);
Object.values(REF).forEach(Object.freeze); Object.freeze(REF);

const byKey = new Map();
FLOWERS.forEach(f => f.colors.forEach(c => byKey.set(f.id + ":" + c.id, { f, c })));

/* ---------- 狀態 ---------- */
const cart = new Map();            // "flowerId:colorId" -> qty
const picked = new Map();          // flowerId -> 目前選的 colorId
let filter = "全部";

const fmt = n => "NT$ " + n.toLocaleString("zh-TW");
const clampQty = n => (Number.isInteger(n) && n > 0 ? Math.min(n, MAX_QTY) : 0);

function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw || raw.length > 4000) return;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) return;
    for (const [k, v] of Object.entries(data)) {
      const q = clampQty(v);
      if (byKey.has(k) && q) cart.set(k, q);   // 只接受清單內的品項與合理數量
    }
  } catch (e) { /* 無痕模式或被封鎖時略過 */ }
}
function saveCart() {
  try { window.localStorage.setItem(STORE_KEY, JSON.stringify(Object.fromEntries(cart))); } catch (e) { /* 略過 */ }
}

/* ---------- 小工具：只用 textContent 建立元素，不使用 innerHTML ---------- */
function el(tag, props, ...kids) {
  const n = document.createElement(tag);
  if (props) for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "text") n.textContent = v;
    else if (k === "class") n.className = v;
    else if (k === "on") for (const [ev, fn] of Object.entries(v)) n.addEventListener(ev, fn);
    else n.setAttribute(k, v);
  }
  for (const c of kids) if (c != null) n.append(c);
  return n;
}


/* ---------- 分類 ---------- */
const CAT_EN = { "全部": "ALL", "主花": "FOCAL", "玫瑰": "ROSES", "配花": "FILLER" };
function renderFilters() {
  const box = document.getElementById("filters");
  const used = CATS.filter(c => c === "全部" || FLOWERS.some(f => f.cat === c));   // 沒有花材的分類不顯示
  if (!used.includes(filter)) filter = "全部";
  box.replaceChildren(...used.map(c => el("button", {
    type: "button", class: "pill", "aria-pressed": String(c === filter),
    on: { click: () => { filter = c; renderFilters(); renderGrid(); } }
  }, CAT_EN[c] + " ", el("span", { class: "zh", text: c }))));
}

/* ---------- 卡片 ---------- */
function photo(f, c) {
  if (c.img) return el("img", { src: c.img, alt: f.name + "（" + c.label + "）" + (REF[c.img] ? "示意圖" : "實拍"), loading: "lazy", decoding: "async", width: "675", height: "900" });
  const note = f.note || "實拍照準備中";
  const box = el("div", { class: "noimg", role: "img", "aria-label": f.name + "，" + note },
    el("span", { class: "noimg-n", text: f.name }), el("span", { class: "noimg-t", text: note }));
  box.style.background = c.swatch;   // CSSOM 設定，不需 inline style 權限
  return box;
}

const unitOf = f => f.unit || "支";

function card(f, i) {
  const u = unitOf(f);
  const cid = picked.get(f.id) || f.colors[0].id;
  const c = f.colors.find(x => x.id === cid);
  const key = f.id + ":" + c.id;
  const qty = cart.get(key) || 0;

  const tiles = el("div", { class: "tiles", role: "radiogroup", "aria-label": f.name + " 顏色" },
    ...f.colors.map(x => {
      const inCart = cart.get(f.id + ":" + x.id) || 0;
      const sw = el("span", { class: "sw", "aria-hidden": "true" });
      sw.style.background = x.swatch;
      const b = el("button", {
        type: "button", class: "tile", role: "radio", "aria-checked": String(x.id === c.id),
        "aria-label": x.label + (inCart ? "，已選 " + inCart + " " + u : ""),
        on: { click: () => { picked.set(f.id, x.id); renderGrid(); } }
      }, sw, el("span", { text: x.label }));
      if (inCart) b.append(el("span", { class: "badge", "aria-hidden": "true", text: String(inCart) }));
      return b;
    }));

  const qtyBox = el("div", { class: "qty" },
    el("button", { type: "button", "aria-label": "減少一" + u + " " + f.name + c.label, disabled: qty ? null : "", on: { click: () => setQty(key, qty - 1) } }, "−"),
    el("output", { class: "num", "aria-live": "polite", "aria-label": f.name + c.label + " 數量", text: String(qty) }),
    el("button", { type: "button", class: "plus", "aria-label": "增加一" + u + " " + f.name + c.label, disabled: qty >= MAX_QTY ? "" : null, on: { click: () => setQty(key, qty + 1) } }, "＋")
  );

  return el("li", { class: "card" + (qty ? " on" : "") },
    el("div", { class: "arch sm" }, photo(f, c), REF[c.img] ? el("span", { class: "refbadge", text: "示意圖" }) : null),
    el("div", { class: "info" },
      el("span", { class: "idx", text: String(i + 1).padStart(2, "0") + " / " + CAT_EN[f.cat] }),
      el("h3", { class: "en", text: f.en }),
      el("p", { class: "zh", text: f.name }),
      f.meaning ? el("p", { class: "mean" }, el("span", { class: "tag", text: "花語" }), f.meaning) : null,
      f.colors.length > 1 ? tiles : null,
      el("div", { class: "buy" },
        el("p", { class: "price" }, el("span", { class: "num", text: fmt(c.price) }), el("small", { text: " / " + u })),
        qtyBox)
    )
  );
}

function renderGrid() {
  const list = FLOWERS.filter(f => filter === "全部" || f.cat === filter);
  document.getElementById("grid").replaceChildren(...list.map(f => card(f, FLOWERS.indexOf(f))));
}

/* ---------- 數量與總價 ---------- */
function setQty(key, n) {
  if (!byKey.has(key)) return;
  const q = clampQty(n);
  const before = cart.get(key) || 0;
  if (q) cart.set(key, q); else cart.delete(key);
  saveCart();
  renderGrid();
  renderTotals(q > before);
  if (document.getElementById("list").open) renderLines();
}

function totals() {
  let count = 0, total = 0;
  for (const [k, q] of cart) { const it = byKey.get(k); if (!it) continue; count += q; total += it.c.price * q; }
  return { count, total };
}

function renderTotals(bump) {
  const { count, total } = totals();
  document.getElementById("pillCount").textContent = String(count);
  document.getElementById("sumTotal").textContent = fmt(total);
  const pill = document.getElementById("openList");
  pill.classList.toggle("has", count > 0);
  if (bump) { pill.classList.remove("bump"); void pill.offsetWidth; pill.classList.add("bump"); }
}

/* ---------- 清單抽屜 ---------- */
function renderLines() {
  const rows = [];
  for (const f of FLOWERS) for (const c of f.colors) {
    const key = f.id + ":" + c.id, q = cart.get(key);
    if (!q) continue;
    const thumb = el("div", { class: "thumb" }, photo(f, c));
    rows.push(el("li", { class: "ln" },
      thumb,
      el("div", null,
        el("div", { class: "t", text: f.name + "・" + c.label }),
        el("div", { class: "s", text: fmt(c.price) + " × " + q + (f.unit ? " " + f.unit : "") }),
        el("div", { class: "mini" },
          el("button", { type: "button", class: "chipbtn alt", "aria-label": "減少一" + unitOf(f) + " " + f.name, on: { click: () => setQty(key, q - 1) } }, "−"),
          el("button", { type: "button", class: "chipbtn", "aria-label": "增加一" + unitOf(f) + " " + f.name, on: { click: () => setQty(key, q + 1) } }, "＋"))),
      el("b", { class: "num lt", text: fmt(c.price * q) })
    ));
  }
  document.getElementById("lines").replaceChildren(...rows);
  const { count, total } = totals();
  document.getElementById("emptyNote").hidden = count > 0;
  document.getElementById("listCount").textContent = "共 " + count + " 件";
  document.getElementById("listTotal").textContent = fmt(total);
  document.getElementById("clearAll").disabled = !count;
}

/* ---------- 首屏拱門輪播（實拍照） ---------- */
function heroArch() {
  const box = document.getElementById("heroArch");
  const shots = [];
  FLOWERS.forEach(f => f.colors.forEach(c => { if (c.img && !REF[c.img]) shots.push({ src: c.img, alt: f.name }); }));
  const imgs = shots.map((s, i) => el("img", { src: s.src, alt: i === 0 ? "今日花材：" + s.alt : "", class: i === 0 ? "on" : null, loading: i < 2 ? "eager" : "lazy" }));
  box.replaceChildren(...imgs);
  if (imgs.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let n = 0, timer = 0, seen = true;
  const step = () => { imgs[n].classList.remove("on"); n = (n + 1) % imgs.length; imgs[n].classList.add("on"); };
  // 省電：拱門不在畫面上、或手機切到別的 App / 關螢幕時，輪播就停下來
  const sync = () => {
    const run = seen && !document.hidden;
    if (run && !timer) timer = setInterval(step, 3200);
    if (!run && timer) { clearInterval(timer); timer = 0; }
  };
  new IntersectionObserver(([e]) => { seen = e.isIntersecting; sync(); }).observe(box);
  document.addEventListener("visibilitychange", sync);
  sync();
}

/* 省電：首屏大字、跑馬燈離開畫面就暫停動畫 */
function pauseOffscreen() {
  const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("off", !e.isIntersecting)));
  document.querySelectorAll(".hero, .ticker").forEach(n => io.observe(n));
}

function renderCredits() {
  const box = document.getElementById("credits");
  if (!box) return;
  const items = [];
  for (const f of FLOWERS) for (const c of f.colors) {
    const r = REF[c.img];
    if (r && r.url) items.push(el("li", {}, f.name + "：", el("a", { href: r.url, rel: "noopener noreferrer", text: r.by }), "／" + r.lic));
  }
  box.hidden = !items.length;
  box.querySelector("ul").replaceChildren(...items);
}

function showClosed() {
  document.querySelectorAll("body > *").forEach(n => { n.hidden = true; });
  const box = el("main", { class: "closed" },
    el("b", { text: "沓沓日花 Chichi's flower" }),
    el("h1", { text: "本次市集已結束" }),
    el("p", { text: "謝謝你來市集找我們挑花。" }),
    el("p", { text: "下次市集見，也歡迎到 IG @chichis_flower 看看。" }));
  document.body.append(box);
  try { localStorage.removeItem(STORE_KEY); } catch (e) { /* 無痕模式等情況忽略 */ }
}

function isClosed() { return CLOSE_AT !== null && Date.now() >= CLOSE_AT; }

function init() {
  if (isClosed()) return showClosed();
  // 頁面一直開著跨過關閉時間：切回來時再檢查一次（結帳中不會突然消失）
  document.addEventListener("visibilitychange", () => { if (!document.hidden && isClosed()) location.reload(); });
  renderCredits();
  loadCart();
  heroArch();
  pauseOffscreen();
  renderFilters();
  renderGrid();
  renderTotals(false);
  const dlg = document.getElementById("list");
  document.getElementById("openList").addEventListener("click", () => { renderLines(); dlg.showModal(); });
  document.getElementById("closeList").addEventListener("click", () => dlg.close());
  document.getElementById("doneList").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  document.getElementById("clearAll").addEventListener("click", () => {
    cart.clear(); saveCart(); renderGrid(); renderTotals(false); renderLines();
    dlg.close();
  });
}

document.addEventListener("DOMContentLoaded", init);
