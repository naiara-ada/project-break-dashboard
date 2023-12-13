const locationID = document.getElementById('locationID');
const currentWeatherID = document.getElementById('currentWeatherID');
const weatherperhourID = document.getElementById('weatherperhourID');

const printweatherhours = (hours)=>{
    //let hora = hours[0].time.substring(hour[0].time.length - 5)
    let time;
    hours.forEach((hour)=>{        
        time = hour.time.substring(hour.time.length - 5)        
        weatherperhourID.innerHTML += `
            <div class="hourweatherclass">
                <p>${time}</p>
                <img src="https:${hour.condition.icon}" alt="${hour.condition.text}" />
                <p>${hour.temp_c}ºC</p>
            </div>
        `
    })

  }

const printcurrentWeather = (current, day)=>{
    currentWeatherID.innerHTML = `
    <div class="currenteWeathercontainer">
        <img src="https:${current.condition.icon}" alt="${current.condition.text}"/>
        <p class="currentgrades">${current.temp_c}</p>
        <div class="weatheroptions">
            <p class="w-options">Precipitacion: ${day.daily_chance_of_rain}%</p>
            <p class="w-options">Humedad: ${day.avghumidity}%</p>
            <p class="w-options">Viento: ${day.maxwind_kph} Km/h</p>
        </div>
    </div> `
}

const printLocation = (location, current)=>{
    locationID.innerHTML = `<p>${location.name} / ${location.region}</p>
    <p class="conditionweather">${current.condition.text}</p>`;
}

const printWeather = (data)=>{
    //console.log(data)
    const {location, current, forecast} = data;
    const {day, hour} = forecast.forecastday[0];       
   
    printLocation(location, current)
    printcurrentWeather(current, day)
    printweatherhours(hour);
  
}

const getweather = async (location)=>{
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f760f80c0aa24263834120948231312&q=${location}&aqi=no&lang=es`)
        if(!response.ok){
            throw new Error('Error en la solicitud')
        }
        const data = await response.json();        
        printWeather(data)
    } catch (error){
        console.error('error', error)
    }

}

getweather('Bermeo')

