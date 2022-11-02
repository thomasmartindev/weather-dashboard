const description = document.getElementById("description");
const searchedFor = document.getElementById("searchedFor");
const temp = document.getElementById("temp");
const tempMin = document.getElementById("tempMin");
const tempMax = document.getElementById("tempMax");
const unit = document.getElementById("unit");
const form = document.getElementById("form");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const err = document.getElementById("err");
const dailyBtn = document.getElementById("dailyBtn");
const threeHourBtn = document.getElementById("threeHourBtn");

let searchFor = "brisbane";

async function celsius() {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchFor}&APPID=b8de990687a8fcfebaf6055f6e082255&units=metric`, { mode: "cors" });
    const data = await response.json();
    console.log(data);
    description.textContent = data.weather[0].description;
    searchedFor.textContent = data.name;
    temp.textContent = `${data.main.temp} °C`;
    tempMin.textContent = `L: ${data.main.temp_min} °C`;
    tempMax.textContent = `H: ${data.main.temp_max} °C`;
    unit.textContent = "Display °F";
    feelsLike.textContent = `${data.main.feels_like} °C`;
    humidity.textContent = `${data.main.humidity} %`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    err.textContent = "";
  } catch(error) {
    err.textContent = "Location not found.";
  }
}

async function fahrenheit() {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchFor}&APPID=b8de990687a8fcfebaf6055f6e082255&units=imperial`, { mode: "cors" });
    const data = await response.json();
    console.log(data);
    description.textContent = data.weather[0].description;
    searchedFor.textContent = data.name;
    temp.textContent = `${data.main.temp} °F`;
    tempMin.textContent = `${data.main.temp_min} °F`;
    tempMax.textContent = `${data.main.temp_max} °F`;
    unit.textContent = "Display °C";
    feelsLike.textContent = `${data.main.feels_like} °F`;
    humidity.textContent = `${data.main.humidity} %`;
    windSpeed.textContent = `${data.wind.speed} mph`;
    err.textContent = "";
  } catch(error) {
    err.textContent = "Location not found.";
  }
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