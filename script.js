document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getData = data => {
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }
        });
    };

    const errorData = () => {
        output.innerHTML = 'Произошла ошибка';
    };

    const createRequest = () => {
        const request = new XMLHttpRequest();
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-type', 'application/json');

        request.addEventListener('readystatechange', () => {
            return new Promise((resolve, reject) => {
                if (request.readyState === 4 && request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                } else {
                    reject();
                }
            }).then(getData).catch(errorData);
        });

        request.send();
    };

    select.addEventListener('change', createRequest);
});
