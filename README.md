# Webprogramming
Online ordering website

#Group name:Team Two

Member: 1.민 엉엉 소이(23101034)
       
        2.아리운바타르 아리운볼
       
        3.표먓되(23101222)
        
        4.까웅수산(25101154)

#member1(민 엉엉 소이)

#member2(아리운바타르 아리운볼)

#member3(표먓되)

# Member 3 – Shopping Cart and Order System

## 1. Website Planning and Requirements Analysis

### 1.1 Project Overview

As Member 3 of Team Two, I was responsible for designing and developing the Shopping Cart and Order System for our online Thai food ordering website.

The main purpose of this section is to allow customers to manage selected food items, review prices, enter delivery information, confirm orders, and access their previous order history.

The system was developed using HTML, CSS, and Vanilla JavaScript without requiring a backend server.

### 1.2 Objectives

- Provide a simple and convenient online ordering experience.
- Allow customers to manage selected food items efficiently.
- Automatically calculate order prices and delivery fees.
- Reduce errors through delivery form validation.
- Integrate the ordering system with the Menu and Account sections.
- Provide order history and reorder functionality.
- Support different screen sizes through responsive design.

### 1.3 Target Users

- Customers who want to order Thai food online.
- Customers who want to review their selected food items before ordering.
- Registered users who want to reuse their saved delivery information.
- Returning customers who want to reorder previously purchased meals.
- Guest users who want to place orders without creating an account.

### 1.4 User Flow and Sitemap

The ordering process follows the structure below:

    Menu
      |
      Add to Cart
      |
      Shopping Cart
      |
      Review Items and Total Price
      |
      Proceed to Checkout
      |
      Delivery Information
      |-- My Account
      |-- Other
      |
      Confirm Demo Order
      |
      Order Confirmation
      |
      Previous Orders
      |
      Order Again

The Cart and Order pages are connected to the Menu and Account sections to provide a complete ordering workflow.

### 1.5 Functional Requirements

| Feature | Description |
|---|---|
| Add to Cart | Add selected food items to the shopping cart |
| Quantity Management | Increase or decrease item quantities |
| Remove Item | Remove unwanted food items |
| Cart Counter | Display the total quantity of selected items |
| Price Calculation | Automatically calculate subtotal and total |
| Delivery Fee | Apply a standard delivery fee |
| Free Delivery | Provide free delivery for orders of ₩30,000 or more |
| Delivery Progress | Display progress toward free delivery |
| Checkout | Collect customer delivery information |
| Account Integration | Retrieve saved account information |
| Form Validation | Prevent incomplete or invalid orders |
| Order Confirmation | Display successful order confirmation |
| Previous Orders | Display completed demo orders |
| Reorder | Add previous order items back to the cart |
| Local Storage | Maintain cart and order history data |
| Responsive Design | Support desktop, tablet, and mobile layouts |

---

## 2. HTML Structure and Content Design

### 2.1 Shopping Cart Structure

The Shopping Cart section was implemented in `index.html` using semantic HTML elements.

The section contains:

- Continue Shopping navigation link.
- Shopping cart heading.
- Dynamically generated food items.
- Food images and names.
- Individual item prices.
- Quantity adjustment buttons.
- Remove item buttons.
- Order summary.
- Delivery information banner.
- Free delivery progress bar.
- Subtotal, delivery fee, and total price.
- Proceed to Checkout button.

The cart item container uses the ID `cart-items`, allowing JavaScript to dynamically display and update selected food items.

The order summary is separated from the cart items using an `<aside>` element.

### 2.2 Order and Checkout Structure

The Order section contains a delivery information form and an order summary sidebar.

The delivery form includes:

- Delivery Information Source.
- My Account or Other selection.
- Full Name.
- Phone Number.
- Email Address.
- Delivery Address.
- Special Instructions.
- Payment Method.
- Confirm Demo Order button.

The payment method is Cash on Delivery for demonstration purposes.

The checkout sidebar contains two main sections:

1. Previous Orders.
2. Current Order Summary.

Previous Orders is positioned above the current order summary so that returning customers can easily access their order history.

### 2.3 Order Confirmation

After a valid demo order is submitted, the website displays an order confirmation section containing:

- Order confirmation icon.
- Success message.
- Back to Home button.
- View Previous Orders button.

This provides clear visual feedback to customers after completing the ordering process.

### 2.4 Semantic HTML and Accessibility

The following semantic elements and accessibility attributes were used:

| Element or Attribute | Purpose |
|---|---|
| `<section>` | Organizes Cart and Order pages |
| `<article>` | Represents individual cart items and order history cards |
| `<aside>` | Separates order summaries from main content |
| `<form>` | Collects delivery information |
| `<label>` | Identifies form input fields |
| `<input>` | Collects customer information |
| `<textarea>` | Collects delivery addresses and special instructions |
| `<select>` | Provides delivery source and payment options |
| `<button>` | Supports interactive actions |
| `required` | Prevents submission of incomplete required fields |
| `aria-label` | Provides accessible descriptions for cart controls |
| `aria-expanded` | Indicates the visibility of order history |
| `aria-controls` | Connects the history toggle to its content |
| `role="status"` | Provides status feedback |
| `alt` | Provides alternative descriptions for food images |

The form also uses autocomplete attributes to improve the convenience of entering names, phone numbers, email addresses, and delivery addresses.

These features improve content organization, accessibility, and usability.

---

## 3. CSS Design and User Interface Development

### 3.1 Visual Design

The Cart and Order pages follow the consistent black and orange theme of the Team Two website.

The interface was designed to be modern, visually organized, and easy to navigate.

### 3.2 Color Scheme

| Design Element | Color Code |
|---|---|
| Main Background | #0b0b0b |
| Card Background | #171717 |
| Primary Orange | #ff7800 |
| Secondary Orange | #ff9638 |
| Main Text | #ffffff |
| Secondary Text | #b7b7b7 |
| Border | #303030 |
| Success and Free Delivery | #70d99a |

Orange is used for important buttons, prices, icons, and interactive elements.

Green is used to indicate free delivery and confirmed order status.

Red is used for remove item controls to distinguish destructive actions from normal actions.

### 3.3 Typography

Arial, Helvetica, and sans-serif fonts are used to maintain a clean and readable interface.

Different font sizes and weights are applied to create a clear visual hierarchy between:

- Page headings.
- Food names.
- Form labels.
- Product prices.
- Order totals.
- Secondary descriptions.

### 3.4 CSS Grid Layout

CSS Grid is used to organize the Cart and Checkout pages into two columns.

The main layout uses:

    grid-template-columns:
      minmax(0, 1.8fr) minmax(0, 1fr);

The left column displays cart items or the delivery form.

The right column displays the order summary and previous orders.

This layout allows customers to review their order information while managing their cart or completing the checkout form.

### 3.5 CSS Flexbox

Flexbox is used to organize individual interface components, including:

- Cart item images and information.
- Quantity adjustment buttons.
- Order summary rows.
- Delivery information banners.
- Previous order cards.
- Checkout sidebar.
- Price and total alignment.

Flexbox improves element alignment and spacing while supporting flexible layouts.

### 3.6 Responsive Design

CSS media queries are used to adapt the interface to different screen sizes.

| Screen Width | Layout Behavior |
|---|---|
| Desktop | Two-column Cart and Checkout layouts |
| 1100px and below | Cart item content can wrap |
| 900px and below | Cart and Checkout layouts change to a single column |
| Smaller mobile screens | Responsive spacing and component arrangement |

The responsive design allows users to access the ordering system on computers, tablets, and mobile devices.

### 3.7 User Experience Design

The following interface features were implemented to improve the user experience:

- Clearly visible action buttons.
- Hover effects and smooth transitions.
- Rounded cards and consistent spacing.
- Highlighted prices and order totals.
- Animated free delivery progress bar.
- Empty cart messages.
- Disabled checkout button when the cart is empty.
- Toast notifications.
- Order confirmation feedback.
- Scrollable previous order history.
- Show and Hide controls for order history.
- Visible keyboard focus indicators.

These design decisions help customers understand the ordering process and interact with the website efficiently.

---

## 4. JavaScript Functionality and Interactivity

### 4.1 Shopping Cart Management

JavaScript is used to manage the shopping cart dynamically.

Food information is retrieved from the Menu section through HTML data attributes:

- data-id
- data-name
- data-price
- data-image

Each cart item is represented as a JavaScript object containing:

    {
      id: "1",
      name: "Pad Thai",
      price: 12000,
      image: "images/pad-thai.jpg",
      quantity: 1
    }

When a customer clicks Add to Cart, the system checks whether the selected food already exists in the cart.

If the item already exists, its quantity increases.

Otherwise, a new item is added to the cart array.

This prevents duplicate cart entries and makes quantity management more efficient.

### 4.2 Quantity Management

Customers can increase or decrease food quantities using the plus and minus buttons.

The `changeQuantity()` function updates the quantity of the selected item.

The `removeItem()` function removes an unwanted item from the cart.

Whenever the cart changes, the system updates:

- Item quantities.
- Cart counter.
- Individual item totals.
- Subtotal.
- Delivery fee.
- Final order total.
- Free delivery progress.

The updated cart information is also saved to browser Local Storage.

### 4.3 Automatic Price Calculation

The system automatically calculates order prices using JavaScript.

The subtotal is calculated using the following formula:

    Subtotal = Sum of (Item Price × Quantity)

The standard delivery fee is ₩3,000.

The delivery fee depends on the subtotal:

| Order Subtotal | Delivery Fee |
|---|---:|
| Empty cart | ₩0 |
| Below ₩30,000 | ₩3,000 |
| ₩30,000 or more | ₩0 |

The final total is calculated as:

    Total = Subtotal + Delivery Fee

Example 1:

    Pad Thai × 1 = ₩12,000
    Green Curry × 1 = ₩13,000

    Subtotal = ₩25,000
    Delivery Fee = ₩3,000
    Total = ₩28,000

Example 2:

    Pad Thai × 1 = ₩12,000
    Thai Fried Rice × 1 = ₩11,000
    Mango Sticky Rice × 1 = ₩7,000

    Subtotal = ₩30,000
    Delivery Fee = ₩0
    Total = ₩30,000

The `formatPrice()` function formats prices using the Korean Won currency format.

### 4.4 Free Delivery System

A free delivery threshold of ₩30,000 was implemented to automatically determine whether a customer qualifies for free delivery.

The system displays the remaining amount required to receive free delivery.

The delivery progress bar is calculated using:

    Progress = min((Subtotal / 30000) × 100, 100)

For example:

| Subtotal | Progress | Remaining Amount |
|---|---:|---:|
| ₩0 | 0% | ₩30,000 |
| ₩15,000 | 50% | ₩15,000 |
| ₩24,000 | 80% | ₩6,000 |
| ₩30,000 | 100% | ₩0 |
| ₩40,000 | 100% | ₩0 |

The progress value is limited to 100% using `Math.min()`.

When the subtotal reaches ₩30,000, the delivery fee becomes zero and the interface displays a free delivery message.

This provides immediate feedback and makes delivery costs transparent.

### 4.5 Browser Local Storage

Browser Local Storage is used to maintain cart and order history information.

| Storage Key | Purpose |
|---|---|
| teamTwoCart | Stores shopping cart items |
| teamTwoOrders | Stores previous order records |

JavaScript objects and arrays are converted into JSON strings using `JSON.stringify()` before being saved.

Stored information is retrieved using `JSON.parse()`.

The system validates stored cart items and uses error handling when loading or saving cart and order history data.

This allows customers to retain their cart and order history after refreshing the website when browser storage is available.

### 4.6 Account Integration

The Checkout page is integrated with the Account System developed by Member 4.

Customers can select one of two delivery information sources.

#### My Account

When a customer is logged in, the system retrieves the saved account information and automatically fills:

- Full name.
- Phone number.
- Email address.
- Delivery address.

Customers can review and edit the information before confirming their order.

When an order is confirmed using My Account, the updated phone number and delivery address are saved to the customer's browser-based account profile.

#### Other

Customers can manually enter different delivery information without using their saved account details.

When no account information is available, the system displays a warning message and switches the delivery information source back to Other.

The integration uses the following existing account storage keys:

| Storage Key | Storage Type | Purpose |
|---|---|---|
| thaitaste_demo_users | Local Storage | Retrieves saved account information |
| thaitaste_demo_session | Session Storage | Identifies the current logged-in user |

My contribution focuses on integrating this information into the Checkout process rather than implementing the registration and login system itself.

### 4.7 Form Validation

HTML and JavaScript validation are used together to prevent incomplete or invalid orders.

The validation process checks:

- Whether the cart contains food items.
- Whether required fields are completed.
- Whether the email address has a valid format.
- Whether the phone number matches the accepted pattern.
- Whether the name and address contain non-empty values.

The phone number is checked using a regular expression:

    /^\+?[\d\s()-]{7,20}$/

The system also uses:

- checkValidity()
- reportValidity()
- trim()

If the entered information is invalid, the system prevents order submission and provides feedback.

This improves data quality and reduces incomplete orders.

### 4.8 Order Creation and Confirmation

When the customer submits a valid order, the system creates a new order record.

Each order contains:

- Unique timestamp-based order ID.
- Order date and time.
- Selected food items.
- Item quantities.
- Subtotal.
- Delivery fee.
- Total price.
- Confirmed status.
- Account email, if available.

The order ID is generated using:

    "TT-" + Date.now()

The order date is stored using the ISO date format.

After the order is created:

1. The order record is saved to Local Storage.
2. The shopping cart is cleared.
3. The cart counter and stored cart are updated.
4. The delivery form is reset.
5. The checkout layout is hidden.
6. The order confirmation message is displayed.

The system does not process real payments or deliveries.

### 4.9 Previous Orders

The Previous Orders feature allows customers to review their completed demo orders.

Each order history card displays:

- Order ID.
- Order date and time.
- Order status.
- Food names.
- Food quantities.
- Item prices.
- Total order price.
- Order Again button.

New orders are inserted at the beginning of the order history array using `unshift()`.

Therefore, the most recent orders appear first.

Order history is filtered according to the current account email.

When no account is logged in, guest orders stored in the same browser are displayed.

The history section also provides Show and Hide functionality to reduce unnecessary screen space.

Delivery names, phone numbers, addresses, and special instructions are not stored in the order history records.

### 4.10 Reorder Functionality

The Order Again feature allows customers to add previously ordered food items back into the shopping cart.

The `reorder()` function performs the following operations:

1. Retrieves food items from the selected previous order.
2. Checks whether each item still exists in the current menu.
3. Uses the current menu information and prices when adding new cart entries.
4. Adds available items to the shopping cart.
5. Increases quantities when an item already exists.
6. Saves the updated cart.
7. Displays a toast notification.
8. Redirects the customer to the Cart page.

This feature improves convenience for returning customers.

### 4.11 DOM Manipulation

JavaScript DOM manipulation is used to dynamically generate and update interface elements without reloading the entire website.

The following methods are used:

| Method | Purpose |
|---|---|
| getElementById() | Retrieves specific HTML elements |
| querySelector() | Selects individual interface elements |
| querySelectorAll() | Selects multiple elements |
| createElement() | Creates cart and order history elements |
| appendChild() | Adds generated elements |
| replaceChildren() | Updates dynamically generated content |
| textContent | Displays text and calculated values |
| classList.toggle() | Updates visual states |
| setAttribute() | Updates accessibility attributes |

Using DOM manipulation allows the interface to respond immediately to customer actions.

### 4.12 Event Handling

JavaScript event listeners are used to handle customer interactions.

| Event | Functionality |
|---|---|
| click | Add food to the cart |
| click | Increase or decrease quantity |
| click | Remove food items |
| click | Proceed to Checkout |
| change | Select delivery information source |
| submit | Validate and confirm an order |
| click | Show or hide previous orders |
| click | Reorder previous food items |

The checkout form uses `preventDefault()` to prevent the default page submission behavior.

This allows JavaScript to validate and process demo orders directly in the browser.

### 4.13 JavaScript Array Methods

Several JavaScript array methods are used to manage cart and order information efficiently.

| Method | Purpose |
|---|---|
| find() | Finds an existing cart or menu item |
| filter() | Removes items and filters order history |
| reduce() | Calculates subtotal and total item quantity |
| map() | Copies cart items into an order record |
| forEach() | Processes cart items and previous orders |
| unshift() | Inserts the newest order at the beginning |

These methods improve code readability and reduce unnecessary repetitive logic.

### 4.14 Main JavaScript Functions

| Function | Description |
|---|---|
| isValidCartItem() | Validates stored cart items |
| formatPrice() | Formats prices in Korean Won |
| getSubtotal() | Calculates the cart subtotal |
| getDeliveryFee() | Calculates the delivery fee |
| getTotal() | Calculates the final order total |
| getDeliveryMessage() | Generates free delivery messages |
| updateDeliveryInformation() | Updates delivery information and progress |
| saveCart() | Saves cart information |
| updateCartCount() | Updates the cart counter |
| changeQuantity() | Changes the quantity of a selected item |
| removeItem() | Removes an item from the cart |
| renderCart() | Displays cart items and order summary |
| saveOrderHistory() | Saves previous orders |
| createOrder() | Creates a new order record |
| renderPreviousOrders() | Displays previous order records |
| reorder() | Adds available previous order items to the cart |
| getCurrentUser() | Retrieves current account information |
| clearDeliveryFields() | Clears delivery form fields |
| updateDeliverySource() | Handles My Account and Other selection |
| renderCheckout() | Displays checkout information |

### 4.15 Technical Justification

Vanilla JavaScript was selected to meet the project requirements without using external frontend frameworks.

Browser Local Storage provides a simple way to demonstrate persistent cart and order history functionality without requiring a database.

CSS Grid and Flexbox were used because they provide flexible and responsive layouts.

Dynamic DOM manipulation was used to update the interface immediately instead of reloading the entire webpage.

The implementation demonstrates how frontend technologies can be combined to simulate an interactive e-commerce ordering system.

---

## 5. Testing, Evaluation and Reflection

### 5.1 Testing Method

The Shopping Cart and Order System was manually tested in a web browser.

Testing focused on:

- Shopping cart functionality.
- Quantity management.
- Automatic price calculation.
- Delivery fee calculation.
- Free delivery progress.
- Checkout form validation.
- Account integration.
- Order confirmation.
- Previous order history.
- Reorder functionality.
- Browser storage persistence.
- Responsive layout.

The system was also tested as part of the integrated group website to verify its interaction with the Menu and Account sections.

### 5.2 Functional Testing Results

| No. | Test Case | Expected Result | Actual Result | Status |
|---:|---|---|---|---|
| 1 | Add food to cart | Selected food appears in cart | Item added correctly | Pass |
| 2 | Add duplicate food | Existing quantity increases | Quantity updated correctly | Pass |
| 3 | Increase quantity | Quantity and price increase | Values updated correctly | Pass |
| 4 | Decrease quantity | Quantity and price decrease | Values updated correctly | Pass |
| 5 | Remove food item | Selected item is removed | Item removed successfully | Pass |
| 6 | Empty cart | Checkout button is disabled | Button disabled correctly | Pass |
| 7 | Order below ₩30,000 | Delivery fee is ₩3,000 | Fee calculated correctly | Pass |
| 8 | Order of ₩30,000 or more | Delivery fee becomes zero | Free delivery applied | Pass |
| 9 | Delivery progress bar | Progress updates with subtotal | Progress updated correctly | Pass |
| 10 | Refresh website | Cart information remains available | Cart restored successfully | Pass |
| 11 | Select My Account | Saved information is filled automatically | Account information loaded | Pass |
| 12 | Select Other | Manual delivery input is available | Manual input worked | Pass |
| 13 | Submit incomplete form | Order submission is prevented | Validation worked | Pass |
| 14 | Confirm valid order | Success message is displayed | Demo order confirmed | Pass |
| 15 | View Previous Orders | Saved orders are displayed | History displayed correctly | Pass |
| 16 | Click Order Again | Available previous items return to cart | Items restored correctly | Pass |
| 17 | Show or Hide History | History visibility changes | Toggle worked correctly | Pass |
| 18 | Responsive layout | Layout adapts to screen size | Layout adjusted correctly | Pass |

### 5.3 Testing Summary

| Testing Result | Value |
|---|---:|
| Total Test Cases | 18 |
| Passed | 18 |
| Failed | 0 |
| Success Rate | 100% |

All listed test cases passed during manual testing.

The Shopping Cart and Order System performed as expected, including automatic price calculation, free delivery, checkout validation, account integration, and previous order management.

### 5.4 Testing Screenshots

#### Figure 1 – Shopping Cart

The Shopping Cart page demonstrates selected food items, quantity controls, remove buttons, and automatic price calculation.

<!-- Insert Shopping Cart screenshot here -->

#### Figure 2 – Free Delivery System

This screenshot demonstrates the free delivery feature when the order subtotal reaches ₩30,000.

<!-- Insert Free Delivery screenshot here -->

#### Figure 3 – Checkout Form

The Checkout page demonstrates delivery information fields, payment method selection, and the current order summary.

<!-- Insert Checkout screenshot here -->

#### Figure 4 – Account Integration

This screenshot demonstrates automatic delivery information filling when My Account is selected.

<!-- Insert Account Integration screenshot here -->

#### Figure 5 – Order Confirmation

The order confirmation page demonstrates successful demo order submission.

<!-- Insert Order Confirmation screenshot here -->

#### Figure 6 – Previous Orders

The Previous Orders section demonstrates saved order information and the Order Again feature.

<!-- Insert Previous Orders screenshot here -->

#### Figure 7 – Responsive Design

This screenshot demonstrates the responsive Cart or Order layout on a smaller screen.

<!-- Insert Responsive Design screenshot here -->

### 5.5 System Evaluation

The Shopping Cart and Order System successfully provides a complete frontend ordering workflow.

Automatic price calculation reduces manual calculation errors and provides customers with immediate feedback.

The free delivery progress bar improves transparency by showing how much additional spending is required to qualify for free delivery.

Account integration reduces repetitive data entry by allowing customers to reuse their saved delivery information.

Previous Orders and Order Again improve convenience for returning customers.

The responsive layout maintains usability across different screen sizes.

The system also integrates the Menu and Account sections into a consistent ordering experience.

### 5.6 Challenges and Solutions

| Challenge | Solution |
|---|---|
| Duplicate food items | Check existing item IDs and increase quantity |
| Incorrect price updates | Recalculate prices whenever cart data changes |
| Losing cart data after refresh | Save cart information using Local Storage |
| Free delivery calculation | Apply a fixed threshold of ₩30,000 |
| Incomplete delivery information | Implement HTML and JavaScript validation |
| Repetitive delivery information entry | Integrate saved account information |
| Managing previous orders | Store structured order records in Local Storage |
| Displaying unavailable previous items | Check previous items against the current menu |
| Different screen sizes | Implement CSS Grid, Flexbox, and media queries |
| Connecting different team components | Use consistent data attributes and storage keys |

### 5.7 Current Limitations

Although the system provides a functional ordering demonstration, it has several limitations.

- The website is a frontend-only student project.
- No backend server or central database is implemented.
- Cart and order history are stored in the customer's browser.
- Stored information may be lost when browser data is cleared.
- Cart and order information cannot be synchronized across devices.
- Guest order history is shared within the same browser.
- Account-based order filtering does not provide server-side authorization.
- Real online payments are not processed.
- Real restaurant orders and deliveries are not processed.
- Real-time inventory management is unavailable.
- Live delivery tracking is unavailable.
- Delivery address and phone number validation are limited.
- Client-side prices and stored data can be modified through browser developer tools.

These limitations are acceptable for a frontend demonstration but would need to be addressed before commercial deployment.

### 5.8 Future Improvements

The following improvements could be implemented in future versions:

- Backend server integration.
- Centralized database for customers and orders.
- Secure server-side authentication and authorization.
- Server-side price and inventory validation.
- Real online payment gateway integration.
- Real-time order status updates.
- Live delivery tracking.
- Restaurant order management dashboard.
- Discount coupons and promotional codes.
- Cross-device shopping cart synchronization.
- Improved phone number and address validation.
- Order cancellation functionality.
- More detailed order status management.
- Automated functional testing.

These improvements would help transform the current frontend demonstration into a production-ready online food ordering platform.

### 5.9 Personal Reflection

Through this project, I gained practical experience in developing an interactive online ordering system using HTML, CSS, and JavaScript.

I improved my understanding of:

- JavaScript event handling.
- DOM manipulation.
- JavaScript objects and arrays.
- Automatic price calculation.
- Browser Local Storage.
- Browser Session Storage.
- JSON data management.
- Form validation.
- CSS Grid and Flexbox.
- Responsive web design.
- Functional testing and debugging.

Integrating the Shopping Cart and Order System with the Menu and Account sections also helped me understand the importance of teamwork, consistent data structures, and communication between project members.

I learned that developing a functional website requires not only visual design but also careful consideration of user interactions, data management, validation, accessibility, and system reliability.

This project improved my frontend development and problem-solving skills and provided practical experience in developing an e-commerce ordering workflow.

---

## 6. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and checkout forms |
| CSS3 | Styling and responsive layouts |
| Vanilla JavaScript | Cart management and order processing |
| CSS Grid | Two-column page layouts |
| CSS Flexbox | Component alignment and organization |
| Local Storage | Cart and order history persistence |
| Session Storage | Current account identification |
| JSON | Browser storage data conversion |
| Lucide Icons | Interface icons |
| Git | Version control |
| GitHub | Team collaboration and source code management |

---

## 7. Implementation Files

The following files contain the Shopping Cart and Order System implementation.

| File | Contribution |
|---|---|
| index.html | Shopping Cart structure, Checkout form, Order Summary, Previous Orders, and Order Confirmation |
| styles.css | Cart layout, quantity controls, checkout styling, delivery progress bar, order history, and responsive design |
| script.js | Cart management, price calculation, delivery fee calculation, account integration, form validation, order creation, order history, and reorder functionality |
| README.md | Documentation of the Member 3 implementation |

---

## 8. Individual Contribution

As Member 3, my main contributions to the Team Two project were:

- Designing the Shopping Cart page.
- Designing the Order and Checkout pages.
- Implementing Add to Cart functionality.
- Implementing quantity management and item removal.
- Developing automatic price calculations.
- Implementing the free delivery system.
- Developing the delivery progress bar.
- Implementing checkout form validation.
- Integrating checkout with the existing Account System.
- Implementing order creation and confirmation.
- Developing previous order history.
- Implementing reorder functionality.
- Managing cart and order data using browser storage.
- Implementing responsive Cart and Order layouts.
- Testing and debugging the ordering workflow.
- Integrating my assigned components into the group website.
- Preparing technical documentation for the Cart and Order System.

---

## 9. Conclusion

The Shopping Cart and Order System is an essential component of the Team Two online Thai food ordering website.

It connects the Menu and Account sections to provide a complete frontend ordering experience, from food selection and cart management to checkout, order confirmation, and previous order management.

The implementation demonstrates the practical application of semantic HTML, responsive CSS, JavaScript event handling, DOM manipulation, form validation, and browser storage.

The system meets its intended purpose as an interactive student web programming project.

With future backend, database, authentication, and payment integration, the current implementation could be extended into a more complete online food ordering platform.


#member4(까웅수산)

## Account and Login System

The Account and Login section allows users to create an account, log in, and access their personal dashboard.

### Features
- User registration with name, email, and password.
- Login using registered email and password.
- Password confirmation during registration.
- Password validation with a minimum length of 8 characters.
- Duplicate email checking to prevent multiple registrations with the same email.
- User dashboard displaying the registered name and email.
- Logout functionality.

### Technologies Used
- HTML
- CSS
- JavaScript
- Browser Local Storage
- Browser Session Storage
- Web Crypto API (SHA-256 password hashing)

## Contact Us Section

The Contact Us section provides restaurant information and allows visitors to submit messages through a contact form.

### Features
- Restaurant address and phone number.
- Contact email information.
- Restaurant opening hours.
- Contact form with name, email, and message fields.
- Required-field validation.
- Success message after form submission.
- Responsive layout for different screen sizes.

### Technologies Used
- HTML
- CSS
- JavaScript

## Implementation Files

The following files were modified or updated:

| File | Description |
|---|---|
| `index.html` | Account and Contact section structure |
| `style.css` | Styling for login, registration, dashboard, and contact sections |
| `script.js` | Registration, login, logout, and contact form functionality |
