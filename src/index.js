import {WaitPage} from "./templates/WaitPage";
import {SearchPage} from "./templates/SearchPage";
import {ResultsPage} from "./templates/ResultsPage";

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
        this.currentPage.dissolveAndRemove();
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
                        }
                    );
                } else {
                    spinner.dissolveAndRemove(); // TODO: Error handling
                }
            },
            (e) => {
                console.log(e);
            }
        );
    }
})();
