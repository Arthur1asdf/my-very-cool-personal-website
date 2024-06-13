const audio = document.getElementById("backgroundMusic");
//flag to tell if the program is playing or not
//default which is playing is 1
let playOrPaused = 1;
function playOrPauseAudio() {
  if (playOrPaused == 1) {
    audio.pause();
    playOrPaused = 0;
  } else {
    audio.play();
    playOrPaused = 1;
  }
}
