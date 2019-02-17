const electron = require('electron')
const applescript = require('applescript')

// Default timer info
var bgColor = "#95E1DB"
var script = sleepScript
var doCloseSafariTabs = false
var selectedBtn = sleepBtn
var hours = 0
var minutes = 0
var seconds = 0
var isTiming = false

function playBtnPressed(){
  if(isTiming){
    stopTimer()
  }else{
    startTimer()
  }
}
function startTimer(){  
  // duration : in seconds
  isTiming = true
  togglePlayBtnAppearance()
  duration = (hours*3600) + (minutes*60) + seconds
  if(duration>=1){
    function timer(){
        if (duration <= 1){
          stopTimer()
          execute(script)
        }
        duration = (duration < 0)? duration: duration - 1;
        totalSeconds = duration
        updateTimeContainer(duration)
    }
    window.timing = setInterval(timer,1000)
  }else{
    stopTimer()
    execute(script)
  }
}
function stopTimer(){
  clearInterval(window.timing)
  resetSliderValues()
  isTiming = false
  togglePlayBtnAppearance()
  updateTimeContainer(0)
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
    doCloseSafariTabs = false
  }
  if(btn == quitallBtn){
    bgColor = "#F2DC26"
    script = quitallScript
    doCloseSafariTabs = true
  }
  if(btn == shutdownBtn){
    bgColor = "#DB817E"
    script = shutdownScript
    doCloseSafariTabs = true
  }
}
function resetSliderValues(){
  hourSlider.value = 0
  minuteSlider.value = 0
}
function execute(script){
  if(doCloseSafariTabs == true){
    executeAppleScript(closeSafariTabsScript)
  }
  executeAppleScript(script)
  executeAppleScript(script)
  executeAppleScript(script)
}
function executeAppleScript(script){
  applescript.execString(script, (err, rtn) => {
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
  if(isTiming){
    playBtn.style.backgroundImage = pauseBtnURL
  }else{
    playBtn.style.backgroundImage = playBtnURL
  }
}