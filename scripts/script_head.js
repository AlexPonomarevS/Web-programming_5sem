document.addEventListener("DOMContentLoaded", function () {
    const currentUrl = document.location.href;
    const menuItems = document.querySelectorAll('.header__menu__ul__elem-a');
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentUrl) {
            item.classList.add('active');
        }
    });
});