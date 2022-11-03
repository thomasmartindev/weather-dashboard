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
const chanceOfRain = document.getElementById("chanceOfRain");
const weatherIcon = document.getElementById("weatherIcon");
const visibility = document.getElementById("visibility");
const err = document.getElementById("err");
const dayOne = document.getElementById("dayOne");
const dayOneTemp = document.getElementById("dayOneTemp");
const dayOneIcon = document.getElementById("dayOneIcon");
const dayTwo = document.getElementById("dayTwo");
const dayTwoTemp = document.getElementById("dayTwoTemp");
const dayTwoIcon = document.getElementById("dayTwoIcon");
const dayThree = document.getElementById("dayThree");
const dayThreeTemp = document.getElementById("dayThreeTemp");
const dayThreeIcon = document.getElementById("dayThreeIcon");
const dayFour = document.getElementById("dayFour");
const dayFourTemp = document.getElementById("dayFourTemp");
const dayFourIcon = document.getElementById("dayFourIcon");


let searchFor = "brisbane";

async function celsius() {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchFor}&APPID=b8de990687a8fcfebaf6055f6e082255&units=metric`, { mode: "cors" });
    const data = await response.json();
    description.textContent = capitilizeFirstLetter(data.weather[0].description);
    searchedFor.textContent = `Today in ${data.name}`;
    temp.textContent = `${round(data.main.temp)} °C`;
    tempMin.textContent = `L: ${round(data.main.temp_min)} °C`;
    tempMax.textContent = `H: ${round(data.main.temp_max)} °C`;
    unit.textContent = "Display °F";
    feelsLike.textContent = `${round(data.main.feels_like)} °C`;
    pressure.textContent = `${data.main.pressure} hPa`;
    humidity.textContent = `${data.main.humidity} %`;
    windSpeed.textContent = `${round(data.wind.speed * 3.6)} km/h`;
    visibility.textContent = `${data.visibility / 1000} km`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    err.textContent = "";
  } catch(error) {
    err.textContent = `Location not found. Search must be in the form of \"City\", \"City, State\" or \"City, Country\".`;
  }
}

async function fahrenheit() {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchFor}&APPID=b8de990687a8fcfebaf6055f6e082255&units=imperial`, { mode: "cors" });
    const data = await response.json();
    description.textContent = capitilizeFirstLetter(data.weather[0].description);
    searchedFor.textContent = `Today in ${data.name}`;
    temp.textContent = `${round(data.main.temp)} °F`;
    tempMin.textContent = `L: ${round(data.main.temp_min)} °F`;
    tempMax.textContent = `H: ${round(data.main.temp_max)} °F`;
    unit.textContent = "Display °C";
    feelsLike.textContent = `${round(data.main.feels_like)} °F`;
    pressure.textContent = `${data.main.pressure} hPa`;
    humidity.textContent = `${data.main.humidity} %`;
    windSpeed.textContent = `${round(data.wind.speed)} mph`;
    visibility.textContent = `${data.visibility / 1000} km`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    err.textContent = "";
  } catch(error) {
    err.textContent = `Location not found. Search must be in the form of \"City\", \"City, State\" or \"City, Country\".`;
  }
}

async function celsiusForcast() {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${searchFor}&APPID=b8de990687a8fcfebaf6055f6e082255&units=metric`, { mode: "cors" });
  const data = await response.json();
  console.log(data);
  chanceOfRain.textContent = `${data.list[0].pop * 100} %`;
  dayOne.textContent = day(data.list[8].dt * 1000);
  dayOneTemp.textContent = `${round(data.list[8].main.temp)} °C`;
  dayOneIcon.src = `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`;
  dayTwo.textContent = day(data.list[16].dt * 1000);
  dayTwoTemp.textContent = `${round(data.list[16].main.temp)} °C`;
  dayTwoIcon.src = `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`;
  dayThree.textContent = day(data.list[24].dt * 1000);
  dayThreeTemp.textContent = `${round(data.list[24].main.temp)} °C`;
  dayThreeIcon.src = `http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`;
  dayFour.textContent = day(data.list[32].dt * 1000);
  dayFourTemp.textContent = `${round(data.list[32].main.temp)} °C`;
  dayFourIcon.src = `http://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`;
}

async function fahrenheitForcast() {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${searchFor}&APPID=b8de990687a8fcfebaf6055f6e082255&units=imperial`, { mode: "cors" });
  const data = await response.json();
  console.log(data);
  chanceOfRain.textContent = `${data.list[0].pop * 100} %`;
  dayOne.textContent = day(data.list[8].dt * 1000);
  dayOneTemp.textContent = `${round(data.list[8].main.temp)} °F`;
  dayOneIcon.src = `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`;
  dayTwo.textContent = day(data.list[16].dt * 1000);
  dayTwoTemp.textContent = `${round(data.list[16].main.temp)} °F`;
  dayTwoIcon.src = `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`;
  dayThree.textContent = day(data.list[24].dt * 1000);
  dayThreeTemp.textContent = `${round(data.list[24].main.temp)} °F`;
  dayThreeIcon.src = `http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`;
  dayFour.textContent = day(data.list[32].dt * 1000);
  dayFourTemp.textContent = `${round(data.list[32].main.temp)} °F`;
  dayFourIcon.src = `http://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`;
}

function capitilizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function day(n) {
  let day = new Date(n);
  
  switch (day.getDay()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
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
window.addEventListener("load", celsiusForcast);

unit.addEventListener("click", () => { 
  if (unit.textContent === "Display °F") {
    fahrenheit();
    fahrenheitForcast();
  } else {
    celsius();
    celsiusForcast();
  }
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  searchFor = e.target.children[0].value;
  e.target.children[0].value = "";
  
  if (unit.textContent === "Display °F") {
    celsius();
    celsiusForcast();
  } else {
    fahrenheit();
    fahrenheitForcast();
  }
});