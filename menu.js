document.addEventListener('DOMContentLoaded', function() {
    
    // الحصول على عناصر الفلتر والمنتجات
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // إضافة مستمع حدث لكل زر فلتر
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // 1. إدارة الحالة النشطة للأزرار
            // إزالة كلاس active من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة كلاس active للزر الذي تم الضغط عليه
            button.classList.add('active');

            // 2. إدارة عرض المنتجات
            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                // الحصول على فئة المنتج
                const productCategory = card.getAttribute('data-category');

                if (filterValue === 'all') {
                    // إذا كان الخيار "All" عرض كل البطاقات
                    card.style.display = 'flex';
                } else {
                    // إذا تطابقت فئة المنتج مع الفلتر، اعرضه، وإلا أخفه
                    if (productCategory === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {

    // Get cart from LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart counter
    function updateCartCount() {

        const cartCount = document.getElementById('cart-count');

        if (!cartCount) return;

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalItems;
    }

    // Add products to cart
    const addButtons = document.querySelectorAll('.add-to-cart-btn');

    addButtons.forEach(button => {

        button.addEventListener('click', function () {

            // Get product information from its card
            const productCard = button.closest('.product-card');

            const name = productCard.querySelector('h3').textContent.trim();

            const priceText = productCard.querySelector('.price')
                .textContent.replace('$', '').trim();

            const price = parseFloat(priceText);

            const image = productCard.querySelector('img').src;

            // Create product ID from its name
            const id = name.toLowerCase().replace(/\s+/g, '-');

            // Check if product already exists
            const existingProduct = cart.find(item => item.id === id);

            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });

            }

            // Save cart
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update counter
            updateCartCount();

            alert(name + ' added to your cart! 🛒');

        });

    });

    // Show saved cart count when opening Menu
    updateCartCount();

});
