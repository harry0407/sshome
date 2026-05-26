// Language switching
let currentLang = 'zh';

function switchLang(lang) {
    currentLang = lang;

    // Update buttons
    document.getElementById('btn-zh').classList.toggle('active', lang === 'zh');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');

    // Update all elements with data-zh/data-en
    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });

    // Update html lang
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // Update placeholders
    document.querySelectorAll('[data-' + lang + '-placeholder]').forEach(el => {
        el.placeholder = el.getAttribute('data-' + lang + '-placeholder');
    });

    // Update select options
    document.querySelectorAll('select option[data-' + lang + ']').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });

    // Save preference
    localStorage.setItem('lang', lang);
}

// Mobile menu
function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
}

// Form submission
function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // Log form data (replace with actual submission)
    console.log('Form submitted:', Object.fromEntries(data));

    // Show success message
    form.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';

    // Reset after 3 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        document.getElementById('formSuccess').style.display = 'none';
    }, 3000);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero Carousel
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let current = 0;
    let timer;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = index;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function next() {
        goTo((current + 1) % slides.length);
    }

    function startAuto() {
        timer = setInterval(next, 5000);
    }

    function stopAuto() {
        clearInterval(timer);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAuto();
            goTo(parseInt(dot.dataset.index));
            startAuto();
        });
    });

    startAuto();
}

// Load saved language preference
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        switchLang(savedLang);
    }
    initHeroCarousel();
});
