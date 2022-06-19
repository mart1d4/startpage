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
    const GREET  = document.querySelector('#Greeting');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];

    let date     = new Date();
    let day      = months[date.getMonth()] + ' ' + date.getDate();
    let hours    = (toAMPM(date.getHours()) < 10) ? '0' + toAMPM(date.getHours()) : toAMPM(date.getHours());
    let minutes  = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    let seconds  = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    let time     = hours + ':' + minutes + ':' + seconds;

    DATE.textContent = day;
    TIME.textContent = time;

    let hour = date.getHours();
    if (hour > 5  && hour < 12) GREET.textContent = 'Good morning martin!';
    if (hour > 11 && hour < 18) GREET.textContent = 'Good afternoon, martin.';
    if (hour > 17 && hour < 23) GREET.textContent = 'Good evening, martin.';
    if (hour > 22 || hour < 5 ) GREET.textContent = 'Go to sleep martin!';

    setTimeout(displayClock, 1000);

}


function displayWeather() {

    const icon = document.querySelector('#weatherIcon');
    const temp = document.querySelector('#weatherValue');
    const desc = document.querySelector('#weatherDesc');

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=48.884529&lon=2.317020&lang='en'&appid=327ea8bfc466d4fd42a9e720c737b17f`;
    async function getWeather() {
        const response = await fetch(api);
        const data = await response.json();
        icon.innerHTML   = `<img src='assets/icons/${data.weather[0].icon}.png'/>`;
	    temp.textContent = `${Math.floor(data.main.temp - 273.15).toFixed(0)}°C`;
	    desc.textContent = capitalize(data.weather[0].description);
    }

    getWeather();
    
    setTimeout(displayWeather, 60000);

}


function switchMode(mode) {
    if (mode == 'Card') {
        document.querySelector('#SwitchCard').style.display = 'none';
        document.querySelector('#SwitchBtn').style.display = 'inherit';
        document.querySelector('#Buttons').style.display = 'none';
        document.querySelector('#Cards').style.display = 'flex';
    } else {
        document.querySelector('#SwitchCard').style.display = 'inherit';
        document.querySelector('#SwitchBtn').style.display = 'none';
        document.querySelector('#Buttons').style.display = 'inherit';
        document.querySelector('#Cards').style.display = 'none';
    }
}


displayClock();
displayWeather();
