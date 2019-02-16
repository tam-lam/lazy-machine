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
const sleepBtnNormalURL= "url('assests/sleepBtnNormal.png')" 
const sleepBtnPressedURL = "url('assests/sleepBtnPressed.png')" 
const quitallBtnNormalURL = "url('assests/quitallBtnNormal.png')" 
const quitallBtnPressedURL = "url('assests/quitallBtnPressed.png')" 
const shutdownBtnNormalURL = "url('assests/shutdownBtnNormal.png')" 
const shutdownBtnPressedURL = "url('assests/shutdownBtnPressed.png')" 
const playBtnURL = "url('assests/play.png')" 
const pauseBtnURL = "url('assests/pause.png')" 

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