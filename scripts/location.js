
let lat, long;
const countryAndCity = document.getElementById("country_and_city");
const currentTemp = document.getElementById("current_temp");
const weatherIcon = document.getElementById("weather_icon");
const celciusOrFahrenheit = document.getElementById("celcius_or_fahrenheit");
const body = document.querySelector("body");
const weatherDescription = document.getElementById("weather_description");

//Get geolocation information
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    //Get json from weather api
  var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=imperial&appid=80f939bd48e26b2db23cfa5e55223a66";

  fetch(api)
  .then((resp) => resp.json())
  .then(function(data) {
    
    const tempFahrenheit = Math.ceil(data.main.temp);
    const tempCelcius = Math.floor((tempFahrenheit - 32) / 1.8);
    const skyDescription = data.weather[0].description;
    const capitalSkyDescription = skyDescription.charAt(0).toUpperCase() + skyDescription.slice(1);
    const country = data.sys.country;
    const city = data.name;
    const id = data.weather[0].id;

    countryAndCity.innerHTML = country + "," + " " + city
    weatherDescription.innerHTML = capitalSkyDescription;
    //set temp to fahrenheit by default
    celciusOrFahrenheit.textContent = "F";
    current_temp.innerHTML = tempFahrenheit + "&deg;" + " ";

    //add functionality to toggle between Fahrenheit
    //and Celcius
   celciusOrFahrenheit.addEventListener("click", function() {
     if (celciusOrFahrenheit.textContent === "F") {
       celciusOrFahrenheit.textContent = "C";
       currentTemp.innerHTML = tempCelcius + "&deg;" + " ";
     } else {
       celciusOrFahrenheit.textContent = "F";
       current_temp.innerHTML = tempFahrenheit + "&deg;" + " ";
     }
   })

   //change background image per weather id
   switch (id) {
    case 801:
    case 802:
    case 803:
    case 804:
      body.classList.add("cloudy");
      break;
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 230:
    case 231:
    case 232:
      body.classList.add("thunderstorm");
      break;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 520:
    case 521:
    case 522:
    case 531:
      body.classList.add("rain");
      break;
    case 600:
    case 601:
    case 602:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      body.classList.add("snow");
      break;
    case 800:
      body.classList.add("clear");
      break;
    case 611:
    case 612:
    case 511:
      body.classList.add("ice");
      break;
    default:
      body.classList.add("default_image");
      break;
  }
  })
    .catch(function(error) {
      console.log(error);
    });
  });
}




  








