
const sampleReviews = [
    {
        name: "Sarah M.",
        rating: 5,
        product: "New York Cheesecake",
        text: "The cheesecake was so creamy and delicious. The packaging was lovely too. I'll definitely order again!"
    },
    {
        name: "Omar A.",
        rating: 5,
        product: "Classic Donuts",
        text: "Fresh, soft, and perfectly sweet. The donuts disappeared in minutes at home!"
    },
    {
        name: "Nour H.",
        rating: 4,
        product: "Chocolate Brownies",
        text: "Rich chocolate flavor and a lovely texture. A perfect treat with coffee."
    },
    {
        name: "Laila K.",
        rating: 5,
        product: "Cupcakes",
        text: "Beautiful cupcakes and they tasted even better than they looked."
    },
    {
        name: "Youssef R.",
        rating: 5,
        product: "Chocolate Donuts",
        text: "Everything arrived neatly packed and tasted fresh. Great little treat for the weekend."
    },
    {
        name: "Mariam S.",
        rating: 5,
        product: "Cheesecake",
        text: "The balance of sweetness was just right. I loved every bite!"
    }
];

const reviewsGrid = document.getElementById("reviewsGrid");
const ratingFilter = document.getElementById("ratingFilter");
const reviewForm = document.getElementById("reviewForm");
const ratingInput = document.getElementById("selectedRating");
const starButtons = document.querySelectorAll(".star-picker button");

// Get reviews saved by the visitor
function getSavedReviews() {
    try {
        return JSON.parse(localStorage.getItem("sweetBlissReviews")) || [];
    } catch {
        return [];
    }
}

// Prevent HTML injection when displaying user-entered text
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[char]));
}

// Display review cards
function displayReviews() {
    const savedReviews = getSavedReviews();
    const allReviews = [...savedReviews, ...sampleReviews];
    const selectedRating = ratingFilter.value;

    const filteredReviews = selectedRating === "all"
        ? allReviews
        : allReviews.filter(review => Number(review.rating) === Number(selectedRating));

    if (filteredReviews.length === 0) {
        reviewsGrid.innerHTML = "<p>No reviews found for this rating yet.</p>";
        return;
    }

    reviewsGrid.innerHTML = filteredReviews.map(review => `
        <article class="review-card">
            <div class="review-top">
                <div class="avatar">
                    ${escapeHTML(review.name.charAt(0).toUpperCase())}
                </div>

                <div class="reviewer">
                    <strong>${escapeHTML(review.name)}</strong>
                    <span>Customer</span>
                </div>

                <div class="review-stars">
                    ${"★".repeat(Number(review.rating))}${"☆".repeat(5 - Number(review.rating))}
                </div>
            </div>

            <blockquote>
                “${escapeHTML(review.text)}”
            </blockquote>

            <span class="product-tag">
                <i class="fas fa-cookie-bite"></i>
                ${escapeHTML(review.product)}
            </span>
        </article>
    `).join("");
}

// Choose rating stars
function setRating(value) {
    ratingInput.value = value;

    starButtons.forEach(button => {
        const rating = Number(button.dataset.rating);
        button.classList.toggle("selected", rating <= value);
    });
}

starButtons.forEach(button => {
    button.addEventListener("click", () => {
        setRating(Number(button.dataset.rating));
    });
});

// Filter reviews
ratingFilter.addEventListener("change", displayReviews);

// Add a new review
reviewForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const text = document.getElementById("reviewText").value.trim();
    const product = document.getElementById("productName").value;
    const rating = Number(ratingInput.value);

    if (!name || !text) return;

    const newReview = {
        name,
        rating,
        product,
        text
    };

    const savedReviews = getSavedReviews();
    savedReviews.unshift(newReview);

    localStorage.setItem("sweetBlissReviews", JSON.stringify(savedReviews));

    reviewForm.reset();
    setRating(5);
    ratingFilter.value = "all";

    displayReviews();

    document.getElementById("formMessage").textContent =
        "Thank you! Your review has been added successfully.";

    document.getElementById("reviews").scrollIntoView({
        behavior: "smooth"
    });
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function() {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Cart counter
try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((total, item) => {
        return total + Number(item.quantity || 1);
    }, 0);

    document.getElementById("cartCount").textContent = count;
} catch {
    document.getElementById("cartCount").textContent = "0";
}

// Current year
document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// Initial page setup
setRating(5);
displayReviews();
