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