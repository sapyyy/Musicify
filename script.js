"use script";

const body = document.querySelector("body");
const box = document.querySelector(".box");
const boxSource = document.querySelector(".box source");
const prev = document.querySelector(".prev");
const play = document.querySelector(".play");
const next = document.querySelector(".next");
const slider = document.querySelector(".slider");
const songName = document.querySelector(".text h1");
const artistName = document.querySelector(".text h4");
const coverImg = document.querySelector(".cover img");

// to start playing the music
let playing = false;

// link to all the songs
const songLinks = [
  {
    name: "Wildflower",
    src: "songs/Wildflower.mp3",
    artist: "Billie Eilish",
    img: "images/Wildflower.jpg",
  },
  {
    name: "Zamana Lage",
    src: "songs/ZamanaLage.mp3",
    artist: "Arijit Singh",
    img: "images/ZamanaLage.jpg",
  },
  {
    name: "Zaroorat",
    src: "songs/Zaroorat.mp3",
    artist: "Arijit Singh",
    img: "images/Zaroorat.jpg",
  },
];
let curPlay = 0;
let refSlider = null;

// slider update
const updateSlider = function () {
  if (playing) {
    slider.value = box.currentTime;

    // if the song is over, go to the next song
    if (slider.value == Math.floor(box.duration)) {
      // use a circular array to loop through the songs
      slider.value = 1;
      curPlay = (curPlay + 1) % songLinks.length;
      boxSource.src = songLinks[curPlay].src;
      playSong();
    }
  }
};

// to change the songs title and artist's name
const changeSongMeta = function () {
  // change the song and artist name
  songName.innerHTML = songLinks[curPlay].name;
  artistName.innerHTML = `Singer : ${songLinks[curPlay].artist}`;

  // change the image of the song
  coverImg.src = songLinks[curPlay].img;

  // change the slider's max value
  box.load();
  box.addEventListener("loadedmetadata", (e) => {
    slider.max = box.duration;
  });
};
changeSongMeta();

// play functionality
const playSong = function () {
  // change the slider now, start playing
  playing = true;
  box.play();

  // update the slider everytime, when the music is playing
  refSlider = setInterval(() => {
    updateSlider();
  }, 1000);
};

// play & pause functionality
play.addEventListener("click", (e) => {
  if (!playing) {
    playSong();
    play.innerHTML = `<i class="fa-solid fa-pause fa-xl" style="color: #d5c7bc;"></i>`;
  } else {
    box.pause();
    play.innerHTML = `<i class="fa-solid fa-play fa-xl" style="color: #d5c7bc;"></i>`;
    playing = false;

    // if the music is paused we stop the interval
    if (refSlider != null) {
      clearInterval(refSlider);
    }
  }
});

// to shift the prev music
prev.addEventListener("click", (e) => {
  curPlay = curPlay == 0 ? songLinks.length : curPlay;
  boxSource.src = songLinks[--curPlay].src;

  // if the music is already playing, start playing it again
  changeSongMeta();
  if (playing) {
    playSong();
  }
});

// to shift to the next music
next.addEventListener("click", (e) => {
  curPlay = curPlay == songLinks.length - 1 ? -1 : curPlay;
  boxSource.src = songLinks[++curPlay].src;

  changeSongMeta();
  if (playing) {
    playSong();
  }
});

// skip a particular region in the song
slider.addEventListener("click", (e) => {
  const curTime = slider.value;
  box.currentTime = curTime;
});
