
document.addEventListener("DOMContentLoaded", () => {

  // NAVIGATION
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(item => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

  // MENU DETAILS
  const detailButtons = document.querySelectorAll(".details-btn");

  detailButtons.forEach(button => {
    button.addEventListener("click", () => {

      const description = button.nextElementSibling;
      description.hidden = !description.hidden;

      if (description.hidden) {
        button.textContent = "View Details";
      } else {
        button.textContent = "Hide Details";
      }

    });
  });

});

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 1. CART DATA
    // =========================

    let cart = [];
    let selectedFood = null;

    const modal = document.getElementById("order-modal");
    const selectedFoodText = document.getElementById("selected-food");

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");


    // =========================
    // 2. OPEN ORDER POPUP
    // =========================

    // Event delegation lets this work with menu buttons
    // even if the menu is created or changed by a teammate.

    document.addEventListener("click", (event) => {

        const orderButton = event.target.closest(".order-choice-btn");

        if (!orderButton) return;

        const name = orderButton.dataset.name;
        const price = Number(orderButton.dataset.price);

        if (!name || !Number.isFinite(price) || price <= 0) {
            alert("This menu item is missing a valid name or price.");
            return;
        }

        selectedFood = {
            name: name,
            price: price
        };

        selectedFoodText.textContent =
            `${name} - ₩${price.toLocaleString("en-US")}`;

        modal.style.display = "flex";

    });


    // =========================
    // 3. CLOSE POPUP
    // =========================

    function closeModal() {
        modal.style.display = "none";
    }

    document.getElementById("close-modal-btn")
        .addEventListener("click", closeModal);

    document.getElementById("cancel-modal-btn")
        .addEventListener("click", closeModal);

    // Close when clicking outside the popup

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });


    // =========================
    // 4. ADD ITEM TO CART
    // =========================

    document.getElementById("add-to-cart-btn")
        .addEventListener("click", () => {

            if (!selectedFood) return;

            const existingItem = cart.find(
                item => item.name === selectedFood.name
            );

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: selectedFood.name,
                    price: selectedFood.price,
                    quantity: 1
                });
            }

            updateCart();

            alert(`${selectedFood.name} added to your cart!`);

            closeModal();

        });


    // =========================
    // 5. ORDER ITEM IMMEDIATELY
    // =========================

    document.getElementById("order-now-btn")
        .addEventListener("click", () => {

            if (!selectedFood) return;

            const confirmed = confirm(
                `Order ${selectedFood.name} for ₩${selectedFood.price.toLocaleString("en-US")}?`
            );

            if (confirmed) {
                alert(
                    `Thank you! Your order for ${selectedFood.name} has been placed.`
                );

                closeModal();
            }

        });


    // =========================
    // 6. UPDATE CART DISPLAY
    // =========================

    function updateCart() {

        cartItems.innerHTML = "";

        let total = 0;
        let totalQuantity = 0;

        if (cart.length === 0) {
            cartItems.innerHTML =
                '<p class="empty-cart">Your cart is currently empty.</p>';
        }

        cart.forEach((item, index) => {

            const subtotal = item.price * item.quantity;

            total += subtotal;
            totalQuantity += item.quantity;

            const itemContainer = document.createElement("div");
            itemContainer.className = "cart-item";

            const itemInfo = document.createElement("div");
            itemInfo.className = "cart-item-info";

            const itemName = document.createElement("h3");
            itemName.textContent = item.name;

            const itemPrice = document.createElement("p");
            itemPrice.textContent =
                `₩${item.price.toLocaleString("en-US")} each`;

            const itemSubtotal = document.createElement("p");
            itemSubtotal.textContent =
                `Subtotal: ₩${subtotal.toLocaleString("en-US")}`;

            itemInfo.appendChild(itemName);
            itemInfo.appendChild(itemPrice);
            itemInfo.appendChild(itemSubtotal);


            // QUANTITY BUTTONS

            const quantityControls = document.createElement("div");
            quantityControls.className = "quantity-controls";

            const decreaseButton = document.createElement("button");
            decreaseButton.textContent = "-";
            decreaseButton.setAttribute("aria-label", "Decrease quantity");

            decreaseButton.addEventListener("click", () => {

                item.quantity--;

                if (item.quantity <= 0) {
                    cart.splice(index, 1);
                }

                updateCart();

            });

            const quantityText = document.createElement("span");
            quantityText.textContent = item.quantity;

            const increaseButton = document.createElement("button");
            increaseButton.textContent = "+";
            increaseButton.setAttribute("aria-label", "Increase quantity");

            increaseButton.addEventListener("click", () => {
                item.quantity++;
                updateCart();
            });


            // REMOVE BUTTON

            const removeButton = document.createElement("button");
            removeButton.className = "remove-item-btn";
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", () => {
                cart.splice(index, 1);
                updateCart();
            });


            quantityControls.appendChild(decreaseButton);
            quantityControls.appendChild(quantityText);
            quantityControls.appendChild(increaseButton);
            quantityControls.appendChild(removeButton);

            itemContainer.appendChild(itemInfo);
            itemContainer.appendChild(quantityControls);

            cartItems.appendChild(itemContainer);

        });

        cartTotal.textContent = total.toLocaleString("en-US");
        cartCount.textContent = totalQuantity;

    }


    // =========================
    // 7. PLACE ORDER FOR CART
    // =========================

    document.getElementById("checkout-btn")
        .addEventListener("click", () => {

            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            const total = cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            const confirmed = confirm(
                `Your total is ₩${total.toLocaleString("en-US")}. Place your order?`
            );

            if (confirmed) {

                alert("Thank you! Your order has been placed.");

                cart = [];

                updateCart();

            }

        });


    // INITIAL CART DISPLAY

    updateCart();

});
