
document.addEventListener("DOMContentLoaded", function () {

    console.log("Amanda's portfolio JavaScript loaded.");

    // =========================================
    // 1. FOOTER YEAR
    // =========================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =========================================
    // 2. NAVIGATION SCROLL EFFECT
    // =========================================

    const navbar = document.querySelector(".portfolio-nav");

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();


    // =========================================
    // 3. MOBILE NAVIGATION
    // =========================================

    const navLinks = document.querySelectorAll(
        ".portfolio-nav .nav-link"
    );

    const navMenu = document.getElementById("portfolioNav");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {

            if (
                navMenu &&
                navMenu.classList.contains("show") &&
                window.bootstrap
            ) {
                window.bootstrap.Collapse
                    .getOrCreateInstance(navMenu)
                    .hide();
            }

        });
    });


    // =========================================
    // 4. ACTIVE NAVIGATION
    // =========================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        navLinks.forEach(function (link) {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                "#" + entry.target.id
                            );

                        });

                    }

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }


    // =========================================
    // 5. BACK TO TOP
    // =========================================

    const backToTop = document.querySelector(".back-to-top");

    function updateBackToTop() {

        if (!backToTop) return;

        backToTop.classList.toggle("show", window.scrollY > 400);
    }

    window.addEventListener("scroll", updateBackToTop);
    updateBackToTop();


    // =========================================
    // 6. SCROLL REVEAL
    // =========================================

    const revealElements = document.querySelectorAll(
        ".hero-section, .intro-strip, .project-card, " +
        ".about-section, .skill-card, .contact-section"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach(function (element) {
            element.classList.add("revealed");
        });
    }


    // =========================================
    // 7. PROJECT CAROUSEL
    // =========================================

    const carousel = document.getElementById("projectCarousel");

    if (carousel) {

        const slides = Array.from(
            carousel.querySelectorAll(".project-slide")
        );

        const dots = Array.from(
            carousel.querySelectorAll(".carousel-dot")
        );

        const previousButton = document.getElementById("prevProject");
        const nextButton = document.getElementById("nextProject");
        const counter = document.getElementById("carouselCounter");

        let currentSlide = 0;
        let carouselTimer = null;

        const delay = 4000;

        function showProject(index) {

            if (slides.length === 0) return;

            currentSlide = (index + slides.length) % slides.length;

            slides.forEach(function (slide, i) {

                const isActive = i === currentSlide;

                slide.classList.toggle("active", isActive);
                slide.setAttribute("aria-hidden", String(!isActive));

            });

            dots.forEach(function (dot, i) {

                const isActive = i === currentSlide;

                dot.classList.toggle("active", isActive);
                dot.setAttribute("aria-pressed", String(isActive));

            });

            if (counter) {
                counter.textContent =
                    String(currentSlide + 1).padStart(2, "0") +
                    " / " +
                    String(slides.length).padStart(2, "0");
            }

        }


        function nextProject() {
            showProject(currentSlide + 1);
        }


        function previousProject() {
            showProject(currentSlide - 1);
        }


        function stopCarousel() {

            if (carouselTimer !== null) {
                clearInterval(carouselTimer);
                carouselTimer = null;
            }

        }


        function startCarousel() {

            stopCarousel();

            if (
                !window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches &&
                !document.hidden
            ) {
                carouselTimer = setInterval(nextProject, delay);
            }

        }


        // Previous button
        if (previousButton) {

            previousButton.addEventListener("click", function () {
                previousProject();
                startCarousel();
            });

        }


        // Next button
        if (nextButton) {

            nextButton.addEventListener("click", function () {
                nextProject();
                startCarousel();
            });

        }


        // Indicator dots
        dots.forEach(function (dot, index) {

            dot.addEventListener("click", function () {
                showProject(index);
                startCarousel();
            });

        });


        // Pause while hovering
        carousel.addEventListener("mouseenter", stopCarousel);
        carousel.addEventListener("mouseleave", startCarousel);


        // Pause while using keyboard controls
        carousel.addEventListener("focusin", stopCarousel);

        carousel.addEventListener("focusout", function (event) {

            if (!carousel.contains(event.relatedTarget)) {
                startCarousel();
            }

        });


        // Pause when browser tab is hidden
        document.addEventListener("visibilitychange", function () {

            if (document.hidden) {
                stopCarousel();
            } else {
                startCarousel();
            }

        });


        // Initialise carousel
        if (slides.length > 0) {

            showProject(0);
            startCarousel();

        }

        console.log("Project carousel initialised:", slides.length, "slides.");

    } else {

        console.error("Project carousel not found. Check the projectCarousel ID.");

    }


    // =========================================
    // 8. PROJECT HOVER EFFECT
    // =========================================

    const projectCards = document.querySelectorAll(".project-slide");

    projectCards.forEach(function (card) {

        const visual = card.querySelector(".carousel-visual");

        if (!visual) return;

        visual.addEventListener("mouseenter", function () {
            card.classList.add("project-hover");
        });

        visual.addEventListener("mouseleave", function () {
            card.classList.remove("project-hover");
        });

    });


    console.log("Portfolio interactions initialised successfully.");

});
