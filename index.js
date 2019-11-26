const compileResultTemplate = (weather) => {
    const template = Handlebars.compile(
        document.getElementById('template-result').innerHTML
    );
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    resultDiv.innerHTML = template(weather);
    return resultDiv;
};

const compileErrorTemplate = (errorMsg) => {
    const template = Handlebars.compile(
        document.getElementById('template-error').innerHTML
    );
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    resultDiv.innerHTML = template({error: errorMsg});
    return resultDiv;
};

const onSubmitHandler = async (e) => {
    e.preventDefault();
    await processQuery();
};

const processQuery = async () => {
    const city = document.getElementById("search-txt").value;
    const weatherJson = await weatherApiByCity(city);
    const view = document.getElementById('mainView');
    view.innerText = '';

    if (weatherJson.status === 'ok') {
        console.log(weatherJson);
        view.appendChild(compileResultTemplate(weatherJson.response));
    } else {
        view.appendChild(compileErrorTemplate(selectErrorMessage(weatherJson.response)));
    }
};

const selectErrorMessage = (responseJson) => {
    switch (responseJson.cod) {
        case "400":
            return "Задан пустой запрос";
        case "401":
            return "Неверный токен приложения";
        case "404":
            return "Город не найден";
        default:
            return "Неизвестная ошибка";
    }
};

const apiKey = "2e31b114bb5ba8f29f05fb811e28d76c";

const weatherApiByCity = (city) =>
    resolveToJson(
        apiFetch("q=" + city)
    );

const apiFetch = (searchString) =>
    axios.get(
        "https://api.openweathermap.org/data/2.5/weather?" + searchString + "&appid=" + apiKey,
    );

const resolveToJson = (weatherPromise) =>
    weatherPromise.then(
        async (response) => {
            console.log(response);
            if (response.statusText === 'OK') {
                return {status: "ok", response: repackData(response.data)}
            } else {
                return {status: "fail", response: response.data}
            }
        }
    ).catch(
        (e) => {
        }
    );

const repackData = (obj) => ({
    name: obj.name,
    country: obj.sys.country,
    temp: obj.main.temp,
    wind: {
        speed: obj.wind.speed,
        heading: obj.wind.deg
    },
    clouds: obj.weather[0].description,
    pressure: obj.main.pressure,
    humidity: obj.main.humidity,
    coords: {
        lat: obj.coord.lat,
        lon: obj.coord.lon
    },
    icon: obj.weather[0].icon
});

const example = () => ({
    "coord": {
        "lon": 37.62,
        "lat": 55.75
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 277.37,
        "pressure": 1017,
        "humidity": 86,
        "temp_min": 276.48,
        "temp_max": 278.15
    },
    "visibility": 10000,
    "wind": {
        "speed": 2,
        "deg": 240
    },
    "clouds": {
        "all": 0
    },
    "dt": 1569349865,
    "sys": {
        "type": 1,
        "id": 9029,
        "message": 0.0065,
        "country": "RU",
        "sunrise": 1569295059,
        "sunset": 1569338749
    },
    "timezone": 10800,
    "id": 524901,
    "name": "Moscow",
    "cod": 200
});

const correctRepacked = () => ({
    name: "Moscow",
    country: "RU",
    temp: 277.37,
    wind: {
        speed: 2,
        heading: 240
    },
    clouds: "clear sky",
    pressure: 1017,
    humidity: 86,
    coords: {
        lat: 55.75,
        lon: 37.62
    },
    icon: "01n"
});