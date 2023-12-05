document.addEventListener('DOMContentLoaded', function () {
    const wishesForm = document.getElementById('wishesForm');
    const wishesInput = document.getElementById('wishesInput');
    const wishesList = document.getElementById('wishesList');

    let savedWishes = JSON.parse(localStorage.getItem('wishes')) || [];

    function updateLocalStorage() {
        localStorage.setItem('wishes', JSON.stringify(savedWishes));
    }

    function createWishesItem(wishesText) {
        const template = document.getElementById('wishesItemTemplate');
        const wishesItem = document.importNode(template.content, true);

        const li = wishesItem.querySelector('.li_wish');
        const deleteButton = wishesItem.querySelector('.delete_button');

        li.textContent = wishesText;
        deleteButton.addEventListener('click', function () {
            li.remove();
            deleteButton.remove();
            savedWishes = savedWishes.filter(item => item !== wishesText);
            updateLocalStorage();
        });

        wishesList.appendChild(wishesItem);
    }

    savedWishes.forEach(wishes => {
        createWishesItem(wishes);
    });

    wishesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const wishesText = wishesInput.value.trim();
        if (wishesText !== '') {
            createWishesItem(wishesText);
            savedWishes.push(wishesText);
            updateLocalStorage();
            wishesInput.value = '';
        }
    });
});