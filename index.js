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
    const city = document.getElementById("search-txt").value;
    const weatherJson = await weatherApiByCity(city);
    const view = document.getElementById('mainView');
    view.innerText = '';

    if (weatherJson.status === 'ok') {
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
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?" + searchString + "&appid=" + apiKey,
        {
            mode: 'cors',
            method: 'GET'
        }
    );

const resolveToJson = (weatherPromise) =>
    weatherPromise.then(
        (response) => {
            return response;
        },
        (e) => {
            console.log(e);
        }
    ).then(
        async (response) => {
            let json = await response.json().then((json) => {
                return json;
            });
            if (response.ok) {
                return {status: "ok", response: repackData(json)}
            } else {
                return {status: "fail", response: json}
            }
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

