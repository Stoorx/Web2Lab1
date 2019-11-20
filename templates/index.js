function require(path) {
    let e = document.createElement('script');
    e.src = path;
    document.body.appendChild(e);
}


//require("./templates/WaitPage.js");
require("./SearchPageN.js");
//require("./templates/ResultsPage.js");

const apikey = 'f816129477a56b6c0840aa37d1e18cdc';

function AppController() {
    this._mainView = document.getElementById('mainView');
    this._mainView.appendChild(this.currentPage = new SearchPage().root);

    this.processSearch = function (city) {
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
}

var appController = new AppController();