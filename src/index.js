import {WaitPage} from "./templates/WaitPage";

const {SearchPage} = require('./templates/SearchPage.js');
require('./less/main.less');
require('./img/background.jpg');

const apikey = 'f816129477a56b6c0840aa37d1e18cdc';

export const appController = new (class AppController {
    constructor() {
        this._mainView = document.getElementById('mainView');
        this._mainView.appendChild(this.currentPage = new SearchPage());
    }

    processSearch(city) {
        const spinner = new WaitPage();
        this._mainView.appendChild(spinner);
        this.currentPage = spinner;
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey, {
            mode: 'cors'
        }).then(
            (response) => {
                spinner.dissolveAndRemove();
            },
            (e) => {
                console.log(e);
            }
        ).catch((e) => console.log(e));
    }
})();