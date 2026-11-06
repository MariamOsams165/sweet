
// Get cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// HTML Elements
const productsContainer = document.getElementById('cart-products');
const cartCount = document.getElementById('cart-count');
const itemsLabel = document.getElementById('items-label');

const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');

const checkoutButton = document.getElementById('checkout-btn');

// Save cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Display cart products
function updateCart() {

    productsContainer.innerHTML = '';

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {

        subtotal += item.price * item.quantity;
        totalItems += item.quantity;

        productsContainer.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="item-info">

                    <h3>${item.name}</h3>

                    <span class="item-price">
                        $${Number(item.price).toFixed(2)}
                    </span>

                    <div class="quantity-control">

                        <button onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span class="quantity">
                            ${item.quantity}
                        </span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <div class="item-actions">

                    <span class="item-total">
                        $${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button class="remove-btn"
                            onclick="removeItem(${index})">

                        <i class="fa-regular fa-trash-can"></i>
                        Remove

                    </button>

                </div>

            </div>
        `;
    });

    // Update cart counter
    cartCount.textContent = totalItems;

    itemsLabel.textContent =
        `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;

    // Update prices
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${subtotal.toFixed(2)}`;

    // Disable checkout if cart is empty
    checkoutButton.disabled = cart.length === 0;

    // Empty cart message
    if (cart.length === 0) {

        productsContainer.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-basket-shopping"></i>

                <h3>Your Cart is Empty!</h3>

                <p>
                    Looks like you haven't added any sweet treats yet.
                </p>

                <a href="menu.html" class="shop-btn">
                    Explore Our Menu
                </a>

            </div>
        `;
    }
}


// Increase or decrease quantity
function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}


// Remove product
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
    updateCart();
}


// Go to Checkout
checkoutButton.addEventListener('click', function () {

    if (cart.length === 0) {
        return;
    }

    window.location.href = 'checkout.html';

});


// Initial display
updateCart();
