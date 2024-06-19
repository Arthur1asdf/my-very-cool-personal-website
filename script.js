//when page is reloaded browsers remember when the audio was left off
//I dont want that so I reset it everytime it loads
const audio = document.getElementById("backgroundMusic");
window.onload = function () {
  audio.currentTime = 0;
};
//flag to tell if the program is playing or not
//default which is playing is 1
let playOrPaused = 1;
function playOrPauseAudio() {
  if (playOrPaused == 0) {
    //audio starts muted cause modern browsers
    //stops auto play
    audio.play();
    playOrPaused = 1;
  } else {
    audio.pause();
    playOrPaused = 0;
  }
}
const playOrMuteButton = document.getElementById("playOrMuteButton");
let isInitial = 1;
playOrMuteButton.addEventListener("click", () => {
  if (isInitial == 1) {
    playOrMuteButton.style.backgroundImage = "url('/images/mute.png')";
    isInitial = 0;
  } else {
    playOrMuteButton.style.backgroundImage = "url('/images/sound.png')";

    isInitial = 1;
  }
});
const wordsFadingIn = document.getElementById("wordsFadingIn");
const unmuteAndFadeAway = document.getElementById("unmuteAndFadeAway");
const biblePage = document.getElementById("biblePage");
//We need to loop through bibleVerse because
//it gives us a collection of found elements
const bibleVerse = document.getElementsByClassName("fadeOut");
function unmuteRevealAndFadeAway() {
  audio.muted = false;
  audio.play();
  for (let verse of bibleVerse) {
    verse.style.opacity = "0";
    verse.style.transition = "1s";
  }
  setTimeout(() => {
    unmuteAndFadeAway.style.opacity = "0";
    unmuteAndFadeAway.style.transition = "3s";
  }, 1000);

  setTimeout(() => {
    wordsFadingIn.style.opacity = "100%";
    wordsFadingIn.style.transition = "6s";
  }, 3000);
  setTimeout(() => {
    biblePage.style.opacity = "0";
    biblePage.style.transition = "6s";
    setTimeout(() => {
      biblePage.style.display = "none";
      document.body.style.overflow = "auto";
    }, 3500);
  }, 6000);
}
document.getElementById("top").addEventListener("click", function () {
  window.scrollTo(0, 0);
});
