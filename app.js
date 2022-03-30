const apiKey = "36b5cc1c3de4d88c39078b5dbc658435"
const inputSearch = document.getElementById('search-info')

// when the user enters a city in the input box


// pull information from the 
function getCurrentWeatherApi(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
}

async function getWeatherText(url) {
    let weatherObject = await fetch(url);
    let weatherText = await weatherObject.text();
    parseWeather(weatherText);
}

inputSearch.addEventListener('submit', function(event){

    event.preventDefault();
    // when the user enter a city
    const userInput = document.getElementById('input-search').value;

    // call weather api to retrieve weather data by city name
    // call the current weather api
    function getWeather(userInput){
        then(function(weatherData){
            console.log(weatherData);
        })
        document.getElementById('current-city-name').textContent = userInput
        console.log('current city name')
        document.getElementById('span-today-temp').textContent = tempToday.toFixed(2)
        document.getElementById('img-today-icon').src = iconCodeToPic(weatherData.current.weather[0].icon);
    getWeather(userInput)}
// save the search history to local storage

// list underneath search section




// show the weather data (temperature, wind, humidity) for that day and the next 5 days, in that city:

let parseWeather = function(weatherText) {
    let weatherJSON = JSON.parse(weatherText);
    let dailyForecast = weatherJSON.daily;
    console.log(dailyForecast);
    for (x = 0; x < 5; ++x) {
        let day = dailyForecast[x];
        let today = new Date().getDay() + x;
        if (today > 6) {
            today = today - 7;
        }

       include:  // date
    // temperature
        // humidity
        // icon representing weather forecast
        console.log("today is",today);
        let dayOfWeek = getDayOfWeek(today);
        let description = day.weather[0].description;
        let icon = day.weather[0].icon;
        let sunset = timestampToTime(day.sunset);
        let highTemp = day.temp.max;
        let lowTemp = day.temp.min;
        let humidity = day.humidity;
        displayWeatherDay(dayOfWeek, description, icon, sunset, highTemp, lowTemp, humidity)
    }
}



// and the next 5 days:
// date
// temperature
// humidity



let displayWeatherDay = function(dayOfWeek, description, icon, sunset, highTemp, lowTemp, humidity){
    let out = "<div class='weatherDay'><img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>"
    out += "<h2>" + dayOfWeek + "</h2>";
    out += "<h3>" + description + "</h3>";
    out += "<p>Sunset: " + sunset + "</p>";
    out += "<p>High Temperature: " + highTemp + "°C</p>";
    out += "<p>Low Temperature: " + lowTemp + "°C</p>";
    out += "<p>Humidity: " + humidity + "%</p>";
    document.getElementById("forecast").innerHTML += out;
    
};

let getDayOfWeek = function(dayNum) {
    var weekday = new Array(7);
    weekday[0] = "Sunday"
    weekday[1] = "Monday"
    weekday[2] = "Tuesday"
    weekday[3] = "Wednesday"
    weekday[4] = "Thursday"
    weekday[5] = "Friday"
    weekday[6] = "Saturday"

    return weekday[dayNum];

}

let timestampToTime = function(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = "";
    if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes();
    } else {
        minutes = date.getMinutes();
    }
    return hours +  ";" + minutes;
}})
