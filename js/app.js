// Appel à l'API poenWeather avec ville en parametre de fonction
const APIKEY = '351fe6a03e2ec53760bdf40301a77bc9';

let apiCall = function (city){

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`;
    fetch(url).then((response) =>
    response.json().then((data) => {
        console.log(data);
        document.querySelector('#city').innerHTML = data.name;
        document.querySelector('#temp').innerHTML = data.main.temp;
        document.querySelector('#humidity').innerHTML = data.main.humidity;
        document.querySelector('#weather-desc').innerHTML = data.weather[0].description;
        document.querySelector('#wind-spead').innerHTML = data.wind.speed;
        let weatherSrc = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        $('#weather-img').attr('src', weatherSrc); 

    })
).catch(err => console.log('Error : ' + err)); //ver como psar error

}

// Ecouter d'evenement sur la soumission du formulaire
    
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let ville = document.querySelector('#inputCity').value;
    //remplie et aue de letres y si es incorrecto
    
    const small = document.querySelector('#inputHelp')

    if(ville.length == 0) {
        small.innerHTML = "Veuillez bien remplir le champ";
        small.setAttribute('class', 'form-text text-danger mx-1');
        return;
        // alert('No has escrito nada en el usuario');
        // return;
    }
    else{
        apiCall(ville);
        document.getElementById('inputCity').value ="";
        small.innerHTML = "Renseigner une nouvelle ville pour effectuer une nouvelle recherche"; 
        small.setAttribute('class', 'form-text text-success mx-1');
    }
    
});

apiCall('Paris');




