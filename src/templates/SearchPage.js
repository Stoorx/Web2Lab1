const hs = require('hyperscript');
import {appController} from './../index.js';

export class SearchPage extends HTMLElement {
    constructor() {
        if (!customElements.get('search-page'))
            customElements.define('search-page', SearchPage);

        super();
        this.appendChild(
            this.root = hs('div.search-page-content',
                this.cityName = hs('input.cityName', {type: 'text', placeholder: "Type a city name"}),
                this.submitButton = hs('button.submit', {
                    onclick: () => {
                        this.classList.add('dissolve');
                        appController.processSearch(this.cityName.value);
                        setTimeout(() => this.remove(), 3000);
                    }
                }, "Go")
            )
        );
    }

    remove() {
        this.parentElement.removeChild(this);
    }
}