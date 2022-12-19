const container = document.querySelector(".container");
const imag = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const progressBar = document.querySelector("#progress-bar");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");


const player = new MusicPlayer(musicList);


// sayfa yuklendiginde muzik listesini cagirir
window.addEventListener("load", () =>{
    let music = player.getMusic();
    dipslayMusic(music);
});

// muzik listesini gosterir
function dipslayMusic(music){
    title.innerText = music.getName();
    singer.innerText = music.singer;
    imag.src = "img/" + music.image;
    audio.src = "mp3/" + music.file;
}

// muziki oynatmayi tetikler
play.addEventListener("click", () =>{
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

// muzigi durdurur
function pauseMusic(){
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}

// muzigi oynatir
function playMusic(){
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
    audio.play();
}

// onceki muzige gider
prev.addEventListener("click", ()=>{
    prevMusic();
});

function prevMusic(){
    player.previous();
    let music = player.getMusic();
    dipslayMusic(music);
    playMusic();
}

// sonraki muzige gider
next.addEventListener("click", ()=>{
    nextMusic();
});

function nextMusic(){
    player.next();
    let music = player.getMusic();
    dipslayMusic(music);
    playMusic();
}

// progress-bar

const calculateTime = (sumSecond) =>{
    const minute = Math.floor(sumSecond / 60);
    const second = Math.floor(sumSecond % 60);
    const updateSecond = second < 10 ? `0${second}` : `${second}`;
    const result = `${minute}: ${updateSecond}`;
    return result;
}

audio.addEventListener("loadedmetadata", () =>{
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", ()=>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", ()=>{
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

// voice control

let voiceState = "unmuted";

volumeBar.addEventListener("input", (e) =>{
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0){
        audio.muted = true;
        voiceState = "muted";
        volume.classList = `fa-solid fa-volume-xmark`;
    } else{
        audio.muted = false;
        voiceState = "unmuted";
        volume.classList = `fa-solid fa-volume-high`;
    }
});

volume.addEventListener("click", () =>{
    if(voiceState === "unmuted"){
        audio.muted = true;
        voiceState = "muted";
        volume.classList = `fa-solid fa-volume-xmark`;
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        voiceState = "unmuted";
        volume.classList = `fa-solid fa-volume-high`;
        volumeBar.value = 100;
    }
});