// Your OpenWeather API key (replace with your own key if necessary)
const apiKey = "2f26311b31f426f84509a20a0fff9d37";

// Selecting the necessary HTML elements for manipulation
const weatherDataEle = document.querySelector(".weather-data"); // The container where weather data will be displayed
const cityNameEle = document.querySelector("#city-name"); // Input field where the user enters a city name
const formEle = document.querySelector("form"); // The form element that handles submission
const imgIcon = document.querySelector(".icon"); // The container where the weather icon will be displayed

// Adding an event listener to handle form submission
formEle.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevents the form from reloading the page when submitted
    const cityValue = cityNameEle.value; // Retrieves the city name entered by the user
    getWeatherData(cityValue); // Calls the function to fetch weather data for the entered city
});

// Function to fetch weather data from OpenWeather API
async function getWeatherData(cityValue) {
    try {
        // Fetch data from OpenWeather API using the city name and API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

        // If the response is not OK, throw an error
        if (!response.ok) {
            throw new Error("Network response is not ok!");
        }

        // Convert the response data into JSON format
        const data = await response.json();
        // console.log(data); // Uncomment this to see the raw API response in the console

        // Extract required data from the API response
        const temperature = Math.floor(data.main.temp); // Round down the temperature
        const description = data.weather[0].description; // Weather condition description
        const icon = data.weather[0].icon; // Icon ID for weather condition

        // Create an array of additional weather details
        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`, // Feels-like temperature
            `Humidity: ${data.main.humidity}%`, // Humidity percentage
            `Wind Speed: ${data.wind.speed} m/s` // Wind speed in meters per second
        ];

        // Display the fetched weather data in the DOM
        weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`; // Display temperature
        weatherDataEle.querySelector(".desc").textContent = description; // Display weather description
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`; // Display weather icon

        // Display additional details dynamically
        weatherDataEle.querySelector(".details").innerHTML = details.map((detail) => {
            return `<div>${detail}</div>`;
        }).join(""); // Convert array elements into HTML divs and join them

    } catch (err) {
        // Handle errors by displaying an error message in the DOM
        weatherDataEle.querySelector(".temp").textContent = "";
        imgIcon.innerHTML = "";
        weatherDataEle.querySelector(".desc").textContent = "An Error Occurred!";
    }
}
