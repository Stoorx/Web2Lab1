const hs = require('hyperscript');

export class SearchPage extends HTMLElement {
    constructor() {
        super();
        this.tagName = 'search-page';
        this.appendChild(
            hs('div#sp',
                'hello'
            )
        );
    }
}