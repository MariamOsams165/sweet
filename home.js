
document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // 1. Shopping Cart
    // =====================================

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Save Cart
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update Cart Counter
    function updateCartCount() {

        const cartCount = document.getElementById('cart-count');

        if (!cartCount) return;

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalItems;
    }

    // Add to Cart
    const cartButtons = document.querySelectorAll('.add-to-cart');

    cartButtons.forEach(button => {

        button.addEventListener('click', () => {

            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = Number(button.dataset.price);
            const image = button.dataset.image;

            if (!id || !name || !price || !image) {
                alert('Product information is missing!');
                return;
            }

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

            saveCart();
            updateCartCount();

            alert(`"${name}" Added to Your Cart! 🍩`);

        });

    });

    // Initialize Cart Counter
    updateCartCount();


    // =====================================
    // 2. Testimonial Slider
    // =====================================

    const testimonials = [
        {
            text: '"Absolutely delicious! The donuts are amazing and the cheesecake is to die for!"',
            name: '— Sarah M.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
        },
        {
            text: '"The best cupcakes in town! Super fresh and beautiful presentation."',
            name: '— Emily R.',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
        },
        {
            text: '"Fudgy brownies are top tier. Will definitely order again for family events."',
            name: '— Michael K.',
            avatar: 'https://images.unsplash.com/photo-1507003211161-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
        }
    ];

    let currentIndex = 0;

    const testimonialText = document.querySelector('.testimonial-text p');
    const testimonialName = document.querySelector('.testimonial-text span');
    const userAvatar = document.querySelector('.user-avatar');

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const dots = document.querySelectorAll('.dot');

    function updateTestimonial(index) {

        if (!testimonialText || !testimonialName || !userAvatar) return;

        testimonialText.innerText = testimonials[index].text;
        testimonialName.innerText = testimonials[index].name;
        userAvatar.src = testimonials[index].avatar;

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });

    }

    if (nextBtn && prevBtn) {

        nextBtn.addEventListener('click', () => {

            currentIndex = (currentIndex + 1) % testimonials.length;

            updateTestimonial(currentIndex);

        });

        prevBtn.addEventListener('click', () => {

            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;

            updateTestimonial(currentIndex);

        });

    }

    // Testimonial Dots
    dots.forEach((dot, index) => {

        dot.addEventListener('click', () => {

            currentIndex = index;
            updateTestimonial(currentIndex);

        });

    });


    // =====================================
    // 3. Newsletter Form
    // =====================================

    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {

        newsletterForm.addEventListener('submit', (e) => {

            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input').value;

            alert(`Thank you for subscribing with: ${emailInput} 🎉`);

            newsletterForm.reset();

        });

    }

});
