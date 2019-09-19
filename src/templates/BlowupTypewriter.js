const hs = require('hyperscript');

export class BlowupTypewriter extends HTMLElement {
    constructor(word, startCoords) {
        if (!customElements.get('blowup-typewriter'))
            customElements.define('blowup-typewriter', BlowupTypewriter);

        super();
        this.word = word;

        this.appendChild(
            this.root = hs('div.word-container')
        );

        this.style.top = startCoords.y.toString() + 'px';
        this.style.left = startCoords.x.toString() + 'px';
        setTimeout(() => {
            this.classList.add('tw-blowup');
        }, 0);

        this.interval = setInterval(() => {
            if (this.word.length !== 0) {
                this.root.innerText += this.word.charAt(0);
                this.word = this.word.slice(1);
            }
            else {
                clearInterval(this.interval);
                this.dissolveAndRemove();
            }
        }, 256);

    }

    dissolveAndRemove() {
        this.root.classList.add('tw-dissolve');
        setTimeout(() => this.remove(), 10000);
    }

    remove() {
        this.parentElement.removeChild(this);
    }
}