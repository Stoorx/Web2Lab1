const hs = require('hyperscript');

export class ResultsPage extends HTMLElement {
    constructor(weatherJson) {
        if (!customElements.get('results-page'))
            customElements.define('results-page', ResultsPage);

        super();

        this.weatherJson = weatherJson;

        this.appendChild(
            this.root = hs('div', 'Results: ' + weatherJson.toString())
        );

    }

    dissolveAndRemove() {
        this.classList.add('dissolve');
        this.content.classList.add('blowup');
        setTimeout(() => this.remove(), 10000);
    }

    remove() {
        clearInterval(this.typewriterSpawnInterval);
        this.parentElement.removeChild(this);
    }
}
