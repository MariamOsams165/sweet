
document.addEventListener("DOMContentLoaded", function () {

    // ================= MOBILE NAVBAR =================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Close menu after clicking a link
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }


    // ================= CART COUNT =================

    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");

        if (!cartCount) return;

        let cart = [];

        try {
            cart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch (error) {
            cart = [];
        }

        const totalItems = cart.reduce(function (total, item) {
            return total + (Number(item.quantity) || 0);
        }, 0);

        cartCount.textContent = totalItems;
    }

    updateCartCount();


    // ================= SCROLL REVEAL =================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(function (entries, observer) {

            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }


    // ================= ANIMATED COUNTERS =================

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {
        const target = Number(counter.dataset.target);
        const duration = 1200;
        const startTime = performance.now();

        function updateNumber(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const currentValue = Math.floor(target * progress);
            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateNumber);
    }

    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(function (entries, observer) {

            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.6
        });

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });

    } else {
        counters.forEach(animateCounter);
    }


    // ================= GALLERY LIGHTBOX =================

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const momentCards = document.querySelectorAll(".moment-card");

    function openLightbox(imageUrl, altText) {
        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = imageUrl;
        lightboxImage.alt = altText || "Sweet Bliss dessert";

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    momentCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const imageUrl = card.dataset.image;
            const image = card.querySelector("img");

            if (imageUrl) {
                openLightbox(imageUrl, image ? image.alt : "");
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });


    // ================= CURRENT YEAR =================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});