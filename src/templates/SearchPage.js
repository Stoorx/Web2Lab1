const hs = require('hyperscript');
import {appController} from './../index.js';
import {BlowupTypewriter} from "./BlowupTypewriter.js";
import cities from 'cities.json';

export class SearchPage extends HTMLElement {
    constructor(err) {
        if (!customElements.get('search-page'))
            customElements.define('search-page', SearchPage);

        super();
        this.appendChild(
            this.typeWriter = hs('div.typewriter-plane')
        );
        this.appendChild(
            this.plane = hs('div.search-page-first-plane',
                this.content = hs('div.search-page-content',
                    hs('a.logo', {href: '/index.html'}, 'Cloudy'),
                    this.controls = hs('form.controls-encapsulation',
                        {
                            onsubmit: (e) => {
                                if (this.cityName.value !== "") {
                                    appController.processSearch(this.cityName.value);
                                } else {
                                    this.controls.classList.add('wrong');
                                    this.errorBanner.classList.add('active');
                                    setTimeout(() => {
                                        this.controls.classList.remove('wrong');
                                        this.errorBanner.classList.remove('active');
                                    }, 3000);
                                }
                                e.preventDefault();
                            }
                        },
                        this.cityName = hs('input.cityName', {
                            type: 'text',
                            placeholder: "Type a city name"
                        }),
                        this.submitButton = hs('input.submit', {type: "submit", value: "Go"}),
                    ),
                    this.errorBanner = hs('div.error-banner',
                        'City not found')
                )
            )
        );

        if (err !== undefined) {
            this.cityName.value = err.city;
            this.errorBanner.innerText = err.cause;

            this.controls.classList.add('wrong');
            this.errorBanner.classList.add('active');
            setTimeout(() => {
                this.controls.classList.remove('wrong');
                this.errorBanner.classList.remove('active');
            }, 5000);
        }
        this.typewriterSpawnInterval = setInterval(() => {
            let city = cities[(Math.random() * cities.length) | 0];
            this.typeWriter.appendChild(new BlowupTypewriter(city.name, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            }));
        }, 512);
    }

    dissolveAndRemove() {
        this.classList.add('dissolve');
        this.content.classList.add('blowup');
        setTimeout(() => this.remove(), 3000);
    }

    remove() {
        clearInterval(this.typewriterSpawnInterval);
        this.parentElement.removeChild(this);
    }
}
