let is24HourFormat = true;  // Initial time format
let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchTime = 0;

// Update Digital Clock
function updateClock() {
    const now = new Date();
    const hours = is24HourFormat ? now.getHours() : now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = !is24HourFormat ? (now.getHours() >= 12 ? 'PM' : 'AM') : '';

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);

    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

setInterval(updateClock, 1000);
updateClock();  // Initial call to display the clock immediately

// Toggle Time Format
document.getElementById('toggle-format').addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    document.getElementById('toggle-format').textContent = is24HourFormat ? "Switch to 12-hour format" : "Switch to 24-hour format";
});

// Theme Switcher
document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
});

// World Clock Update
function updateWorldClock() {
    const timezone = document.getElementById('timezone').value;
    const now = new Date().toLocaleString('en-US', { timeZone: timezone });
    const time = new Date(now);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    document.getElementById('world-time').textContent = `${hours}:${minutes}:${seconds}`;
}

document.getElementById('timezone').addEventListener('change', updateWorldClock);
setInterval(updateWorldClock, 1000);

// Stopwatch Functionality
function formatTime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            stopwatchTime += 1000;
            document.getElementById('stopwatch-time').textContent = formatTime(stopwatchTime);
        }, 1000);
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchTime = 0;
    document.getElementById('stopwatch-time').textContent = "00:00:00";
}

document.getElementById('start-stopwatch').addEventListener('click', startStopwatch);
document.getElementById('stop-stopwatch').addEventListener('click', stopStopwatch);
document.getElementById('reset-stopwatch').addEventListener('click', resetStopwatch);

// Weather Integration (Using OpenWeatherMap API)
async function fetchWeather() {
    const apiKey = 'your_api_key'; // Replace with your OpenWeatherMap API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    document.getElementById('weather-info').textContent = `London: ${temperature}°C, ${description}`;
}

fetchWeather(); // Initial fetch
