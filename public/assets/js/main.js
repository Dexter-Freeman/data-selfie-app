document.addEventListener('DOMContentLoaded', () => {
    // спаны для отображения координат на странице
    const lat_span = document.getElementById('lat');
    const lon_span = document.getElementById('lon');

    // урл апишки
    const GEO_API_URL = '/api/geo';

    // кнопка запроса координат
    const getGeoBtn = document.getElementById('get-geo');

    // функция для обработки успешного получения координат
    async function success(position) {
        // получили данные через navigator.geolocation.getCurrentPosition
        console.log(position);

        // сохраняем широту и долготу в отдельные константы
        const latitude = await position.coords.latitude;
        const longitude = await position.coords.longitude;

        // готовим данные для отправки серверу
        const data = { latitude, longitude };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        };

        // send data to the server
        fetch(GEO_API_URL, options)
            .then(res => res.json())
            .then(data => {
                // после получения данных от сервера
                // широту и долготу записываем в свои места на странице
                lat_span.textContent = data.latitude;
                lon_span.textContent = data.longitude;
            })
            .catch(err => console.error(err));
    }

    // необязательная функция для обработки ошибок в navigator.geolocation.getCurrentPosition
    function err(e) {
        console.log('something went wrong...');
        console.error(e);
    }


    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        getGeoBtn.addEventListener('click', e => {
            setTimeout(() => {
                console.log('Locating…');
                navigator.geolocation.getCurrentPosition(success, err)
            }, 0);
        });
    }
    
});