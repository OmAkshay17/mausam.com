function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Get your API key from OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            console.log(data)
            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}  

function displayWeather(data) {
    const weatherData = document.getElementById('weatherData');

    
    const body = document.querySelector('body');
    const isDay = (data.dt > data.sys.sunrise && data.dt < data.sys.sunset);

    if (data.weather[0].main.toLowerCase() === 'rain') {
        body.style.backgroundImage = "url('rain.jpg')"; // Change to your rainy background image
    }
    
    else if (!isDay) {
        body.style.backgroundImage = "url('night1.jpg')"; // Change to your night background image
    }
    
    else {
        body.style.backgroundImage = "url('day1.jpg')"; // Change to your day background image
    }

    weatherData.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}
