const electron = require('electron')
const applescript = require('applescript')

// Constants
const sleepBtn = document.getElementById("sleepBtn")
const quitallBtn = document.getElementById("quitallBtn")
const shutdownBtn = document.getElementById("shutdownBtn")
var timerContainer = document.getElementById("timerContainer")
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

function btnPressed(senderBtnId){
  var btn = document.getElementById(senderBtnId)
  setTimerInfo(btn)
  timerContainer.style.backgroundColor = bgColor;
  if(doCloseSafariTabs == true){
    executeAppleScript(closeSafariTabsScript)
  }
  executeAppleScript(script)

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