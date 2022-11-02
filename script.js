const description = document.getElementById("description");
const searchedFor = document.getElementById("searchedFor");
const temp = document.getElementById("temp");
const tempMin = document.getElementById("tempMin");
const tempMax = document.getElementById("tempMax");
const unit = document.getElementById("unit");
const form = document.getElementById("form");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const windDirection = document.getElementById("windDirection");
const weatherIcon = document.getElementById("weatherIcon");
const visibility = document.getElementById("visibility");
const err = document.getElementById("err");
const dailyBtn = document.getElementById("dailyBtn");
const threeHourBtn = document.getElementById("threeHourBtn");

let searchFor = "brisbane";

async function celsius() {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchFor}&APPID=b8de990687a8fcfebaf6055f6e082255&units=metric`, { mode: "cors" });
    const data = await response.json();
    description.textContent = data.weather[0].description;
    searchedFor.textContent = data.name;
    temp.textContent = `${round(data.main.temp)} °C`;
    tempMin.textContent = `L: ${round(data.main.temp_min)} °C`;
    tempMax.textContent = `H: ${round(data.main.temp_max)} °C`;
    unit.textContent = "Display °F";
    feelsLike.textContent = `${round(data.main.feels_like)} °C`;
    pressure.textContent = `${data.main.pressure} hPa`;
    humidity.textContent = `${data.main.humidity} %`;
    windSpeed.textContent = `${round(data.wind.speed)} km/h`;
    windDirection.textContent = `${data.wind.deg} °C`;
    visibility.textContent = `${data.visibility / 1000} km`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    err.textContent = "";
  } catch(error) {
    err.textContent = "Location not found.";
  }
}

async function fahrenheit() {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchFor}&APPID=b8de990687a8fcfebaf6055f6e082255&units=imperial`, { mode: "cors" });
    const data = await response.json();
    description.textContent = data.weather[0].description;
    searchedFor.textContent = data.name;
    temp.textContent = `${round(data.main.temp)} °F`;
    tempMin.textContent = `L: ${round(data.main.temp_min)} °F`;
    tempMax.textContent = `H: ${round(data.main.temp_max)} °F`;
    unit.textContent = "Display °C";
    feelsLike.textContent = `${round(data.main.feels_like)} °F`;
    pressure.textContent = `${data.main.pressure} hPa`;
    humidity.textContent = `${data.main.humidity} %`;
    windSpeed.textContent = `${round(data.wind.speed)} mph`;
    windDirection.textContent = `${data.wind.deg} °C`;
    visibility.textContent = `${data.visibility / 1000} km`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    err.textContent = "";
  } catch(error) {
    err.textContent = "Location not found.";
  }
}

function time(n) {
  let date = new Date(n);

  return date.toLocaleTimeString("it-IT");
}

function round(n) {
  return n.toFixed(0);
}

function changeUnit() {
  if (unit.textContent === "Display °F") {
    fahrenheit();
  } else {
    celsius();
  }
}

window.addEventListener("load", celsius);

unit.addEventListener("click", () => { 
  if (unit.textContent === "Display °F") {
    fahrenheit();
  } else {
    celsius();
  }
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  searchFor = e.target.children[0].value;
  e.target.children[0].value = "";
  
  if (unit.textContent === "Display °F") {
    celsius();
  } else {
    fahrenheit();
  }
});