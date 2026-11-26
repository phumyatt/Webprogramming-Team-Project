document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // ICONS
  // =====================================

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  refreshIcons();


  // =====================================
  // NAVIGATION - MEMBER 1
  // =====================================

  const pages = ["home", "menu", "cart", "order", "account", "contact"];

  const navLinks = document.querySelectorAll(".navbar a");

  function showPage() {

    let page = window.location.hash.slice(1) || "home";

    if (!pages.includes(page)) {
      page = "home";
    }

    pages.forEach(id => {

      const section = document.getElementById(id);

      if (section) {
        section.hidden = id !== page;
      }

    });

    navLinks.forEach(link => {

      const active =
        link.getAttribute("href") === "#" + page;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }

    });

    if (page === "cart") {
      renderCart();
    }

    if (page === "order") {
      renderCheckout();
    }

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

  }

  window.addEventListener("hashchange", showPage);


  // =====================================
  // NOTIFICATION MESSAGE
  // =====================================

  const toast = document.getElementById("toast");

  let toastTimer;

  function showToast(message) {

    clearTimeout(toastTimer);

    toast.textContent = message;
    toast.hidden = false;

    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 3000);

  }


  // ACCOUNT AND NOTIFICATIONS
  // Reserved for later integration.

  document.querySelectorAll(
    '.navbar a[href="#notifications"]'
  ).forEach(link => {

    link.addEventListener("click", event => {

      event.preventDefault();

      showToast("This feature is coming soon.");

    });

  });


  // =====================================
  // MENU DETAILS - MEMBER 2
  // =====================================

  const detailButtons =
    document.querySelectorAll(".menu .details-btn");

  detailButtons.forEach((button, index) => {

    const description = button.nextElementSibling;

    description.id = "food-description-" + index;

    button.setAttribute(
      "aria-controls",
      description.id
    );

    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {

      description.hidden = !description.hidden;

      button.textContent = description.hidden
        ? "View Details"
        : "Hide Details";

      button.setAttribute(
        "aria-expanded",
        String(!description.hidden)
      );

    });

  });


  // =====================================
  // MENU SEARCH AND FILTER - MEMBER 2
  // =====================================

  const searchInput =
    document.getElementById("food-search");

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const menuCards =
    document.querySelectorAll(".menu-card");

  let selectedCategory = "all";

  function filterMenu() {

    const search =
      searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    menuCards.forEach(card => {

      const name = card.dataset.name.toLowerCase();

      const category = card.dataset.category;

      const matchesSearch = name.includes(search);

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const visible =
        matchesSearch && matchesCategory;

      card.hidden = !visible;

      if (visible) {
        visibleCount++;
      }

    });

    document.getElementById("no-results").hidden =
      visibleCount !== 0;

  }

  searchInput.addEventListener("input", filterMenu);

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      selectedCategory = button.dataset.category;

      filterButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      filterMenu();

    });

  });


  // =====================================
  // CART - MEMBER 3
  // =====================================

  let cart = [];

  function isValidCartItem(item) {

    return item &&
      typeof item.id === "string" &&
      typeof item.name === "string" &&
      typeof item.image === "string" &&
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0;

  }

  try {

    const savedCart =
      JSON.parse(localStorage.getItem("teamTwoCart"));

    if (Array.isArray(savedCart)) {

      cart = savedCart.filter(isValidCartItem);

    }

  } catch (error) {

    cart = [];

  }


  // DELIVERY SETTINGS

  const deliveryCharge = 3000;

  const freeDeliveryMinimum = 30000;


  function formatPrice(price) {

    return "₩" + price.toLocaleString("ko-KR");

  }


  function getSubtotal() {

    return cart.reduce((total, item) => {

      return total + item.price * item.quantity;

    }, 0);

  }


  function getDeliveryFee() {

    const subtotal = getSubtotal();

    if (cart.length === 0) {
      return 0;
    }

    if (subtotal >= freeDeliveryMinimum) {
      return 0;
    }

    return deliveryCharge;

  }


  function getTotal() {

    return getSubtotal() + getDeliveryFee();

  }


  function getDeliveryText() {

    if (cart.length === 0) {
      return "₩0";
    }

    if (getDeliveryFee() === 0) {
      return "FREE";
    }

    return formatPrice(getDeliveryFee());

  }


  function getDeliveryMessage() {

    const subtotal = getSubtotal();

    if (cart.length === 0) {

      return "Free delivery on orders of ₩30,000 or more.";

    }

    if (subtotal >= freeDeliveryMinimum) {

      return "Great! You qualify for free delivery.";

    }

    const remaining = freeDeliveryMinimum - subtotal;

    return "Add " + formatPrice(remaining) +
      " more to enjoy free delivery!";

  }


  function updateDeliveryInformation() {

    const message = getDeliveryMessage();

    document.getElementById(
      "cart-delivery-message"
    ).textContent = message;

    document.getElementById(
      "checkout-delivery-message"
    ).textContent = message;

    const progress = Math.min(
      (getSubtotal() / freeDeliveryMinimum) * 100,
      100
    );

    document.getElementById(
      "delivery-progress-bar"
    ).style.width = progress + "%";

  }


  function saveCart() {

    try {

      localStorage.setItem(
        "teamTwoCart",
        JSON.stringify(cart)
      );

    } catch (error) {

      console.warn("Cart storage is unavailable.");

    }

    updateCartCount();

  }


  function updateCartCount() {

    const quantity = cart.reduce((total, item) => {

      return total + item.quantity;

    }, 0);

    document.getElementById("cart-count").textContent =
      quantity;

  }


  // ADD TO CART

  const addCartButtons =
    document.querySelectorAll(".add-cart-btn");

  addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

      const id = button.dataset.id;

      const existingItem = cart.find(item => {

        return item.id === id;

      });

      if (existingItem) {

        existingItem.quantity++;

      } else {

        cart.push({

          id: id,
          name: button.dataset.name,
          price: Number(button.dataset.price),
          image: button.dataset.image,
          quantity: 1

        });

      }

      saveCart();

      showToast(
        button.dataset.name + " added to your cart!"
      );

    });

  });


  // CHANGE QUANTITY

  function changeQuantity(id, amount) {

    const item = cart.find(food => food.id === id);

    if (!item) {
      return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {

      cart = cart.filter(food => food.id !== id);

    }

    saveCart();

    renderCart();

  }


  // REMOVE ITEM

  function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

    renderCart();

    showToast("Item removed from cart.");

  }


  // DISPLAY CART

  function renderCart() {

    const container =
      document.getElementById("cart-items");

    container.replaceChildren();

    if (cart.length === 0) {

      const message = document.createElement("p");

      message.className = "empty-message";

      message.textContent = "Your cart is empty.";

      container.appendChild(message);

    }

    cart.forEach(item => {

      const row = document.createElement("article");

      row.className = "cart-item";


      const image = document.createElement("img");

      image.src = item.image;

      image.alt = item.name;


      const info = document.createElement("div");

      info.className = "cart-item-info";


      const name = document.createElement("h3");

      name.textContent = item.name;


      const price = document.createElement("p");

      price.textContent =
        formatPrice(item.price * item.quantity);


      info.append(name, price);


      const controls = document.createElement("div");

      controls.className = "quantity-controls";


      const minus = document.createElement("button");

      minus.type = "button";

      minus.textContent = "−";

      minus.setAttribute(
        "aria-label",
        "Decrease quantity of " + item.name
      );

      minus.addEventListener("click", () => {

        changeQuantity(item.id, -1);

      });


      const quantity = document.createElement("span");

      quantity.textContent = item.quantity;


      const plus = document.createElement("button");

      plus.type = "button";

      plus.textContent = "+";

      plus.setAttribute(
        "aria-label",
        "Increase quantity of " + item.name
      );

      plus.addEventListener("click", () => {

        changeQuantity(item.id, 1);

      });


      controls.append(minus, quantity, plus);


      const remove = document.createElement("button");

      remove.type = "button";

      remove.className = "remove-btn";

      remove.setAttribute(
        "aria-label",
        "Remove " + item.name
      );

      remove.innerHTML =
        '<i data-lucide="trash-2"></i>';

      remove.addEventListener("click", () => {

        removeItem(item.id);

      });


      row.append(image, info, controls, remove);

      container.appendChild(row);

    });


    document.getElementById("cart-subtotal").textContent =
      formatPrice(getSubtotal());


    const deliveryElement =
      document.getElementById("delivery-fee");

    deliveryElement.textContent = getDeliveryText();

    deliveryElement.classList.toggle(
      "free-delivery",
      cart.length > 0 && getDeliveryFee() === 0
    );


    document.getElementById("cart-total").textContent =
      formatPrice(getTotal());


    document.getElementById("checkout-btn").disabled =
      cart.length === 0;


    updateDeliveryInformation();

    refreshIcons();

  }


  // =====================================
  // PREVIOUS ORDERS - MEMBER 3
  // =====================================

  let orderHistory = [];

  try {

    const savedOrders = JSON.parse(
      localStorage.getItem("teamTwoOrders")
    );

    if (Array.isArray(savedOrders)) {

      orderHistory = savedOrders.filter(order =>

        order &&
        typeof order.id === "string" &&
        typeof order.date === "string" &&
        Array.isArray(order.items) &&
        order.items.length > 0 &&
        order.items.every(isValidCartItem) &&
        Number.isFinite(order.total)

      );

    }

  } catch (error) {

    orderHistory = [];

  }


  function saveOrderHistory() {

    try {

      localStorage.setItem(
        "teamTwoOrders",
        JSON.stringify(orderHistory)
      );

    } catch (error) {

      console.warn("Order history storage is unavailable.");

      showToast(
        "Order history could not be saved permanently."
      );

    }

  }


  function createOrder() {

    const order = {

      id: "TT-" + Date.now(),

      date: new Date().toISOString(),

      items: cart.map(item => ({ ...item })),

      subtotal: getSubtotal(),

      delivery: getDeliveryFee(),

      total: getTotal(),

      status: "Confirmed",
      ownerEmail: getCurrentUser()?.email || null

    };

    orderHistory.unshift(order);

    saveOrderHistory();

    return order;

  }


  // DISPLAY PREVIOUS ORDERS

  function renderPreviousOrders() {

    const container =
      document.getElementById("previous-orders-list");

    container.replaceChildren();

    const visibleOrders = orderHistory.filter(order => (order.ownerEmail || null) === (getCurrentUser()?.email || null));
    if (visibleOrders.length === 0) {

      const message = document.createElement("p");

      message.className = "history-empty";

      message.textContent = "No previous orders yet.";

      container.appendChild(message);

      return;

    }


    visibleOrders.forEach(order => {

      const card = document.createElement("article");

      card.className = "history-card";


      const header = document.createElement("div");

      header.className = "history-card-header";


      const orderId = document.createElement("strong");

      orderId.textContent = "#" + order.id;


      const status = document.createElement("span");

      status.className = "history-status";

      status.textContent = "Confirmed";


      header.append(orderId, status);


      const date = document.createElement("p");

      date.className = "history-date";

      date.textContent = new Date(order.date)
        .toLocaleString("en-US", {

          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"

        });


      card.append(header, date);


      order.items.forEach(item => {

        const row = document.createElement("div");

        row.className = "history-food";


        const foodName = document.createElement("span");

        foodName.textContent =
          item.name + " × " + item.quantity;


        const foodPrice = document.createElement("span");

        foodPrice.textContent =
          formatPrice(item.price * item.quantity);


        row.append(foodName, foodPrice);

        card.appendChild(row);

      });


      const totalRow = document.createElement("div");

      totalRow.className = "history-total";


      const totalLabel = document.createElement("span");

      totalLabel.textContent = "Total";


      const totalPrice = document.createElement("span");

      totalPrice.textContent = formatPrice(order.total);


      totalRow.append(totalLabel, totalPrice);


      const reorderButton = document.createElement("button");

      reorderButton.type = "button";

      reorderButton.className = "reorder-btn";

      reorderButton.textContent = "Order Again";


      reorderButton.addEventListener("click", () => {

        reorder(order);

      });


      card.append(totalRow, reorderButton);

      container.appendChild(card);

    });

  }


  // ORDER AGAIN

  function reorder(order) {

    order.items.forEach(oldItem => {

      const currentFood = Array.from(addCartButtons)
        .find(button => button.dataset.id === oldItem.id);

      if (!currentFood) {
        return;
      }

      const existingItem = cart.find(
        item => item.id === oldItem.id
      );

      if (existingItem) {

        existingItem.quantity += oldItem.quantity;

      } else {

        cart.push({

          id: currentFood.dataset.id,

          name: currentFood.dataset.name,

          price: Number(currentFood.dataset.price),

          image: currentFood.dataset.image,

          quantity: oldItem.quantity

        });

      }

    });

    saveCart();

    showToast("Available previous order items added to cart.");

    window.location.hash = "cart";

  }


  // SHOW / HIDE PREVIOUS ORDERS

  const toggleHistory =
    document.getElementById("toggle-history");

  const historyList =
    document.getElementById("previous-orders-list");

  toggleHistory.addEventListener("click", () => {

    historyList.hidden = !historyList.hidden;

    toggleHistory.textContent =
      historyList.hidden ? "Show" : "Hide";

    toggleHistory.setAttribute(
      "aria-expanded",
      String(!historyList.hidden)
    );

  });


  // =====================================
  // CHECKOUT - MEMBER 3
  // =====================================

  const checkoutButton =
    document.getElementById("checkout-btn");

  const orderForm =
    document.getElementById("order-form");

  const successMessage =
    document.getElementById("order-success");

  const checkoutLayout =
    document.querySelector(".checkout-layout");

  const deliverySource =
    document.getElementById("delivery-source");

  const accountMessage =
    document.getElementById("account-message");


  // =====================================
  // ACCOUNT INTEGRATION
  // =====================================

  // Member 4 can later provide the logged-in user's
  // profile through the teamTwoCurrentUser storage key.
  //
  // Expected profile:
  // {
  //   name: "",
  //   phone: "",
  //   email: "",
  //   address: ""
  // }
  //
  // This is demo profile integration,
  // not a real authentication system.


  function getCurrentUser() {

    try {

      const email = sessionStorage.getItem("thaitaste_demo_session");
      const users = JSON.parse(localStorage.getItem("thaitaste_demo_users") || "[]");
      const user = email && users.find(item => item.email === email);
      if (user) return { name: user.name, email: user.email, phone: user.phone, address: user.address };

      return null;

    } catch (error) {

      return null;

    }

  }


  function clearDeliveryFields() {

    document.getElementById("customer-name").value = "";

    document.getElementById("customer-phone").value = "";

    document.getElementById("customer-email").value = "";

    document.getElementById("customer-address").value = "";

  }


  function updateDeliverySource() {

    accountMessage.hidden = true;

    if (deliverySource.value === "account") {

      const user = getCurrentUser();

      if (!user) {

        accountMessage.textContent =
          "No account information is available. " +
          "Please use Other to enter your delivery information.";

        accountMessage.hidden = false;

        deliverySource.value = "other";

        return;

      }


      document.getElementById("customer-name").value =
        user.name || "";

      document.getElementById("customer-phone").value =
        user.phone || "";

      document.getElementById("customer-email").value =
        user.email || "";

      document.getElementById("customer-address").value =
        user.address || "";


      accountMessage.textContent =
        "Your account information has been filled automatically. " +
        "Please review it before ordering.";

      accountMessage.hidden = false;

    } else {

      clearDeliveryFields();

    }

  }


  deliverySource.addEventListener(
    "change",
    updateDeliverySource
  );


  // PROCEED TO CHECKOUT

  checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

      showToast("Your cart is empty.");

      return;

    }

    window.location.hash = "order";

  });


  // DISPLAY CHECKOUT

  function renderCheckout() {

    const container =
      document.getElementById("checkout-items");

    container.replaceChildren();

    successMessage.hidden = true;

    checkoutLayout.hidden = false;


    renderPreviousOrders();

    updateDeliveryInformation();


    if (cart.length === 0) {

      const message = document.createElement("p");

      message.className = "history-empty";

      message.textContent = "No items in your current order.";

      container.appendChild(message);

    }


    cart.forEach(item => {

      const row = document.createElement("div");

      row.className = "checkout-item";


      const name = document.createElement("span");

      name.textContent =
        item.name + " × " + item.quantity;


      const price = document.createElement("span");

      price.textContent =
        formatPrice(item.price * item.quantity);


      row.append(name, price);

      container.appendChild(row);

    });


    // SUBTOTAL

    const subtotalRow = document.createElement("div");

    subtotalRow.className = "checkout-item";


    const subtotalLabel = document.createElement("span");

    subtotalLabel.textContent = "Subtotal";


    const subtotalPrice = document.createElement("span");

    subtotalPrice.textContent =
      formatPrice(getSubtotal());


    subtotalRow.append(subtotalLabel, subtotalPrice);

    container.appendChild(subtotalRow);


    // DELIVERY FEE

    const delivery = document.createElement("div");

    delivery.className = "checkout-item";


    const deliveryLabel = document.createElement("span");

    deliveryLabel.textContent = "Delivery";


    const deliveryPrice = document.createElement("span");

    deliveryPrice.textContent = getDeliveryText();

    deliveryPrice.classList.toggle(
      "free-delivery",
      cart.length > 0 && getDeliveryFee() === 0
    );


    delivery.append(deliveryLabel, deliveryPrice);

    container.appendChild(delivery);


    // TOTAL

    document.getElementById("checkout-total").textContent =
      formatPrice(getTotal());


    orderForm.querySelector(
      'button[type="submit"]'
    ).disabled = cart.length === 0;


    if (deliverySource.value === "account") {

      updateDeliverySource();

    }

    refreshIcons();

  }


  // =====================================
  // ORDER FORM VALIDATION
  // =====================================

  orderForm.addEventListener("submit", event => {

    event.preventDefault();


    if (cart.length === 0) {

      showToast("Your cart is empty.");

      return;

    }


    if (!orderForm.checkValidity()) {

      orderForm.reportValidity();

      return;

    }


    const name =
      document.getElementById("customer-name").value.trim();

    const phone =
      document.getElementById("customer-phone").value.trim();

    const email =
      document.getElementById("customer-email").value.trim();

    const address =
      document.getElementById("customer-address").value.trim();


    const phonePattern = /^\+?[\d\s()-]{7,20}$/;


    if (!name || !email || !address) {

      showToast(
        "Please complete your delivery information."
      );

      return;

    }


    if (!phonePattern.test(phone)) {

      showToast("Please enter a valid phone number.");

      return;

    }


    // SAVE ORDER BEFORE CLEARING CART
    // No personal delivery information is stored
    // in the order history.

    if (deliverySource.value === "account" && getCurrentUser()) {
      const users = JSON.parse(localStorage.getItem("thaitaste_demo_users") || "[]");
      const user = users.find(item => item.email === getCurrentUser().email);
      if (user) { user.phone = phone; user.address = address; localStorage.setItem("thaitaste_demo_users", JSON.stringify(users)); }
    }
    createOrder();


    // CLEAR CART

    cart = [];

    saveCart();


    // RESET DELIVERY FORM

    orderForm.reset();

    accountMessage.hidden = true;


    // SHOW SUCCESS MESSAGE

    checkoutLayout.hidden = true;

    successMessage.hidden = false;


    refreshIcons();

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  });


  // VIEW PREVIOUS ORDERS AFTER CHECKOUT

  document.getElementById(
    "view-previous-orders"
  ).addEventListener("click", () => {

    renderCheckout();

    historyList.hidden = false;

    toggleHistory.textContent = "Hide";

    toggleHistory.setAttribute(
      "aria-expanded",
      "true"
    );

    document.querySelector(
      ".previous-orders"
    ).scrollIntoView({

      behavior: "smooth",

      block: "start"

    });

  });


  // =====================================
  // CONTACT SECTION - MEMBER 4
  // =====================================



  // =====================================
  // DYNAMIC FOOTER - MEMBER 1
  // =====================================

  function updateDateTime() {

    const now = new Date();

    document.getElementById(
      "current-date-time"
    ).textContent = now.toLocaleString("en-US", {

      year: "numeric",

      month: "long",

      day: "numeric",

      hour: "2-digit",

      minute: "2-digit",

      second: "2-digit"

    });

  }

  updateDateTime();

  setInterval(updateDateTime, 1000);


  // =====================================
  // INITIALIZE WEBSITE
  // =====================================

  updateCartCount();

  showPage();

});

// Account and contact integration

document.addEventListener("DOMContentLoaded", () => {


  const authPanel = document.getElementById("authPanel");
  const dashboard = document.getElementById("dashboard");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  const loginMessage = document.getElementById("loginMessage");
  const registerMessage = document.getElementById("registerMessage");

  const usersKey = "thaitaste_demo_users";
  const sessionKey = "thaitaste_demo_session";

  function getUsers() {
    return JSON.parse(localStorage.getItem(usersKey) || "[]");
  }

  async function hashPassword(password) {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error("Secure password hashing is unavailable. Open the project using localhost.");
    }

    const data = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hash))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function showLogin() {
    loginForm.hidden = false;
    registerForm.hidden = true;

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    loginMessage.textContent = "";
    registerMessage.textContent = "";
  }

  function showRegister() {
    loginForm.hidden = true;
    registerForm.hidden = false;

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    loginMessage.textContent = "";
    registerMessage.textContent = "";
  }

  function showDashboard(user) {
    authPanel.hidden = true;
    dashboard.hidden = false;

    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;

    document.getElementById("profilePhone").value = user.phone || "";
    document.getElementById("profileAddress").value = user.address || "";
  }

  function showAuth() {
  authPanel.hidden = false;
  dashboard.hidden = true;

  loginForm.reset();
  registerForm.reset();

  loginMessage.textContent = "";
  registerMessage.textContent = "";



  showLogin();
}

  loginTab.addEventListener("click", showLogin);
  registerTab.addEventListener("click", showRegister);

  registerForm.addEventListener("submit", async event => {
    event.preventDefault();

    registerMessage.textContent = "";

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name) {
      registerMessage.textContent = "Please enter your name.";
      return;
    }

    if (password.length < 8) {
      registerMessage.textContent = "Password must contain at least 8 characters.";
      return;
    }

    if (password !== confirmPassword) {
      registerMessage.textContent = "Passwords do not match.";
      return;
    }

    const users = getUsers();

    if (users.some(user => user.email === email)) {
      registerMessage.textContent = "This email is already registered.";
      return;
    }

    try {
      const passwordHash = await hashPassword(password);

      const newUser = {
        name,
        email,
        passwordHash
      };

      users.push(newUser);

      localStorage.setItem(usersKey, JSON.stringify(users));
      sessionStorage.setItem(sessionKey, email);

      registerForm.reset();
      showDashboard(newUser);
    } catch (error) {
      registerMessage.textContent = error.message;
    }
  });

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    loginMessage.textContent = "";

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    try {
      const passwordHash = await hashPassword(password);
      const users = getUsers();

      const user = users.find(item =>
        item.email === email && item.passwordHash === passwordHash
      );

      if (!user) {
        loginMessage.textContent = "Incorrect email or password.";
        return;
      }

      sessionStorage.setItem(sessionKey, user.email);
      loginForm.reset();

      showDashboard(user);
    } catch (error) {
      loginMessage.textContent = error.message;
    }
  });

  document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem(sessionKey);
    showAuth();
    document.getElementById("dashboardMessage").textContent = "";
    document.getElementById("delivery-source").value = "other";
    document.getElementById("delivery-source").dispatchEvent(new Event("change"));
  });

  const currentEmail = sessionStorage.getItem(sessionKey);

  if (currentEmail) {
    const user = getUsers().find(item => item.email === currentEmail);

    if (user) {
      showDashboard(user);
    } else {
      sessionStorage.removeItem(sessionKey);
      showAuth();
    }
  } else {
    showAuth();
  }

  document.getElementById("profileForm").addEventListener("submit", event => {
    event.preventDefault();
    const users = getUsers();
    const user = users.find(item => item.email === sessionStorage.getItem(sessionKey));
    if (!user) return;
    user.phone = document.getElementById("profilePhone").value.trim();
    user.address = document.getElementById("profileAddress").value.trim();
    localStorage.setItem(usersKey, JSON.stringify(users));
    document.getElementById("dashboardMessage").textContent = "Delivery information saved.";
  });
  window.addEventListener("hashchange", () => {
    if (location.hash === "#account") {
      const user = getUsers().find(item => item.email === sessionStorage.getItem(sessionKey));
      if (user) showDashboard(user);
    }
  });
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const contactSuccess = document.getElementById("contactSuccess");

    contactSuccess.hidden = false;
    contactForm.reset();
  });
}
