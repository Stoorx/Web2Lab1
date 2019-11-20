const hs = require('hyperscript');

export class PopupMessage extends HTMLElement {
    constructor(message) {
        if (!customElements.get('popup-message'))
            customElements.define('popup-message', PopupMessage);

        super();
        this.message = message;

        this.appendChild(
            this.root = hs('div.message-container', this.message)
        );

        setTimeout(()=> this.dissolveAndRemove(), 5000);
    }

    dissolveAndRemove() {
        this.classList.add('dissolve');
        setTimeout(() => this.remove(), 1500);
    }

    remove() {
        this.parentElement.removeChild(this);
    }
}