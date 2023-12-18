document.addEventListener('DOMContentLoaded', async function() {
    let flag = false;
    const limit = 4;
    const refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', function() {
        flag = !flag;
        refreshData(flag, limit);
        toastr.info('Данные обновлены!', 'Успех');
    })
    await refreshData(flag, limit);
});

async function refreshData(firstCall, limit) {
    const preloader = document.getElementById('preloader');
    const errPlace = document.createElement('div');
    let url = 'https://jsonplaceholder.typicode.com/users';
    if (firstCall) {
        const randomStart = Math.floor(Math.random() * 7);
        url += `?_start=${randomStart}&_limit=7`;
    } else {
        url += `?_start=7&_limit=7`;
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
        errPlace.textContent = '⚠ Что-то пошло не так';
        document.getElementById('staffList').appendChild(errPlace);
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