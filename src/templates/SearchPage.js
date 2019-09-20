const hs = require('hyperscript');
import {appController} from './../index.js';
import {BlowupTypewriter} from "./BlowupTypewriter.js";
import cities from 'cities.json';

export class SearchPage extends HTMLElement {
    constructor() {
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
                    this.controls = hs('div.controls-encapsulation',
                        this.cityName = hs('input.cityName', {
                            type: 'text',
                            placeholder: "Type a city name",
                            onkeyup: (event) => {
                                if (event.key === "Enter") {
                                    this.submitButton.click();
                                }
                            }
                        }),
                        this.submitButton = hs('button.submit', {
                            onclick: () => {
                                if (this.cityName.value.match(/^[^+*/=_&?^:;'"|\\%$#@!\[\]{}`~.,<>№\s0-9]+$/i)) {
                                    appController.processSearch(this.cityName.value);
                                } else {
                                    this.controls.classList.add('wrong');
                                    setTimeout(() => this.controls.classList.remove('wrong'), 3000);
                                }
                            }
                        }, "Go")
                    )
                )
            )
        );

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
