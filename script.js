/**
 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */

var disqus_config = function () {
  this.page.url = "https://my-very-cool-personal-website.vercel.app/"; // Replace PAGE_URL with your page's canonical URL variable
  this.page.identifier = "my-very-awesome-website"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

(function () {
  // DON'T EDIT BELOW THIS LINE
  var d = document,
    s = d.createElement("script");
  s.src = "https://arthurs-super-cool-website.disqus.com/embed.js";
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);
})();

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
  }, 0);
}
document.getElementById("top").addEventListener("click", function () {
  window.scrollTo(0, 0);
});

//custom cursor is not working on the edges prob due to chrome
//trying to block it 64px will not work on edges, however after
//some testing 32px will work however nothing larger so I will
//be changing my cursor to a smaller version of the custom cursor
//need e here because it gives us the coords to mouse
document.addEventListener("mousemove", (e) => {
  const threshhold = 0.01;
  const x = e.clientX;
  const y = e.clientY;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const leftWidth = width * threshhold;
  const rightThreshhold = 0.05;
  const rightWidth = width * (1 - rightThreshhold);
  const topHeight = height * threshhold;
  const botThreshhold = 0.07;
  const botHeight = height * (1 - botThreshhold);
  if (x < leftWidth || x > rightWidth || y < topHeight || y > botHeight) {
    //this changes the html .documentElement
    document.documentElement.style.cursor = 'url("/images/test.png"), auto';
  } else {
    document.documentElement.style.cursor =
      'url("/images/sampleImage.png"), auto';
  }
});
const address = document.getElementById("addressButton");
const whatDaHellGif = document.getElementById("whatDaHell");
const ohMyGodAudio = document.getElementById("ohMygodBruhAudio");
let timeoutGif;

//had a bunch of nested setTimeouts so instead just made an array
const volumeChanges = [
  { volume: 0.4, duration: 100 },
  { volume: 0.3, duration: 100 },
  { volume: 0.1, duration: 2000 },
  { volume: 0.3, duration: 3000 },
  { volume: 0.4, duration: 400 },
  { volume: 0.6, duration: 400 },
  { volume: 0.8, duration: 400 },
  { volume: 1.0, duration: 400 },
];

//recusive function to do all the setTimeouts
//if I remember correctly this is "in-order" or maybe pre-order
// cause everything is behind
//recursive call so go thru the array in order
function applyVolumeChange(index = 0) {
  if (index < volumeChanges.length) {
    const change = volumeChanges[index];
    audio.volume = change.volume;
    setTimeout(() => {
      applyVolumeChange(index + 1);
    }, change.duration);
  }
}

address.addEventListener("click", () => {
  audio.volume = 0.5;
  clearTimeout(timeoutGif);
  ohMyGodAudio.currentTime = 0;
  ohMyGodAudio.volume = 1.0;
  ohMyGodAudio.muted = false;
  ohMyGodAudio.play();
  whatDaHellGif.style.display = "block";
  whatDaHellGif.style.opacity = "80%";
  applyVolumeChange();
  timeoutGif = setTimeout(() => {
    whatDaHellGif.style.opacity = "0";
    whatDaHellGif.style.transition = "3s";
    setTimeout(() => {
      ohMyGodAudio.muted = true;
      whatDaHellGif.style.display = "none";
    }, 3000);
  }, 2600);
});
