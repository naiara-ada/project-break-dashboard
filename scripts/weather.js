const locationID = document.getElementById('locationID');
const currentWeatherID = document.getElementById('currentWeatherID');
const weatherperhourID = document.getElementById('weatherperhourID');
let localCity = localStorage.getItem('localCity');
if (localCity == null){
    localCity = 'Bermeo';
    localStorage.setItem('localCity', localCity)
}

const printSelectCity = ()=>{
    const selectcityID = document.getElementById('selectcityID');
    selectcityID.innerHTML ='';
    let selectCities = JSON.parse(localStorage.getItem('selectCities'));
    if (selectCities===null){
        selectCities=['Bermeo', 'Nueva Ciudad...'];        
    }
    console.log(selectCities);
    selectCities.forEach((city)=>{
        selectcityID.innerHTML +=`
        <option value="${city}">${city}</option>`
    })
}

// actualizamos el listado del selector con la nueva incorporación
const updateSelectorCity =(newCity)=>{
    let selectCities = JSON.parse(localStorage.getItem('selectCities'));
    localStorage.setItem('localCity', newCity)
    let newSelectCities =[];
    if(selectCities===null){
        selectCities =['Bermeo', 'Nueva Ciudad...'];        
    }        
    for (let i = 0; i< selectCities.length-1;i++){
        newSelectCities.push(selectCities[i])
    }
    newSelectCities.push(newCity,'Nueva Ciudad...');
    localStorage.setItem('selectCities', JSON.stringify(newSelectCities))
    printSelectCity();    
}

//controlamos si ha elegido nueva ciudad para añadir nueva
const checkCity = (city)=>{
    console.log(city)
    if(city == 'Nueva Ciudad...'){
        const newCity = prompt('Añade una nueva ciudad');
        getweather(newCity);
        updateSelectorCity(newCity);
    }else{
        getweather(city);
        localStorage.setItem('localCity', city)
    }
}



//controlamos la pagina actual ya elegir la ciudad del tiempo solo esta disponible en la weather.html 
let URLactual = window.location;
if (URLactual.pathname == '/project-break-dashboard/weather.html'){
    printSelectCity();
    const cityButtonID = document.getElementById('cityButtonID');
    cityButtonID.addEventListener('click', ()=>{
        const selectcityID = document.getElementById('selectcityID').value;
        checkCity(selectcityID);            
    })
}


const printweatherhours = (hours)=>{
    let time;
    hours.forEach((hour)=>{        
        time = hour.time.substring(hour.time.length - 5)        
        weatherperhourID.innerHTML += `
            <div class="hourweatherclass">
                <p>${time}</p>
                <img src="https:${hour.condition.icon}" alt="${hour.condition.text}" />
                <p class="conditionweather">${hour.temp_c}ºC</p>
            </div> `
    })
}

const printcurrentWeather = (current, day)=>{
    currentWeatherID.innerHTML = `
        <img src="https:${current.condition.icon}" alt="${current.condition.text}"/>
        <p class="currentgrades">${current.temp_c}<img src="./assets/icons/thermometer100.png" alt="thermometer" class="thermo"></p>
        <div class="weatheroptions">
            <p>Precipitación: ${day.daily_chance_of_rain}%</p>
            <p>Humedad: ${day.avghumidity}%</p>
            <p>Viento: ${day.maxwind_kph} Km/h</p>
        </div> `
}

const printLocation = (location, current)=>{
    locationID.innerHTML = `<p>${location.name} / ${location.region}</p>
    <p class="conditionweather">${current.condition.text}</p>`;
}

const printWeather = (data)=>{
    const {location, current, forecast} = data;
    const {day, hour} = forecast.forecastday[0];       
   
    printLocation(location, current)
    printcurrentWeather(current, day)
    printweatherhours(hour);
  
}

const getweather = async (location)=>{
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f760f80c0aa24263834120948231312&q=${location}&aqi=no&lang=es`)
        if(!response.ok){
            throw new Error('Error en la solicitud')
        }
        const data = await response.json();        
        printWeather(data)
    } catch (error){
        console.error('error', error)
    }

}

getweather(localCity)

