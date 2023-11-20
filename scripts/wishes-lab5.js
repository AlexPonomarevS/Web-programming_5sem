document.addEventListener('DOMContentLoaded', function() {
    const wishesForm = document.getElementById('wishesForm');
    const wishesInput = document.getElementById('wishesInput');
    const wishesList = document.getElementById('wishesList');

    let savedWishes = JSON.parse(localStorage.getItem('wishes')) || [];

    function updateLocalStorage() {
        localStorage.setItem('wishes', JSON.stringify(savedWishes));
    }

    function createWishesItem(wishesText) {
        const wishesItem = document.createElement('li');
        wishesItem.classList.add('li_wish');
        wishesItem.textContent = wishesText;
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete_button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            wishesItem.remove();
            savedWishes = savedWishes.filter(item => item !== wishesText);
            updateLocalStorage();
        });
        wishesItem.appendChild(deleteButton);
        wishesList.appendChild(wishesItem);
    }

    savedWishes.forEach(wishes => {
        createWishesItem(wishes);
    });

    wishesForm.addEventListener('submit', function(event) {
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