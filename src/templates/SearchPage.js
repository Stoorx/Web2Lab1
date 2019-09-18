const hs = require('hyperscript');

export class SearchPage extends HTMLElement {
    constructor() {
        if (!customElements.get('search-page'))
            customElements.define('search-page', SearchPage);

        super();
        this.appendChild(
            hs('div.search-page',
                this.cityName = hs('input.cityName', {type: 'text', placeholder: "Type a city name"}),
                this.submitButton = hs('button.submit', "Go")
            )
        );
    }
}