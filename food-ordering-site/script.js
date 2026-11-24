/* =========================================================
   Online Food Ordering – script.js
   MENU SECTION: show/hide description, search + category filter,
   sorting, add-to-cart simulation with quantity, fees and checkout.
   Teammates: add your own features below initMenu() (footer clock,
   form validation…). Everything for the menu is inside initMenu().
   ========================================================= */

document.addEventListener("DOMContentLoaded", initMenu);

function initMenu() {
  const grid = document.getElementById("menu-grid");
  if (!grid) return; // menu section not on this page

  const cards = Array.from(grid.querySelectorAll(".menu-card"));
  const searchInput = document.getElementById("menu-search-input");
  const catButtons = document.querySelectorAll(".menu-cat");
  const sortSelect = document.getElementById("menu-sort");
  const countEl = document.getElementById("menu-count");
  const emptyEl = document.getElementById("menu-empty");

  const cartBar = document.getElementById("menu-cartbar");
  const cartBarCount = document.getElementById("cartbar-count");
  const cartBarTotal = document.getElementById("cartbar-total");
  const cartPanel = document.getElementById("cart");
  const overlay = document.getElementById("menu-overlay");
  const cartList = document.getElementById("cart-list");
  const cartEmpty = document.getElementById("cart-empty");
  const subtotalEl = document.getElementById("cart-subtotal");
  const deliveryEl = document.getElementById("cart-delivery");
  const totalEl = document.getElementById("cart-total");
  const noteEl = document.getElementById("cart-note");
  const checkoutBtn = document.getElementById("cart-checkout");
  const toastEl = document.getElementById("menu-toast");

  const DELIVERY_FEE = 3000;
  const FREE_DELIVERY_FROM = 25000;
  const MIN_ORDER = 10000;

  const state = { search: "", category: "all", sort: "recommended" };
  let cart = loadCart(); // { itemId: quantity }

  /* ---------- helpers ---------- */
  const won = (n) => "₩" + n.toLocaleString("ko-KR");

  function getItem(id) {
    const card = document.getElementById("item-" + id);
    if (!card) return null;
    const figure = card.querySelector(".menu-card__media");
    const img = card.querySelector("img");
    return {
      id,
      name: card.dataset.name,
      price: Number(card.dataset.price),
      img: figure.classList.contains("is-fallback") ? "" : img.currentSrc || img.src,
      icon: figure.dataset.icon,
    };
  }

  function loadCart() {
    try { return JSON.parse(localStorage.getItem("menuCart")) || {}; }
    catch (err) { return {}; }
  }
  function saveCart() {
    try { localStorage.setItem("menuCart", JSON.stringify(cart)); } catch (err) { /* storage blocked */ }
  }

  let toastTimer;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-show"), 1800);
  }

  /* ---------- 1. Images: use /images first, fall back to online copy ---------- */
  document.querySelectorAll("img[data-remote]").forEach((img) => {
    const figure = img.closest("figure");
    const handleError = () => {
      if (img.dataset.remote && img.src !== img.dataset.remote) {
        img.src = img.dataset.remote;            // try the online version
      } else {
        figure.classList.add("is-fallback");     // show emoji placeholder
      }
    };
    img.addEventListener("error", handleError);
    // error may already have happened before this script ran
    if (img.complete && img.naturalWidth === 0) handleError();
  });

  /* ---------- 2. Show / hide description on click ---------- */
  grid.addEventListener("click", (event) => {
    const toggle = event.target.closest(".js-toggle-desc");
    if (!toggle) return;
    event.preventDefault();
    const desc = document.getElementById(toggle.getAttribute("aria-controls"));
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    desc.hidden = isOpen;
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.textContent = isOpen ? "View details" : "Hide details";
  });

  /* ---------- 3. Search, filter and sort ---------- */
  function applyFilters() {
    const query = state.search.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      // search in name, cuisine, tagline, description and badges only (not button labels)
      const text = [".menu-card__name", ".menu-card__cuisine", ".menu-card__tagline", ".menu-card__desc", ".menu-card__meta"]
        .map((sel) => card.querySelector(sel).textContent)
        .join(" ")
        .toLowerCase();
      const matchesSearch = query === "" || text.includes(query);
      const matchesCategory =
        state.category === "all" ||
        (state.category === "drinks" ? card.dataset.drink === "true" : card.dataset.cuisine === state.category);

      const show = matchesSearch && matchesCategory;
      card.hidden = !show;
      if (show) visible++;
    });

    // sort: re-append cards in the new order (DOM manipulation)
    const sorted = [...cards].sort((a, b) => {
      const pa = Number(a.dataset.price), pb = Number(b.dataset.price);
      switch (state.sort) {
        case "price-asc": return pa - pb;
        case "price-desc": return pb - pa;
        case "rating": return Number(b.dataset.rating) - Number(a.dataset.rating);
        default: return Number(a.dataset.order) - Number(b.dataset.order);
      }
    });
    sorted.forEach((card) => grid.appendChild(card));

    countEl.textContent = visible;
    emptyEl.hidden = visible !== 0;
  }

  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    applyFilters();
  });

  catButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      catButtons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      state.category = btn.dataset.filter;
      applyFilters();
    });
  });

  sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    applyFilters();
  });

  /* ---------- 4. Add to cart ---------- */
  grid.addEventListener("click", (event) => {
    const addBtn = event.target.closest(".js-add");
    if (!addBtn) return;
    const id = addBtn.dataset.id;
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();

    const item = getItem(id);
    showToast(`Added ${item.name} to cart`);
    addBtn.classList.add("is-added");
    const label = addBtn.querySelector(".menu-add__label");
    const icon = addBtn.querySelector(".ms");
    label.textContent = "Added";
    icon.textContent = "check";
    setTimeout(() => {
      addBtn.classList.remove("is-added");
      label.textContent = "Add";
      icon.textContent = "add";
    }, 900);

    cartBar.classList.remove("bump");
    void cartBar.offsetWidth; // restart animation
    cartBar.classList.add("bump");
  });

  function changeQty(id, delta) {
    cart[id] = (cart[id] || 0) + delta;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
  }

  cartList.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-action]");
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === "plus") changeQty(id, +1);
    if (btn.dataset.action === "minus") changeQty(id, -1);
    if (btn.dataset.action === "remove") changeQty(id, -cart[id]);
  });

  function renderCart() {
    const ids = Object.keys(cart).filter((id) => getItem(id));
    let count = 0;
    let subtotal = 0;

    cartList.innerHTML = "";
    ids.forEach((id) => {
      const item = getItem(id);
      const qty = cart[id];
      count += qty;
      subtotal += item.price * qty;

      const li = document.createElement("li");
      li.className = "menu-cart__item";
      li.innerHTML = `
        ${item.img
          ? `<img class="menu-cart__thumb" src="${item.img}" alt="">`
          : `<span class="menu-cart__thumb ms" aria-hidden="true">${item.icon}</span>`}
        <div>
          <p class="menu-cart__name">${item.name}</p>
          <p class="menu-cart__price">${won(item.price * qty)}</p>
          <button type="button" class="menu-cart__remove" data-action="remove" data-id="${id}">Remove</button>
        </div>
        <div class="menu-qty" aria-label="Quantity">
          <button type="button" data-action="minus" data-id="${id}" aria-label="Decrease ${item.name}">−</button>
          <span>${qty}</span>
          <button type="button" data-action="plus" data-id="${id}" aria-label="Increase ${item.name}">+</button>
        </div>`;
      cartList.appendChild(li);
    });

    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
    subtotalEl.textContent = won(subtotal);
    deliveryEl.textContent = delivery === 0 && subtotal > 0 ? "Free" : won(delivery);
    totalEl.textContent = won(subtotal + delivery);

    // helpful notes like a real delivery app
    noteEl.classList.remove("is-warning");
    if (subtotal === 0) {
      noteEl.textContent = "";
    } else if (subtotal < MIN_ORDER) {
      noteEl.textContent = `Add ${won(MIN_ORDER - subtotal)} more to reach the minimum order.`;
      noteEl.classList.add("is-warning");
    } else if (subtotal < FREE_DELIVERY_FROM) {
      noteEl.textContent = `Add ${won(FREE_DELIVERY_FROM - subtotal)} more for free delivery`;
    } else {
      noteEl.textContent = "You've got free delivery!";
    }

    checkoutBtn.disabled = subtotal < MIN_ORDER;
    cartEmpty.hidden = count > 0;
    cartBar.hidden = count === 0;
    cartBarCount.textContent = count;
    cartBarTotal.textContent = won(subtotal);
  }

  /* ---------- 5. Open / close cart drawer ---------- */
  function openCart() {
    cartPanel.classList.add("is-open");
    cartPanel.setAttribute("aria-hidden", "false");
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("cart-close").focus();
  }
  function closeCart() {
    cartPanel.classList.remove("is-open");
    cartPanel.setAttribute("aria-hidden", "true");
    overlay.hidden = true;
    document.body.style.overflow = "";
    // bring back the normal list if the success message was showing
    const success = cartPanel.querySelector(".menu-success");
    if (success) success.remove();
    cartList.hidden = false;
    cartPanel.querySelector(".menu-cart__foot").hidden = false;
    renderCart();
  }

  cartBar.addEventListener("click", (event) => { event.preventDefault(); openCart(); });
  document.getElementById("cart-close").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && cartPanel.classList.contains("is-open")) closeCart();
  });

  /* ---------- 6. Place order (simulation) ---------- */
  checkoutBtn.addEventListener("click", () => {
    const total = totalEl.textContent;
    const orderNo = "A" + Math.floor(100000 + Math.random() * 900000);
    cart = {};
    saveCart();

    cartList.hidden = true;
    cartEmpty.hidden = true;
    cartPanel.querySelector(".menu-cart__foot").hidden = true;
    const success = document.createElement("div");
    success.className = "menu-success";
    success.innerHTML = `
      <div class="menu-success__icon ms" aria-hidden="true">delivery_dining</div>
      <h3>Order placed!</h3>
      <p>Order <strong>#${orderNo}</strong> · ${total}</p>
      <p>Estimated delivery: 25–40 min</p>`;
    cartPanel.querySelector(".menu-cart__head").after(success);
    cartBar.hidden = true;
  });

  /* ---------- start ---------- */
  applyFilters();
  renderCart();
}
