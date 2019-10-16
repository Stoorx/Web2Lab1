import {WaitPage} from "./templates/WaitPage";
import {SearchPage} from "./templates/SearchPage";
import {ResultsPage} from "./templates/ResultsPage";

const queryString = require('query-string');

require('./less/main.less');
//require('./img/background.jpg');

const apikey = 'f816129477a56b6c0840aa37d1e18cdc';

export const appController = new (class AppController {
    constructor() {
        this._mainView = document.getElementById('mainView');
        // const spinner = new WaitPage();
        // this._mainView.appendChild(spinner);
        // return;
        const searchArgs = queryString.parse(location.search);

        if (searchArgs.text !== undefined) {
            this.processSearch(searchArgs.text);
        } else {
            this._mainView.appendChild(this.currentPage = new SearchPage());
        }
    }

    processSearch(city) {
        if (this.currentPage !== undefined)
            this.currentPage.dissolveAndRemove();
        const spinner = new WaitPage();
        this._mainView.appendChild(spinner);
        this.currentPage = spinner;
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey, {
            mode: 'cors'
        }).then(
            (response) => {
                if (response.ok) {
                    response.json().then(
                        (json) => {
                            const resPage = new ResultsPage(json);
                            this.currentPage.dissolveAndRemove();
                            this._mainView.appendChild(resPage);
                            this.currentPage = resPage;
                        }
                    );
                } else {
                    this.currentPage.remove();
                    this.currentPage = new SearchPage({city: city, cause: "City not found"});
                    this._mainView.appendChild(this.currentPage);
                }
            },
            (e) => {
                console.log(e);
            }
        );
    }
})();
