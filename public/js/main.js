// active nav
const links = document.querySelectorAll('.nav__links a');
links.forEach(link => {
    if (link.href === window.location.href) {
        link.style.color = 'var(--accent)';
    }
});

// mobile burger
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
}

// console easter egg
console.log('%cfrionode.online', 'color:#00ff88;font-size:20px;font-weight:bold;');
console.log('%cbuilding in public. nakuru, kenya.', 'color:#666;font-size:12px;');
console.log('%csource: https://github.com/frionode', 'color:#666;font-size:12px;');
