const electron = require('electron')
const Shell = require('node-powershell');

let countdown

const sleepBtn = document.getElementById("sleepBtn")
const quitallBtn = document.getElementById("quitallBtn")
const shutdownBtn = document.getElementById("shutdownBtn")
const timerContainer = document.getElementById("timerContainer")
const hourDiv = document.getElementById("hour")
const minuteDiv = document.getElementById("minute")
const secondDiv = document.getElementById("second")
const playBtn = document.getElementById("playBtn")
const hourSlider = document.getElementById("hourSlider")
const minuteSlider = document.getElementById("minuteSlider")
const sleepBtnNormalURL= "url('assets/sleepBtnNormal.png')" 
const sleepBtnPressedURL = "url('assets/sleepBtnPressed.png')" 
const quitallBtnNormalURL = "url('assets/quitallBtnNormal.png')" 
const quitallBtnPressedURL = "url('assets/quitallBtnPressed.png')" 
const shutdownBtnNormalURL = "url('assets/shutdownBtnNormal.png')" 
const shutdownBtnPressedURL = "url('assets/shutdownBtnPressed.png')" 
const playBtnURL = "url('assets/play80.png')" 
const pauseBtnURL = "url('assets/pause80.png')" 

const quitallScript = `
tell application "System Events"
    set selectedProcesses to (name of every process where background only is false)
end tell
repeat with processName in selectedProcesses
    if processName does not contains "Lazy Machine"
        if processName does not contains "Safari"
            do shell script "Killall " & quoted form of processName
        end if
    end if
end repeat
tell application "Safari" to quit saving no
`
const sleepScript = `
tell application "Finder" to sleep
`
const shutdownScript = `
tell application "System Events"
shut down
end tell
`
// Default timer info
var bgColor = "#95E1DB"
var script = sleepScript
var selectedBtn = sleepBtn
var hours = 0
var minutes = 0
var seconds = 0
var isTiming = false

function executeShellScript(script){

  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

  ps.addCommand('(get-process | ? { $_.mainwindowtitle -ne "" -and $_.processname -ne "powershell" } )| stop-process');
  ps.invoke()
  .then(output => {
    console.log(output);
  })
  .catch(err => {
    console.log(err);
  });
}

function playBtnPressed(){
  if(hours == 0 && minutes == 0 && seconds ==0){
    // executeAppleScript(script)
    executeShellScript(script)
    return
  }
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
      // executeAppleScript(script)
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
// function executeAppleScript(script){
//   var applescript = require('applescript')
//   applescript.execString(script, (err, rtn) => {
//     if(err){
//       // continue
//     }
//     if (Array.isArray(rtn)) {
//       rtn.forEach(function(outString) {
//       });
//     }
//   });
// }

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