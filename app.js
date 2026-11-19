/* 沓沓日花｜水交社市集花材價目
 * 要改品項、價格、顏色、花語：只改下面 FLOWERS 這一段。
 * price 是「單支」零售價（新台幣、整數）。
 */
"use strict";

/* img: null 代表還沒有實拍照，頁面會顯示「實拍照準備中」的色塊。
 * 補照片：把照片放進 images/ 資料夾，再把 null 改成 "images/檔名.jpg"。 */
const FLOWERS = [
  {
    id: "eryngium", name: "海膽紫薊", en: "Eryngium", cat: "主花",
    meaning: "獨立、堅強，溫柔地守護",
    colors: [{ id: "blue", label: "藍紫", swatch: "#6F7FB0", price: 270, img: "images/eryngium.jpg" }]
  },
  {
    id: "tulip", name: "鬱金香", en: "Tulip", cat: "主花",
    meaning: "愛的告白、體貼",
    colors: [{ id: "yellow", label: "黃", swatch: "#F2CF3B", price: 140, img: "images/tulip.jpg" }]
  },
  {
    id: "montmartre", name: "蒙馬特玫瑰", en: "Montmartre Rose", cat: "玫瑰",
    meaning: "浪漫、優雅",
    colors: [{ id: "std", label: "原色", swatch: "#E8C3C9", price: 150, img: null }]
  },
  {
    id: "bubble", name: "泡泡玫瑰", en: "Bubble Rose", cat: "玫瑰",
    meaning: "甜蜜、可愛的愛",
    colors: [{ id: "std", label: "原色", swatch: "#F1D2D6", price: 180, img: null }]
  },
  {
    id: "bluerose", name: "藍玫瑰", en: "Blue Rose", cat: "玫瑰",
    meaning: "奇蹟、夢想成真",
    colors: [{ id: "blue", label: "藍", swatch: "#7FA6D6", price: 120, img: "images/rose-blue.jpg" }]
  },
  {
    id: "lisianthus", name: "白桔梗", en: "Lisianthus", cat: "主花",
    meaning: "純潔、真誠不變的愛",
    colors: [{ id: "white", label: "白", swatch: "#F7F5EE", price: 90, img: "images/lisianthus-white.jpg" }]
  },
  {
    id: "gerbera", name: "非洲菊", en: "Gerbera", cat: "主花",
    meaning: "有毅力、不畏艱難，帶來好心情",
    colors: [
      { id: "white", label: "白", swatch: "#F7F5EE", price: 50, img: "images/gerbera-white.jpg" },
      { id: "pink", label: "粉", swatch: "#F2B4C2", price: 50, img: "images/gerbera-pink.jpg" },
      { id: "yellow", label: "黃", swatch: "#F1D35A", price: 50, img: "images/gerbera-yellow.jpg" }
    ]
  },
  {
    id: "anthurium", name: "火鶴", en: "Anthurium", cat: "主花",
    meaning: "熱情、大展宏圖",
    colors: [{ id: "std", label: "當日色", swatch: "#DCE5C8", price: 50, img: "images/anthurium.jpg" }]
  },
  {
    id: "mum", name: "染色中菊", en: "Dyed Chrysanthemum", cat: "主花",
    meaning: "開朗、長久的祝福",
    colors: [{ id: "dyed", label: "染色", swatch: "#9B2D7F", price: 60, img: "images/mum-dyed.jpg" }]
  },
  {
    id: "pingpong", name: "白乒乓菊", en: "Ping Pong Mum", cat: "主花",
    meaning: "圓滿、純真",
    colors: [{ id: "white", label: "白", swatch: "#F4F1E4", price: 60, img: null }]
  },
  {
    id: "chamomile", name: "洋甘菊", en: "Chamomile", cat: "配花",
    meaning: "逆境中的力量、苦盡甘來",
    colors: [{ id: "white", label: "白", swatch: "#F7F5EE", price: 100, img: "images/chamomile.jpg" }]
  },
  {
    id: "waxflower", name: "白臘梅", en: "Waxflower", cat: "配花",
    meaning: "持久的愛與成功",
    colors: [{ id: "white", label: "白", swatch: "#F3E9EA", price: 100, img: "images/waxflower.jpg" }]
  },
  {
    id: "fennel", name: "茴香", en: "Fennel Flower", cat: "配花",
    meaning: "值得讚美、充滿力量",
    colors: [{ id: "yellow", label: "黃綠", swatch: "#C9C94A", price: 30, img: null }]
  },
  {
    id: "oncidium", name: "文心蘭", en: "Oncidium", cat: "配花",
    meaning: "快樂無憂、隱藏的愛",
    colors: [{ id: "yellow", label: "黃", swatch: "#EFCB2B", price: 50, img: "images/oncidium.jpg" }]
  }
];

const CATS = ["全部", "主花", "玫瑰", "配花"];
const MAX_QTY = 99;
const STORE_KEY = "tata-market-cart-v1";

/* ---------- 資料凍結：頁面執行時無法被竄改 ---------- */
FLOWERS.forEach(f => { f.colors.forEach(Object.freeze); Object.freeze(f.colors); Object.freeze(f); });
Object.freeze(FLOWERS);

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
  box.replaceChildren(...CATS.map(c => el("button", {
    type: "button", class: "pill", "aria-pressed": String(c === filter),
    on: { click: () => { filter = c; renderFilters(); renderGrid(); } }
  }, CAT_EN[c] + " ", el("span", { class: "zh", text: c }))));
}

/* ---------- 卡片 ---------- */
function photo(f, c) {
  if (c.img) return el("img", { src: c.img, alt: f.name + "（" + c.label + "）實拍", loading: "lazy", decoding: "async", width: "675", height: "900" });
  const box = el("div", { class: "noimg", role: "img", "aria-label": f.name + "，實拍照準備中" },
    el("span", { class: "noimg-n", text: f.name }), el("span", { class: "noimg-t", text: "實拍照準備中" }));
  box.style.background = c.swatch;   // CSSOM 設定，不需 inline style 權限
  return box;
}

function card(f, i) {
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
        "aria-label": x.label + (inCart ? "，已選 " + inCart + " 支" : ""),
        on: { click: () => { picked.set(f.id, x.id); renderGrid(); } }
      }, sw, el("span", { text: x.label }));
      if (inCart) b.append(el("span", { class: "badge", "aria-hidden": "true", text: String(inCart) }));
      return b;
    }));

  const qtyBox = el("div", { class: "qty" },
    el("button", { type: "button", "aria-label": "減少一支 " + f.name + c.label, disabled: qty ? null : "", on: { click: () => setQty(key, qty - 1) } }, "−"),
    el("output", { class: "num", "aria-live": "polite", "aria-label": f.name + c.label + " 支數", text: String(qty) }),
    el("button", { type: "button", class: "plus", "aria-label": "增加一支 " + f.name + c.label, disabled: qty >= MAX_QTY ? "" : null, on: { click: () => setQty(key, qty + 1) } }, "＋")
  );

  return el("li", { class: "card" + (qty ? " on" : "") },
    el("div", { class: "arch sm" }, photo(f, c)),
    el("div", { class: "info" },
      el("span", { class: "idx", text: String(i + 1).padStart(2, "0") + " / " + CAT_EN[f.cat] }),
      el("h3", { class: "en", text: f.en }),
      el("p", { class: "zh", text: f.name }),
      el("p", { class: "mean" }, el("span", { class: "tag", text: "花語" }), f.meaning),
      tiles,
      el("div", { class: "buy" },
        el("p", { class: "price" }, el("span", { class: "num", text: fmt(c.price) }), el("small", { text: " / 支" })),
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
        el("div", { class: "s", text: fmt(c.price) + " × " + q }),
        el("div", { class: "mini" },
          el("button", { type: "button", class: "chipbtn alt", "aria-label": "減少一支 " + f.name, on: { click: () => setQty(key, q - 1) } }, "−"),
          el("button", { type: "button", class: "chipbtn", "aria-label": "增加一支 " + f.name, on: { click: () => setQty(key, q + 1) } }, "＋"))),
      el("b", { class: "num lt", text: fmt(c.price * q) })
    ));
  }
  document.getElementById("lines").replaceChildren(...rows);
  const { count, total } = totals();
  document.getElementById("emptyNote").hidden = count > 0;
  document.getElementById("listCount").textContent = "共 " + count + " 支";
  document.getElementById("listTotal").textContent = fmt(total);
  document.getElementById("clearAll").disabled = !count;
}

/* ---------- 首屏拱門輪播（實拍照） ---------- */
function heroArch() {
  const box = document.getElementById("heroArch");
  const shots = [];
  FLOWERS.forEach(f => f.colors.forEach(c => { if (c.img) shots.push({ src: c.img, alt: f.name }); }));
  const imgs = shots.map((s, i) => el("img", { src: s.src, alt: i === 0 ? "今日花材：" + s.alt : "", class: i === 0 ? "on" : null, loading: i < 2 ? "eager" : "lazy" }));
  box.replaceChildren(...imgs);
  if (imgs.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let n = 0;
  setInterval(() => { imgs[n].classList.remove("on"); n = (n + 1) % imgs.length; imgs[n].classList.add("on"); }, 3200);
}

function init() {
  loadCart();
  heroArch();
  renderFilters();
  renderGrid();
  renderTotals(false);
  const dlg = document.getElementById("list");
  document.getElementById("openList").addEventListener("click", () => { renderLines(); dlg.showModal(); });
  document.getElementById("closeList").addEventListener("click", () => dlg.close());
  document.getElementById("doneList").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  document.getElementById("clearAll").addEventListener("click", () => {
    if (!window.confirm("確定要清空所有已選的花嗎？")) return;
    cart.clear(); saveCart(); renderGrid(); renderTotals(false); renderLines();
  });
}

document.addEventListener("DOMContentLoaded", init);
