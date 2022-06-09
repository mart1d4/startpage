// Functions

function capitalize(string) {
    string = string[0].toUpperCase() + string.slice(1);
    if (string.includes(' ')) {
        string = string.split('');
        let index = string.indexOf(' ') + 1;
        string[index] = string[index].toUpperCase();
        return string.join('');
    }
    return string;
}


function toAMPM(hour) {
    hour = hour % 12;
    hour = (hour) ? hour : 12;
    return hour;
}


function displayClock() {

    const DATE   = document.querySelector('#Date');
    const TIME   = document.querySelector('#Time');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];

    let date     = new Date();
    let day      = months[date.getMonth()] + ' ' + date.getDate();
    let hours    = (toAMPM(date.getHours()) < 10) ? '0' + toAMPM(date.getHours()) : toAMPM(date.getHours());
    let minutes  = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    let seconds  = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    let time     = hours + ':' + minutes + ':' + seconds;

    DATE.textContent = day;              // Prints the date (mm, dd)
    TIME.textContent = time;             // Prints the time (hh, mm, ss)
    setTimeout(displayClock, 1000);      // Update every second (1000ms)

    if (hours > 5  && hours < 12) greet = 'Good morning martin!';
    if (hours > 11 && hours < 18) greet = 'Good afternoon, martin.';
    if (hours > 17 && hours < 23) greet = 'Good evening, martin.';
    if (hours > 22 && hours < 5 ) greet = 'Go to sleep martin!';

    document.querySelector('#Greeting').textContent = greet;

}


function displayWeather() {

    const icon = document.querySelector('#weatherIcon');
    const temp = document.querySelector('#weatherValue');
    const desc = document.querySelector('#weatherDesc');

    const weather = {};
    weather.temperature = {};

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=48.884529&lon=2.317020&lang='en'&appid=327ea8bfc466d4fd42a9e720c737b17f`;
	fetch(api)
		.then(function(response) {
			let data = response.json();
			return data;
		})
		.then(function(data) {
			weather.temperature.value = Math.floor(data.main.temp - 273.15);
			weather.description = data.weather[0].description;
			weather.iconId = data.weather[0].icon;
		})
		.then(function() {
			icon.innerHTML   = `<img src='assets/icons/${weather.iconId}.png'/>`;
	        temp.textContent = `${weather.temperature.value.toFixed(0)}°C`;
	        desc.textContent = capitalize(weather.description);
		});
    
    setTimeout(displayWeather, 60000);

}


displayClock();
displayWeather();
