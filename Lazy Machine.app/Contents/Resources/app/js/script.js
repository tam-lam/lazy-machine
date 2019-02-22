const electron = require('electron')
const applescript = require('applescript')
let countdown

// Default timer info
var bgColor = "#95E1DB"
var script = sleepScript
var selectedBtn = sleepBtn
var hours = 0
var minutes = 0
var seconds = 0
var isTiming = false

function playBtnPressed(){
  isTiming? stopTimer() : startTimer()
}
function startTimer(){  
  isTiming = true
  togglePlayBtnAppearance()
  //duration: miliseconds
  duration = ((hours*3600) + (minutes*60) + seconds) * 1000
  const now = Date.now()
  const finishTime = now + duration
  countdown = setInterval(() => {
    const secondsLeft = Math.round((finishTime-Date.now()) / 1000)
    if(secondsLeft <= 0 ){
      executeAppleScript(script)
      stopTimer()
    }
    (secondsLeft > 0) ? updateTimeContainer(secondsLeft): updateTimeContainer(0)
  },1000)
}
function stopTimer(){
  clearInterval(countdown)
  resetSliderValues()
  isTiming = false
  togglePlayBtnAppearance()
  updateTimeContainer(0)
  return
}
function tabBtnPressed(senderBtnId){
  var btn = document.getElementById(senderBtnId)
  selectedBtn = btn
  setTimerInfo(btn)
  toggleBtnAppearances(selectedBtn)
  timerContainer.style.backgroundColor = bgColor;
}
function setTimerInfo(btn){
  if(btn == sleepBtn){
    bgColor = "#95E1DB"
    script = sleepScript
  }
  if(btn == quitallBtn){
    bgColor = "#F2DC26"
    script = quitallScript
  }
  if(btn == shutdownBtn){
    bgColor = "#DB817E"
    script = shutdownScript
  }
}
function resetSliderValues(){
  hourSlider.value = 0
  minuteSlider.value = 0
}
function executeAppleScript(script){
  var applescript = require('applescript')
  applescript.execString(script, (err, rtn) => {
    if(err){
      // continue
    }
    if (Array.isArray(rtn)) {
      rtn.forEach(function(outString) {
      });
    }
  });
}
hourSlider.oninput = function(){
  if(!isTiming){
    hourDiv.innerHTML = this.value <10 ? "0" + this.value : this.value
    hours = this.value
  }
}
minuteSlider.oninput = function(){
  if(!isTiming){
    minuteDiv.innerHTML = this.value < 10 ? "0" +this.value : this.value
    minutes = this.value
  }
}
function updateTimeContainer(totalSeconds){
  hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  minutes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds % 60;
  hourDiv.innerHTML = hours <10 ? "0" + hours : hours
  minuteDiv.innerHTML = minutes <10 ? "0" + minutes : minutes
  secondDiv.innerHTML = seconds <10 ? "0" + seconds : seconds
}
function toggleBtnAppearances(selectedBtn){
  if(selectedBtn == sleepBtn){
    selectedBtn.style.backgroundImage= sleepBtnPressedURL
    quitallBtn.style.backgroundImage = quitallBtnNormalURL
    shutdownBtn.style.backgroundImage = shutdownBtnNormalURL
  }
  if(selectedBtn == quitallBtn){
    selectedBtn.style.backgroundImage= quitallBtnPressedURL
    sleepBtn.style.backgroundImage = sleepBtnNormalURL
    shutdownBtn.style.backgroundImage = shutdownBtnNormalURL
  }
  if(selectedBtn == shutdownBtn){
    selectedBtn.style.backgroundImage= shutdownBtnPressedURL
    sleepBtn.style.backgroundImage = sleepBtnNormalURL
    quitallBtn.style.backgroundImage = quitallBtnNormalURL
  }
}
function togglePlayBtnAppearance(){
  playBtn.style.backgroundImage = isTiming? pauseBtnURL : playBtnURL
}