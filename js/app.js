// Appel à l'API poenWeather avec ville en parametre de fonction
const APIKEY = '351fe6a03e2ec53760bdf40301a77bc9';

let apiCall = function (city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`;
    fetch(url).then((response) =>
        response.json().then((data) => {
            console.log(data);
            document.querySelector('#city').innerHTML = data.name;
            document.querySelector('#temp').innerHTML = data.main.temp + '°<span>C</span>';
            document.querySelector('#temp-max').innerHTML = data.main.temp_max + '°<span>C</span>';
            document.querySelector('#temp-min').innerHTML = data.main.temp_min + '°<span>C</span>';
            document.querySelector('#humidity').innerHTML = data.main.humidity + '<span>%</span>';
            document.querySelector('#weather-desc').innerHTML = data.weather[0].description;
            document.querySelector('#wind-spead').innerHTML = data.wind.speed + '<span>km/h</span>';
            document.querySelector('#weather-img').src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        })
    ).catch(err => console.log('Error : ' + err)); //ver como psar error
}

// Ecouter d'evenement sur la soumission du formulaire

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    let ville = document.querySelector('#inputCity').value;

    const small = document.querySelector('#inputHelp')
    // validation formulaire
    // Le pattern à vérifier (i=(case-insensitive))
    const pattern = new RegExp('^[A-Z]+$', 'i');

    if (ville.length == 0) {
        small.innerHTML = "Veuillez bien remplir le champ";
        small.setAttribute('class', 'form-text text-danger mx-1');
    }

    else if (!pattern.test(ville)) {
        small.innerHTML = "Seules les lettres sont autorisées";
        small.setAttribute('class', 'form-text text-danger mx-1');
    }

    else {
        apiCall(ville);
        document.getElementById('inputCity').value = "";
        small.innerHTML = "Renseigner une nouvelle ville pour effectuer une nouvelle recherche";
        small.setAttribute('class', 'form-text text-success mx-1');
    }

});

//ville par défaut
apiCall('Paris');