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


function displayClock() {

    const date = document.querySelector('#Date');
    const time = document.querySelector('#Time');

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    let currentDate = new Date();
    let currentDay  = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}`;
    let hours       = currentDate.getHours();
    let minutes     = currentDate.getMinutes();
    hours           = hours % 12;
    hours           = (hours) ? hours : 12;
    hours           = (hours < 10) ? '0' + hours : hours;
    minutes         = (minutes < 10) ? '0' + minutes : minutes;
    let currentTime = hours + ':' + minutes + ':' + ('0' + currentDate.getSeconds()).slice(-2);
    let hour        = currentDate.getHours();


    date.textContent = currentDay;       // Prints the date (day, mm, dd)
    time.textContent = currentTime;      // Prints the time (hh, mm, ss)
    setTimeout(displayClock, 1000);      // Update every second (1000ms)

    if (hour >= 23 || hour < 5) greet = 'Go to sleep martin!';
    else if (hour >= 6 && hour < 12) greet = 'Good morning martin!';
    else if (hour >= 12 && hour < 17) greet = 'Good afternoon, martin.';
    else greet = 'Good evening, martin.';

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
