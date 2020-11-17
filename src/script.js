const thermostat = new Thermostat;
updateDisplay('display-temp', thermostat.temperature);  

function updateDisplay(elementId, content) {
  const elements = document.getElementById(elementId);
  elements.textContent = content;
}

const upButton = document.getElementById('temperature-up');
upButton.addEventListener('click', function() {
  thermostat.up();
  updateDisplay('display-temp', thermostat.temperature); 
  saveSettings()
});

const downButton = document.getElementById('temperature-down');
downButton.addEventListener('click', function() {
  thermostat.down();
  updateDisplay('display-temp', thermostat.temperature);  
  saveSettings()
});

const resetButton = document.getElementById('temperature-reset');
resetButton.addEventListener('click', function() {
  thermostat.reset();
  updateDisplay('display-temp', thermostat.temperature); 
  saveSettings()
});

const powerSaving = document.getElementById('power-saving');
powerSaving.addEventListener('click', function(){
  if(thermostat.powerSavingModeOn) {
    thermostat.powerSavingModeOn = false;
    powerSaving.style.backgroundColor = "red"
    powerSaving.textContent = "Turn Power Saving Mode On"
  } else {
    thermostat.powerSavingModeOn = true;
    powerSaving.style.backgroundColor = "lightgreen"
    powerSaving.textContent = "Turn Power Saving Mode Off"
  }
  console.log(thermostat.powerSavingModeOn)
  saveSettings() 
})

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  const city = document.getElementById('city-name').value.toLowerCase();
  getWeather(city);
  saveSettings()
})

function getWeather(city) {
  const Http = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c8d578d915427955af496a6973fe82c5&units=metric`
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    console.log(Http.response)
    data = JSON.parse(Http.response)
    console.log(data.id)
    updateDisplay('city', city)
    updateDisplay('weather',data.weather[0]['description'])
    updateDisplay('outside-temp',data.main.temp)
  }
}

function getSettings() {
  const Http = new XMLHttpRequest();
  const url = 'http://localhost:9393/temperature'
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    console.log(Http.response)
    data = JSON.parse(Http.response)
    getWeather(data.city)
    thermostat.temperature = data.temperature
    updateDisplay('display-temp',data.temperature)
    thermostat.powerSavingModeOn = data.power
    if (data.power) {
      powerSaving.style.backgroundColor = "lightgreen"
      powerSaving.textContent = "Turn Power Saving Mode Off"
    }
    else {
      powerSaving.style.backgroundColor = "red"
      powerSaving.textContent = "Turn Power Saving Mode On"
    }
  }
}

function saveSettings() {
  const Http = new XMLHttpRequest();
  const url = 'http://localhost:9393/temperature'
  const city = document.getElementById('city').textContent
  console.log(city)
  const data = {"temperature": thermostat.temperature, "city": city, "power": thermostat.powerSavingModeOn}
  const json = JSON.stringify(data)
  Http.open("POST", url);
  Http.send(json);
}

getSettings()

