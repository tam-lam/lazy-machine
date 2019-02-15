const electron = require('electron')
const applescript = require('applescript')

// Constants
const sleepBtn = document.getElementById("sleepBtn")
const quitallBtn = document.getElementById("quitallBtn")
const shutdownBtn = document.getElementById("shutdownBtn")
const timerContainer = document.getElementById("timerContainer")
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const hourSlider = document.getElementById("hourSlider");
const minuteSlider = document.getElementById("minuteSlider");
const sleepBtnNormalURL= "url('assests/sleepBtnNormal.png')" 
const sleepBtnPressedURL = "url('assests/sleepBtnPressed.png')" 
const quitallBtnNormalURL = "url('assests/quitallBtnNormal.png')" 
const quitallBtnPressedURL = "url('assests/quitallBtnPressed.png')" 
const shutdownBtnNormalURL = "url('assests/shutdownBtnNormal.png')" 
const shutdownBtnPressedURL = "url('assests/shutdownBtnPressed.png')" 

const quitallScript = `
tell application "System Events"
    set selectedProcesses to (name of every process where background only is false)
end tell
repeat with processName in selectedProcesses
    if processName does not contains "Electron"
        do shell script "Killall " & quoted form of processName
    end if
end repeat
`
const sleepScript = `
tell application "Finder" to sleep
`
const shutdownScript = `
tell application "System Events"
shut down
end tell
`
const closeSafariTabsScript = `
tell application "Safari"
    repeat with i from (count of windows) to 1 by -1
        repeat with j from (count of tabs of window i) to 1 by -1
            set thistab to tab j of window i
            set foo to name of thistab
            if foo is not equal to "bar" then close thistab
        end repeat
    end repeat
end tell
tell application "Safari" to quit
`
// Timer info
var bgColor = "#95E1DB"
var script = sleepScript
var doCloseSafariTabs = false
var selectedBtn = sleepBtn

function btnPressed(senderBtnId){
  var btn = document.getElementById(senderBtnId)
  selectedBtn = btn

  setTimerInfo(btn)
  toggleBtnAppearances(selectedBtn)
  timerContainer.style.backgroundColor = bgColor;
  // if(doCloseSafariTabs == true){
  //   executeAppleScript(closeSafariTabsScript)
  // }
  // executeAppleScript(script)

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

function executeAppleScript(script){
  applescript.execString(script, (err, rtn) => {
    if (Array.isArray(rtn)) {
      rtn.forEach(function(outString) {
      });
    }
  });
}
hourSlider.oninput = function(){
  if (this.value == "0") {
    hour.innerHTML = "00"
  }else {
    if(this.value<10){
      hour.innerHTML = "0"+ this.value
    }else{
      hour.innerHTML = this.value
    }
  }
}
minuteSlider.oninput = function(){
  if (this.value == "0") {
    minute.innerHTML = "00"
  }else {
    if(this.value<10){
      minute.innerHTML = "0"+ this.value
    }else{
      minute.innerHTML = this.value
    }
  }
}
function disableSliders(){
  hourSlider.disable = true
  minuteSlider.disable = true
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