const iconElement =document.querySelector(".weather-icon"); 
const locationIcon =document.querySelector(".location-icon");
const tempElement =document.querySelector(".temperature-value p");
const descElement =document.querySelector(".temperature-description p");
const locationElement =document.querySelector(".location p"); 
const notificatonElement =document.querySelector(".notification "); 

var input=document.getElementById("search"); 
let city=""; 
let latitude=0.0 
let longitude=0.0 
input=addEventListener("keyup",function(event) { 
    if(event.keyCode===13){ 
        event.preventDefault(); 
        city=input.value 
        getSearchWeather(city) 
        console.log(city)
    }
}) 
const weather={} 
weather.temperature={ 
    unit: "celsius"
} 
const KELVIN=273 
const key='5b167ad340e351cd6c285316386627f3' 
if("geolocation" in navigator) { 
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{ 
    notificatonElement.style.display='block' 
    notificatonElement.innerHTML='<p> Browser doesnt suppport geolocation</p>'
} 
function setPosition(postion){ 
    latitude=position.coords.latitude 
    longitude=position.coords.longitude 
    getWeather(latitude,longitude)
} 
locationIcon.addEventListener("click",function(event){ 
    console.log('hey') 
    getWeather(latitude,longitude)
}) 
function showError(error){ 
    notificatonElement.style.display="block"; 
    notificatonElement.innerHTML='<p> ${error,message} </p>'
} 
function getSearchWeather(city){ 
    let api='http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}' 
    fetch(api) 
    .then(function (response) { 
        let data=response.json() 
        return data
    }) 
    .then(function(data){ 
        weather.temperature.value=Math.floor(data,main,temp -KELVIN) 
        weather.description=data.weather[0].description 
        weather.iconId=data.weather[0].icon 
        weather.city=data.name 
        weather.country=data.sys.country
    }) 
    .then(function() { 
        displayWeather()
    })
} 
function getWeather(latitude,longitude) { 
    let api='http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}'   
    fetch(api) 
    .then(function (response) { 
        let data=response.json() 
        return data
    }) 
    .then(function(data){ 
        weather.temperature.value=Math.floor(data,main,temp -KELVIN) 
        weather.description=data.weather[0].description 
        weather.iconId=data.weather[0].icon 
        weather.city=data.name 
        weather.country=data.sys.country
    }) 
    .then(function() { 
        displayWeather()
    })

} 
function displayWeather() { 
    iconElement.innerHTML='<img src="${weather.iconId}.png"/>' 
    tempElement.innerHTML='${weather.temperature.value} *<span>C</span>' 
    descElement.innerHTML=weather.description 
    locationIcon.innerHTML='${weather.city},${weather.country}' 

}