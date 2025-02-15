document.addEventListener('DOMContentLoaded', () =>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temprature = document.getElementById("temprature");
    const description = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const API_KEY = "958bfcb6b2a4fcd125b19ceef20b18b8";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;
        // it may throw an error
        // server/database is always is in anathor continent
        try {
            const weatherData = await fetchWheatherData(city)
            displayWheatherData(weatherData);
        } catch (error) {
            Messageerror()
        }
    })

    async function  fetchWheatherData(city){
        // getData
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const responce = await fetch(url);
        console.log(typeof responce);
        console.log("Responce--->", responce);
        if(!responce.ok){
            throw new Error("City not found");
        }
        const data = await responce.json()
        // console.log(data);
        return data;
        
        
        
    }

    function displayWheatherData(weatherData){
        console.log(weatherData);
        const {name, main, weather} = weatherData
        cityName.textContent = name;

        // unlock the display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        temprature.textContent = `Temprature : ${main.temp}     Feels like ${main.feels_like}`;
        description.textContent = `description : ${weather[0].description}`;
    }

    function Messageerror(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.remove('hidden')
    }
});