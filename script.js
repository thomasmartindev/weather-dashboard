const description = document.getElementById("description");
const searchedFor = document.getElementById("searchedFor");
const temp = document.getElementById("temp");
const unit = document.getElementById("unit");
const form = document.getElementById("form");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const dailyBtn = document.getElementById("dailyBtn");
const threeHourlyBtn = document.getElementById("threeHourlyBtn");

let searchFor = "brisbane";

async function celsius() {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchFor}&APPID=b8de990687a8fcfebaf6055f6e082255&units=metric`, { mode: "cors" });
  const data = await response.json();
  console.log(data);
  description.textContent = data.weather[0].description;
  searchedFor.textContent = data.name;
  temp.textContent = `${data.main.temp} °C`;
  unit.textContent = "Display °F";
  feelsLike.textContent = `${data.main.feels_like} °C`;
  humidity.textContent = `${data.main.humidity} %`;
  windSpeed.textContent = `${data.wind.speed} km/h`;
}

async function fahrenheit() {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchFor}&APPID=b8de990687a8fcfebaf6055f6e082255&units=imperial`, { mode: "cors" });
  const data = await response.json();
  console.log(data);
  description.textContent = data.weather[0].description;
  searchedFor.textContent = data.name;
  temp.textContent = `${data.main.temp} °F`;
  unit.textContent = "Display °C";
  feelsLike.textContent = `${data.main.feels_like} °F`;
  humidity.textContent = `${data.main.humidity} %`;
  windSpeed.textContent = `${data.wind.speed} mph`;
}

function changeUnit() {
  if (unit.textContent === "Display °F") {
    fahrenheit();
  } else {
    celsius();
  }
}

window.addEventListener("load", celsius);
unit.addEventListener("click", changeUnit);
form.addEventListener("submit", function(e) {
  e.preventDefault();

  searchFor = e.target.children[0].value;
  changeUnit();
});