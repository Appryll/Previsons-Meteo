window.addEventListener("load", function () {
    // *** zoom carte france ville ***
    //get image + size
    let container = document.getElementById('zoom-carte'),
        imgsrc = container.currentStyle || window.getComputedStyle(container, false);
    imgsrc = imgsrc.backgroundImage.slice(4, -1).replace(/"/g, ""),
        img = new Image();

    //charger image + zoom 
    img.src = imgsrc;
    img.onload = function () {
        let imgWidht = img.naturalWidth,
            imgHeight = img.naturalHeight,
            ratio = imgWidht / imgHeight,
            porcentage = ratio * 100 + "%";

        //zoom sur le mouvement de la souris
        container.onmousemove = function (e) {
            let boxWidth = container.clientWidth,
                xPos = e.pageX - this.offsetLeft,
                yPos = e.pageY - this.offsetTop,
                xPorcent = xPos / (boxWidth / 100) + "%",
                yPorcent = yPos / (boxWidth * ratio / 100) + "%";

            Object.assign(container.style, {
                backgroundPosition: xPorcent + "" + yPorcent,
                backgroundSize: imgWidht + "px"
            });
        };
    };

    //revenir sur mouse leave
    container.onmouseleave = function (e) {
        Object.assign(container.style, {
            backgroundPosition: "center",
            backgroundSize: "cover"
        });
    };

    // *** Appel à l'API poenWeather avec ville en parametre de fonction ***
    const APIKEY = '351fe6a03e2ec53760bdf40301a77bc9';

    let apiCall = function (city) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`;
        fetch(url).then((response) =>
            response.json().then((data) => {
                console.log(data);
                console.log(data.cod);
                if (data.cod == '200') {
                    document.querySelector('#city').innerHTML = data.name;
                    document.querySelector('#temp').innerHTML = data.main.temp + '°<span>C</span>';
                    document.querySelector('#temp-max').innerHTML = data.main.temp_max + '°<span>C</span>';
                    document.querySelector('#temp-min').innerHTML = data.main.temp_min + '°<span>C</span>';
                    document.querySelector('#humidity').innerHTML = data.main.humidity + '<span>%</span>';
                    document.querySelector('#weather-desc').innerHTML = data.weather[0].description;
                    document.querySelector('#wind-spead').innerHTML = data.wind.speed + '<span>km/h</span>';
                    document.querySelector('#weather-img').src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                }
                else {
                    window.alert("La ville saisie est invalide");
                }
            })
        ).catch(err => console.log('Error : ' + err));
    }

    // Ecouter d'evenement sur la soumission du formulaire
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        let ville = document.querySelector('#inputCity').value.toLowerCase();
        const small = document.querySelector('#inputHelp')

        // validation formulaire
        let pattern = /^[a-zà-ü'\s]*$/;

        if (ville.length == 0) {
            small.innerHTML = "Veuillez bien remplir le champ";
            small.setAttribute('class', 'form-text text-danger mx-1');
        }

        else if (!pattern.test(ville)) {
            small.innerHTML = "Seules les lettres et les apostrophes sont autorisées";
            small.setAttribute('class', 'form-text text-danger mx-1');
        }

        else {
            apiCall(ville);
            document.getElementById('inputCity').value = "";
            small.innerHTML = "Renseigner une nouvelle ville pour effectuer une nouvelle recherche";
            small.setAttribute('class', 'form-text text-success mx-1');
        }
    });

    //ville recherchée par défaut
    apiCall('Paris');
});