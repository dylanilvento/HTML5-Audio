document.addEventListener("DOMContentLoaded", function(event) {

var music = document.getElementById('music'); // id for audio element
var duration = music.duration; // Duration of audio clip
var pButton = document.getElementById('play-pause'); // play button
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline
var currentTime = document.getElementById('current-time');
var totalTime = document.getElementById('total-time');


setTimeout(function(){

    totalTime.innerHTML = convertHMS(music.duration);

}, 300);



// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

// play button event listenter
pButton.addEventListener("click", play);

// timeupdate event listener
music.addEventListener("timeupdate", timeUpdate, false);

// makes timeline clickable
timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;

}

function convertHMS(seconds) {

    var timeDate = new Date(null);
    timeDate.setSeconds(seconds); // specify value of SECONDS
    var HMSTimeDate = timeDate.toISOString().substr(11, 8);
    return HMSTimeDate;

}

// makes playhead draggable
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that audio position is updated only when the playhead is released
var onplayhead = false;

// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}

// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(event) {
    if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(event);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";

        // var newPercent = playhead.style.marginLeft / timelineWidth;

        // timeline.style.background = 'linear-gradient(90deg, rgba(35, 119, 148, 1) 0%, rgba(35, 119, 148, 1) ' + (playPercent * 100) + '% , rgba(255, 255, 255, 1) ' + (playPercent * 100) + '% )';
   
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }



}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
    var playPercent = (music.currentTime / music.duration);
    playhead.style.marginLeft = (timelineWidth * playPercent) + "px";

    timeline.style.background = 'linear-gradient(90deg, rgba(35, 119, 148, 1) 0%, rgba(35, 119, 148, 1) ' + (playPercent * 100) + '% , rgba(255, 255, 255, 1) ' + (playPercent * 100) + '% )';

    if (music.currentTime == music.duration) {
        pButton.className = "";
        pButton.className = "play";
    }

    currentTime.innerHTML = convertHMS(music.currentTime);
}

//Play and Pause
function play() {
    // start music
    if (music.paused) {
        music.play();
        // remove play, add pause
        pButton.className = "";
        pButton.className = "pause";
    } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "play";
    }
}

// Gets audio file duration
// music.addEventListener("canplaythrough", function() {
//     duration = music.duration; //think this is failure-prone
// }, false);

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}

/* DOMContentLoaded*/
});
