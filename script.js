/* ============================
   HAMBURGER MENU TOGGLE
============================ */
(function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    // Create backdrop overlay dynamically
    const backdrop = document.createElement('div');
    backdrop.classList.add('menu-backdrop');
    document.body.appendChild(backdrop);

    function openMenu() {
        hamburger.classList.add('open');
        navLinks.classList.add('open');
        backdrop.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        backdrop.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', function () {
        if (hamburger.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close on backdrop click
    backdrop.addEventListener('click', closeMenu);

    // Close when a nav link is clicked (smooth scroll + close)
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();

            // Update active link
            navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && hamburger.classList.contains('open')) {
            closeMenu();
        }
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const links    = navLinks.querySelectorAll('a[href^="#"]');

    window.addEventListener('scroll', function () {
        let scrollY = window.scrollY + 100;
        sections.forEach(function (section) {
            if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                links.forEach(a => a.classList.remove('active'));
                const matching = navLinks.querySelector('a[href="#' + section.id + '"]');
                if (matching) matching.classList.add('active');
            }
        });
    }, { passive: true });
})();


/* ============================
   FAQ ACCORDION
============================ */
function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const icon   = element.querySelector('i');
    const isOpen = element.classList.contains('active');

    // Close all open items
    document.querySelectorAll('.faq-question.active').forEach(function (q) {
        q.classList.remove('active');
        q.nextElementSibling.style.maxHeight = null;
        const i = q.querySelector('i');
        if (i) {
            i.classList.remove('fa-minus');
            i.classList.add('fa-plus');
        }
    });

    // If it wasn't open, open it
    if (!isOpen) {
        element.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        }
    }
}


/* ============================
   SUBSCRIPTION TOGGLE
============================ */
(function () {
    const monthBtn = document.getElementById('month');
    const yearBtn  = document.getElementById('year');
    const prices   = document.querySelectorAll('.price');
    const periods  = document.querySelectorAll('.per-period');

    const monthlyPrices = ['$9.99', '$12.99', '$14.99'];
    const yearlyPrices  = ['$7.99', '$10.99', '$12.99'];

    if (!monthBtn || !yearBtn) return;

    function setToggle(mode) {
        if (mode === 'monthly') {
            monthBtn.classList.add('active');
            yearBtn.classList.remove('active');
            prices.forEach((el, i) => el.textContent = monthlyPrices[i] || el.textContent);
            periods.forEach(el => el.textContent = '/month');
        } else {
            yearBtn.classList.add('active');
            monthBtn.classList.remove('active');
            prices.forEach((el, i) => el.textContent = yearlyPrices[i] || el.textContent);
            periods.forEach(el => el.textContent = '/year');
        }
    }

    // Default: monthly active
    setToggle('monthly');

    monthBtn.closest('.sub-toggle').addEventListener('click', function () {
        if (monthBtn.classList.contains('active')) {
            setToggle('yearly');
        } else {
            setToggle('monthly');
        }
    });
})();
