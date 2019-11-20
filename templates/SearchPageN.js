function SearchPage(err) {
    this.render = function () {
        this.root = document.createElement('div');
        this.root.classList.add('search-page');
        this.root.innerHTML = "<div class='search-page-first-plane'>" +
            "   <div class='search-page-content'>" +
            "       <a href='/' class='logo'>Cloudy</a>" +
            "       <form class='controls-encapsulation'>" +
            "           <input type='text' class='cityName' placeholder='Type a city name'>" +
            "           <input type='submit' class='submit' value='Go'>" +
            "       </form>" +
            "       <div class='error-banner'>City not found</div>" +
            "   </div>" +
            "</div>";

        this.root.getElementsByTagName('form')[0].addEventListener('submit', this.onSubmit);
    };

    this.onSubmit = function (event) {
        event.preventDefault();
        let cityName = this.root.getElementsByClassName('cityName')[0];

        console.log("submit");
        // if (cityName.value !== "") {
        //     appController.processSearch(cityName.value);
        // } else {
        //     let controls = this.root.getElementsByClassName('cityName')[0];
        //     this.controls.classList.add('wrong');
        //     this.errorBanner.classList.add('active');
        //     setTimeout(() => {
        //         this.controls.classList.remove('wrong');
        //         this.errorBanner.classList.remove('active');
        //     }, 3000);
        // }

    };

    this.render();
}

// export class SearchPage extends HTMLElement {
//     constructor(err) {
//         if (!customElements.get('search-page'))
//             customElements.define('search-page', SearchPage);
//
//         super();
//         this.appendChild(
//             this.typeWriter = hs('div.typewriter-plane')
//         );
//         this.appendChild(
//             this.plane = hs('div.search-page-first-plane',
//                 this.content = hs('div.search-page-content',
//                     hs('a.logo', {href: '/index.html'}, 'Cloudy'),
//                     this.controls = hs('form.controls-encapsulation',
//                         {
//                             onsubmit: (e) => {
//                                 if (this.cityName.value !== "") {
//                                     appController.processSearch(this.cityName.value);
//                                 } else {
//                                     this.controls.classList.add('wrong');
//                                     this.errorBanner.classList.add('active');
//                                     setTimeout(() => {
//                                         this.controls.classList.remove('wrong');
//                                         this.errorBanner.classList.remove('active');
//                                     }, 3000);
//                                 }
//                                 e.preventDefault();
//                             }
//                         },
//                         this.cityName = hs('input.cityName', {
//                             type: 'text',
//                             placeholder: "Type a city name"
//                         }),
//                         this.submitButton = hs('input.submit', {type: "submit", value: "Go"}),
//                     ),
//                     this.errorBanner = hs('div.error-banner',
//                         'City not found')
//                 )
//             )
//         );
//
//         if (err !== undefined) {
//             this.cityName.value = err.city;
//             this.errorBanner.innerText = err.cause;
//
//             this.controls.classList.add('wrong');
//             this.errorBanner.classList.add('active');
//             setTimeout(() => {
//                 this.controls.classList.remove('wrong');
//                 this.errorBanner.classList.remove('active');
//             }, 5000);
//         }
//     }
//
//     dissolveAndRemove() {
//         this.classList.add('dissolve');
//         this.content.classList.add('blowup');
//         setTimeout(() => this.remove(), 3000);
//     }
//
//     remove() {
//         this.parentElement.removeChild(this);
//     }
// }
