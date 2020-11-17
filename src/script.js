const thermostat = new Thermostat;
updateDisplay();

function updateDisplay() {
  const displayTemp = document.getElementById('display-temp');
  displayTemp.textContent = thermostat.temperature;
}

const upButton = document.getElementById('temperature-up');
upButton.addEventListener('click', function() {
  thermostat.up();
  updateDisplay();  
});

const downButton = document.getElementById('temperature-down');
downButton.addEventListener('click', function() {
  thermostat.down();
  updateDisplay();  
});

const resetButton = document.getElementById('temperature-reset');
resetButton.addEventListener('click', function() {
  thermostat.reset();
  updateDisplay();
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