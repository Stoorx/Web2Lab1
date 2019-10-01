const hs = require('hyperscript');

export class ResultsPage extends HTMLElement {
    constructor(weatherJson) {
        if (!customElements.get('results-page'))
            customElements.define('results-page', ResultsPage);

        super();

        this.weatherJson = weatherJson;

        this.appendChild(
            this.root = hs('div.root',
                hs('div.upper-menu',
                    hs('a.logo', {href: '/'}, 'Cloudy'),
                ),
                hs('div.main-info.tile',
                    hs('div.city-name-cont',
                        hs('div.city-name', weatherJson.name + ', ' + weatherJson.sys.country),
                        hs('img.weather-icon', {src: "http://openweathermap.org/img/wn/" + weatherJson.weather[0].icon + ".png"})
                    ),
                    hs('div.temp',
                        hs('div.curr-temp', Math.round(weatherJson.main.temp - 273.15) + "°"),
                        hs('div.temp-bound',
                            hs('div.up-temp', Math.round(weatherJson.main.temp_max - 273.15) + "°"),
                            hs('div.low-temp', Math.round(weatherJson.main.temp_min - 273.15) + "°")
                        ),
                    ),
                    // hs('div.daylight',
                    //     hs('div.sunrise',
                    //         ResultsPage.__toDate(weatherJson.sys.sunrise)
                    //     ),
                    //     hs('div.progress',
                    //         hs('div.progress-fill',
                    //             {
                    //                 width: (((weatherJson.dt - weatherJson.sys.sunrise) /
                    //                     (weatherJson.sys.sunset - weatherJson.sys.sunrise)) * 100 + "%")
                    //             }
                    //         )
                    //     ),
                    //     hs('div.sunset',
                    //         ResultsPage.__toDate(weatherJson.sys.sunset)
                    //     )
                    // ),
                ),
                hs('div.more-info.tile',
                    hs('div.weather-desc',
                        weatherJson.weather[0].main
                    )
                ),
                hs('div.map.tile',
                )
            )
        );

    }

    dissolveAndRemove() {
        this.classList.add('dissolve');
        this.content.classList.add('blowup');
        setTimeout(() => this.remove(), 10000);
    }

    static __toDate(unix) {
        let date = new Date(unix * 1000);
        return date.toLocaleTimeString();
    }

    remove() {
        clearInterval(this.typewriterSpawnInterval);
        this.parentElement.removeChild(this);
    }
}
