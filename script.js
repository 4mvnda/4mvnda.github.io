
/* =========================================
   AMANDA'S PORTFOLIO - INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. AUTOMATIC FOOTER YEAR
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 2. PROJECT CATEGORY FILTERS
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            // Update active filter button
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const selectedCategory = button.dataset.filter;

            // Show or hide projects
            projectItems.forEach(project => {
                const projectCategory = project.dataset.category;

                if (
                    selectedCategory === "all" ||
                    selectedCategory === projectCategory
                ) {
                    project.classList.remove("hide");
                } else {
                    project.classList.add("hide");
                }
            });

        });
    });


    // 3. SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // 4. BACK TO TOP BUTTON
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {
                backToTop.style.display = "flex";
                backToTop.style.alignItems = "center";
                backToTop.style.justifyContent = "center";
            } else {
                backToTop.style.display = "none";
            }

        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

    }


    // 5. MOBILE NAVIGATION AUTO-CLOSE
    const navbarLinks = document.querySelectorAll(
        "#mainNavbar .nav-link"
    );

    const navbarCollapse = document.getElementById("mainNavbar");

    navbarLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (
                window.innerWidth < 992 &&
                navbarCollapse.classList.contains("show")
            ) {
                bootstrap.Collapse
                    .getOrCreateInstance(navbarCollapse)
                    .hide();
            }

        });

    });


    // 6. ACTIVE NAVIGATION LINK
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar .nav-link");

    const sectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");

                navLinks.forEach(link => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });

            }

        });

    }, {
        rootMargin: "-35% 0px -55% 0px"
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});
