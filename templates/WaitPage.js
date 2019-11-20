const hs = require('hyperscript');
const spinner = require('../img/spinner.svg');

export class WaitPage extends HTMLElement {
    constructor() {
        if (!customElements.get('wait-page'))
            customElements.define('wait-page', WaitPage);

        super();
        this.appendChild(
            this.root = hs('div.wait-page-content',
                hs('div', {innerHTML: spinner})
            )
        );
    }

    dissolveAndRemove() {
        this.classList.add('dissolve');
        setTimeout(() => this.remove(), 3000);
    }

    remove() {
        this.parentElement.removeChild(this);
    }
}