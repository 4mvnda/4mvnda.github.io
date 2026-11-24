
/* =====================================================
   AMANDA'S PORTFOLIO
   Interactive JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. PRELOADER
    ========================================= */

    const preloader = document.getElementById("preloader");

    document.body.classList.add("loading");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("hide");
            }

            document.body.classList.remove("loading");
        }, 600);
    });


    /* =========================================
       2. AUTOMATIC FOOTER YEAR
    ========================================= */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================================
       3. NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar = document.getElementById("siteNavbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =========================================
       4. SCROLL REVEAL ANIMATIONS
    ========================================= */

    const revealElements = document.querySelectorAll("[data-reveal]");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    /* =========================================
       5. PROJECT CATEGORY FILTER
    ========================================= */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Remove active state from every button
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Activate clicked button
            button.classList.add("active");

            const selectedCategory = button.dataset.filter;

            projectItems.forEach(project => {

                const projectCategory = project.dataset.category;

                const shouldShow =
                    selectedCategory === "all" ||
                    selectedCategory === projectCategory;

                if (shouldShow) {

                    project.classList.remove("hide");

                    const card = project.querySelector("[data-reveal]");

                    if (card) {
                        card.classList.add("revealed");
                    }

                } else {

                    project.classList.add("hide");

                }

            });

        });

    });


    /* =========================================
       6. MOBILE NAVIGATION AUTO-CLOSE
    ========================================= */

    const navbarContent = document.getElementById("navbarContent");

    const navbarLinks = document.querySelectorAll(
        "#navbarContent .nav-link, #navbarContent .nav-contact"
    );

    navbarLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (
                window.innerWidth < 992 &&
                navbarContent &&
                navbarContent.classList.contains("show")
            ) {

                const collapse = bootstrap.Collapse.getOrCreateInstance(
                    navbarContent
                );

                collapse.hide();

            }

        });

    });


    /* =========================================
       7. ACTIVE NAVIGATION HIGHLIGHT
    ========================================= */

    const sections = document.querySelectorAll("main section[id]");

    const navLinks = document.querySelectorAll(
        ".site-navbar .nav-link"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const sectionId = entry.target.id;

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") === `#${sectionId}`
                            ) {

                                link.classList.add("active");

                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =========================================
       8. BACK TO TOP BUTTON
    ========================================= */

    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 450) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener("scroll", updateBackToTop);

    updateBackToTop();

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       9. CLOSE MOBILE MENU WHEN RESIZING
    ========================================= */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth >= 992 &&
            navbarContent &&
            navbarContent.classList.contains("show")
        ) {

            const collapse = bootstrap.Collapse.getOrCreateInstance(
                navbarContent
            );

            collapse.hide();

        }

    });


    /* =========================================
       10. CONSOLE MESSAGE
    ========================================= */

    console.log(
        "%cWelcome to Amanda's Portfolio!",
        "color: #C99D98; font-size: 18px; font-weight: bold;"
    );

    console.log(
        "Designed with creativity and built with curiosity."
    );

});
