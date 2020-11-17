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
});

const downButton = document.getElementById('temperature-down');
downButton.addEventListener('click', function() {
  thermostat.down();
  updateDisplay('display-temp', thermostat.temperature);  
});

const resetButton = document.getElementById('temperature-reset');
resetButton.addEventListener('click', function() {
  thermostat.reset();
  updateDisplay('display-temp', thermostat.temperature); 
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
})

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  const city = document.getElementById('city-name').value.toLowerCase();
  getWeather(city);
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