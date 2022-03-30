
const apiKey = "36b5cc1c3de4d88c39078b5dbc658435";
const inputSearch = document.getElementById('search-info');

// find weather information from API
function getWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    getWeatherText(url);

    return fetch(url).then(function (res) {
        return res.json();
    });
}
// after user enters content and clicks submit, display weather information
inputSearch.addEventListener('submit', function (event) {
    event.preventDefault();

    // set variable based on user input for city name
    const userInput = document.getElementById('input-search').value;

   // based on user input, use api to find weather information
    getWeather(userInput)
        .then(function (weatherData) {
            console.log(weatherData);

            // show the day's weather data
            document.getElementById('temp-today').textContent = weatherData.main.temp;
            document.getElementById('wind-today').textContent = weatherData.wind.speed;
            document.getElementById('humidity-today').textContent = weatherData.main.humidity;
            document.getElementById('current-city-name').textContent = userInput;
            document.getElementById('search-history').appendChild(document.getElementById('past-searches')).textContent = userInput;
       
            let icon = weatherData.weather[0].icon;
            document.getElementById('weather-icon-today').value =`http://openweathermap.org/img/wn/"${icon}"@2x.png`;
        })   
})



// group project

async function getWeatherText(url) {
    let weatherObject = await fetch(url);
    let weatherText = await weatherObject.text();
    parseWeather(weatherText);
    console.log('hello1021');
}

let parseWeather = function (weatherText) {
    let weatherJSON = JSON.parse(weatherText);
    let dailyForecast = weatherJSON.daily;
    console.log(dailyForecast);
    for (x = 0; x < 7; ++x) {
        let day = dailyForecast[x];
        let today = new Date().getDay() + x;
        // if (today > 6) {
        //     today = today - 7;
        // }
        console.log("today is", today);
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

let displayWeatherDay = function (dayOfWeek, description, icon, sunset, highTemp, lowTemp, humidity) {
    let out = "<div class='weatherDay'><img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>"
    out += "<h2>" + dayOfWeek + "</h2>";
    out += "<h3>" + description + "</h3>";
    out += "<p>Sunset: " + sunset + "</p>";
    out += "<p>High Temperature: " + highTemp + "°C</p>";
    out += "<p>Low Temperature: " + lowTemp + "°C</p>";
    out += "<p>Humidity: " + humidity + "%</p>";
    document.getElementById("forecast").innerHTML += out;

}

let getDayOfWeek = function (dayNum) {
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

// let timestampToTime = function (timeStamp) {
//     let date = new Date(timeStamp * 1000);
//     let hours = date.getHours();
//     let minutes = "";
//     if (date.getMinutes() < 10) {
//         minutes = "0" + date.getMinutes();
//     } else {
//         minutes = date.getMinutes();
//     }
//     return hours + ";" + minutes;
// }