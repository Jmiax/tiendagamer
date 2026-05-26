/**
 * ==========================================================================
 * GAMERZONE STORE - INTERACTIVE APPLICATION SCRIPTS
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lucide Vector Icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // 2. Header State Management (Sticky/Scrolled Effect)
    const header = document.querySelector(".main-header");
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScroll);

    // 3. Cart State Management
    let cartItemCount = 0;
    const cartCounter = document.getElementById("cart-counter");
    const cartButton = document.getElementById("cart-toggle");
    const buyButtons = document.querySelectorAll(".btn-buy");

    /**
     * Increments the cart counter and triggers pop animation
     */
    const addProductToCart = (productName) => {
        // Increment state
        cartItemCount++;
        cartCounter.textContent = cartItemCount;

        // Trigger micro-animation on badge
        cartCounter.classList.remove("cart-pop");
        // Force reflow to restart animation
        void cartCounter.offsetWidth;
        cartCounter.addBehavior = "pop";
        cartCounter.classList.add("cart-pop");

        // Show premium high-tech notification toast
        showCyberToast("SISTEMA ACTUALIZADO", `¡${productName} agregado al carrito!`, "shopping-cart");
    };

    // Attach click listeners to all buy buttons
    buyButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            const productName = this.getAttribute("data-product") || "Artículo Gamer";
            addProductToCart(productName);
        });
    });

    // 4. Custom Cyberpunk Toast Notification System
    const toastContainer = document.getElementById("toast-container");

    /**
     * Creates and inserts a glowing custom cyber toast into the DOM
     * @param {string} title Header text for the toast
     * @param {string} message Description text
     * @param {string} iconName Name of the Lucide icon to display
     */
    const showCyberToast = (title, message, iconName = "check-circle") => {
        // Create Toast Wrapper
        const toast = document.createElement("div");
        toast.className = "toast-box";
        
        // Structure Inner HTML
        toast.innerHTML = `
            <div class="toast-icon">
                <i data-lucide="${iconName}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-msg">${message}</div>
            </div>
            <div class="toast-progress"></div>
        `;

        // Append to container
        toastContainer.appendChild(toast);

        // Render the newly added Lucide icon in this element specifically
        if (typeof lucide !== "undefined") {
            lucide.createIcons({
                attrs: {
                    class: "toast-lucide-icon"
                },
                nameAttr: "data-lucide",
                nodeList: toast.querySelectorAll("[data-lucide]")
            });
        }

        // Automatic Dismiss Lifecycle (3 seconds show + 400ms transition fadeout)
        const displayDuration = 3000;
        
        // Trigger hiding phase
        const hideTimeout = setTimeout(() => {
            toast.classList.add("hiding");
        }, displayDuration);

        // Remove element from DOM completely after fade out completes
        const removeTimeout = setTimeout(() => {
            toast.remove();
        }, displayDuration + 400);

        // Interactive dismiss: click to dismiss toast instantly
        toast.addEventListener("click", () => {
            clearTimeout(hideTimeout);
            clearTimeout(removeTimeout);
            toast.classList.add("hiding");
            setTimeout(() => toast.remove(), 400);
        });
    };

    // 5. Newsletter / Subscription Form Handling
    const newsletterForm = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("newsletter-email");
    const btnSubscribe = document.getElementById("btn-subscribe");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (email) {
                // Disable button during network simulation
                btnSubscribe.disabled = true;
                const originalBtnContent = btnSubscribe.innerHTML;
                btnSubscribe.innerHTML = `<span>ENVIANDO...</span> <i data-lucide="loader-2" class="animate-spin"></i>`;
                if (typeof lucide !== "undefined") lucide.createIcons({ nodeList: btnSubscribe.querySelectorAll("[data-lucide]") });

                // Simulate high-tech server synchronization
                setTimeout(() => {
                    // Success Toast
                    showCyberToast(
                        "CONEXIÓN ESTABLECIDA", 
                        `¡Clan activado! Registro exitoso para: ${email}`, 
                        "shield-check"
                    );

                    // Reset state
                    emailInput.value = "";
                    btnSubscribe.disabled = false;
                    btnSubscribe.innerHTML = originalBtnContent;
                    if (typeof lucide !== "undefined") lucide.createIcons({ nodeList: btnSubscribe.querySelectorAll("[data-lucide]") });
                }, 1200);
            }
        });
    }

    // 6. Smooth Active Class Swapping on Navigation Click
    const navLinks = document.querySelectorAll(".nav-item");
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // 7. Scroll Spy: Auto Highlight Navigation Items based on page scroll
    const sections = document.querySelectorAll("section");
    const navSpy = () => {
        let currentActiveSectionId = "";
        const scrollPosition = window.scrollY + 100; // Offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentActiveSectionId = section.getAttribute("id");
            }
        });

        if (currentActiveSectionId) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentActiveSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    };
    window.addEventListener("scroll", navSpy);
});
const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        themeBtn.textContent = "☀️";
    }else{
        themeBtn.textContent = "🌙";
    }
});