const electron = require('electron')
const Shell = require('node-powershell');

let countdown
// Default timer info
const global = this
var bgColor = "#95E1DB"
var selectedBtn = sleepBtn
var hours = 0
var minutes = 0
var seconds = 0
var isTiming = false
var script = sleepScript

function playBtnPressed(){
  if(hours == 0 && minutes == 0 && seconds == 0){
    executeShellScript()
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
      executeShellScript()
      stopTimer()
    }
    (secondsLeft > 0) ? updateTimeContainer(secondsLeft): updateTimeContainer(0)
  },1000)
}
function executeShellScript(){
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });
  if(script == sleepScript){
    ps.addCommand('rundll32.exe user32.dll,LockWorkStation')
  }
  if(script == quitAllScript){
    ps.addCommand('(New-Object -comObject Shell.Application).Windows() | foreach-object {$_.quit()}')
    ps.addCommand('(get-process | ? { $_.mainwindowtitle -ne "" -and $_.processname -ne "powershell" -and $_.processname -ne "Lazy Machine"} )| stop-process');
    ps.addCommand('stop-process powershell')
  }
  if(script == shutdownScript){
    ps.addCommand('Stop-Computer')
  }
  ps.invoke()
  .then(output => {
    console.log(output);
  })
  .catch(err => {
    console.log(err);
  });
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
    script = quitAllScript
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