document.addEventListener('DOMContentLoaded', async function() {
    let flag = false;
    const limit = 4;
    const refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', function() {
        flag = !flag;
        updateRequest(flag, limit);
    })
    await updateRequest(flag, limit);
});

async function updateRequest(firstCall, limit) {
    const preloader = document.getElementById('preloader');
    const errorPlaceholder = document.createElement('div');
    let url = 'https://jsonplaceholder.typicode.com/users';
    if (firstCall) {
        const limit = 7;
        const randomStart = Math.floor(Math.random() * limit);
        url += `?_start=${randomStart}&_limit=${limit}`;
    } else {
        url += `?_start=${limit}&_limit=${limit}`;
    }
    try {
        preloader.style.display = 'block';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('ERROR');
        }
        const staffList = await response.json();
        console.log('Данные:', staffList);
        renderUsers(staffList);
        preloader.style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
        preloader.style.display = 'none';
        errorPlaceholder.textContent = '⚠ Что-то пошло не так';
        document.getElementById('staffList').appendChild(errorPlaceholder);
    }
}

function renderUsers(staffList) {
    const staffListElement = document.getElementById('staffList');
    staffListElement.innerHTML = '';
    const template = document.getElementById('staffTemplate');
    staffList.forEach(user => {
        const userElement = document.importNode(template.content, true);
        userElement.querySelector('.email').textContent = 'Email: ' + user.email;
        userElement.querySelector('.name').textContent = 'Name: ' + user.name;
        userElement.querySelector('.phone').textContent = 'Phone: ' + user.phone;
        staffListElement.appendChild(userElement);
    });
}