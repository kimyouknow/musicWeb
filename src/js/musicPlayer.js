const artistMain = document.getElementById("js-artist__thubnail");
const albumCover = document.getElementById("js-music__albumCover");
const songName = document.querySelectorAll("#js-music__title");
const jsAudio = document.getElementById("jsAudio");
const artistSongList = document.querySelectorAll(".js-artist__song");
const playBtn = document.querySelectorAll("#jsPlayBtn");
const jsCurremtime = document.getElementById("jsCurremtime");
const jsTotalTime = document.getElementById("jsTotalTime");
const jsMusicBar = document.getElementById("jsMusicBar");
const jsVolumeController = document.getElementById("jsVolumeController");
const jsVolumeBtn = document.getElementById("jsVolumeBtn");
const jsNextBtn = document.querySelectorAll("#jsNextBtn");
const jsBackBtn = document.querySelectorAll("#jsBackBtn");
const MusicParam = songName[1].querySelector("span");
const jsProgress = document.getElementById("jsProgress");

const musicList = ["lilac", "celebrity", "eight", "blueming", "bbibbi"];
const musicTitle = ["Lilac", "Celebrity", "에잇", "Blueming", "삐삐"]

const changeToPlayBtn = () => {
    playBtn[0].innerHTML = '<i class="fas fa-play"></i>';
    playBtn[1].innerHTML = '<i class="fas fa-play"></i>';
}

const changeToPauseBtn = () => {
    playBtn[0].innerHTML = '<i class="fas fa-pause"></i>';
    playBtn[1].innerHTML = '<i class="fas fa-pause"></i>';
}

const formatDate = (seconds) => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600)  / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`
}

const handlePlayer = () => {
    if (jsAudio.src == '') {
        alert('Please choose a music');
    }
    else {
        if (jsAudio.paused) {
            jsAudio.play();
            changeToPauseBtn();
        } else {
            jsAudio.pause();
            changeToPlayBtn();    
        }
    }
}

const setTotalTime = (jsAudio) => {
    const totalTimeString = formatDate(jsAudio.duration);
    jsTotalTime.innerText = totalTimeString;
    jsMusicBar.max = Math.floor(jsAudio.duration);
}

const musicPlayList = (clickedMusic) => {
    jsAudio.src = `/src/music/${clickedMusic}.mp3`
    MusicParam.id = clickedMusic
    jsAudio.onloadedmetadata = function() {
        jsAudio.play();
        setTotalTime(jsAudio)
    }
    
}

const changeImage = (clickedImg) => {
    albumCover.querySelector("img").src = clickedImg;
    changeToPauseBtn();
}

const handleClick = (e) => {
    const clickedSong = e.path[e.path.length-8].querySelectorAll("span")[1];
    const clickedImg = e.path[e.path.length-8].querySelector("img").src;
    musicPlayList(clickedSong.id);
    changeImage(clickedImg);
    changeTitle(clickedSong.id)
}
const setCurrentTime = () => {
    const currentTime = formatDate(Math.floor(jsAudio.currentTime));
    jsCurremtime.innerHTML = currentTime;
    jsMusicBar.value = jsAudio.currentTime;

}
const handleMusicBar = () => {
    // console.log(jsMusicBar.value, jsMusicBar.value/jsAudio.duration );
    jsAudio.currentTime = jsMusicBar.value;
    jsProgress.style.width = jsMusicBar.value/jsAudio.duration*100 + "%";
}

const handleVolume = () => {
    jsVolumeController.style.display='block';
    jsVolumeBtn.style.opacity="0";
}
const handleVolumeControl = (e) => {
    // console.log(jsVolumeController.value)
    jsAudio.volume = jsVolumeController.value;
    jsVolumeController.style.display='none';
    jsVolumeBtn.style.opacity="1";
}
const handleMain = (e) => {
    albumCover.querySelector("img").src = e.target.src;
    jsAudio.src =  '';
    changeToPlayBtn();
    songName.forEach((name) => {
        name.innerText = 'Click Music!!!';
    })
    jsProgress.style.width = 0;
}

const findName = (song) => {
    const changedTitle= musicTitle[musicList.indexOf(song)];
    return changedTitle;
}

const nextImage = (song) => {
    albumCover.querySelector("img").src = `/src/image/${song}.jpg`
}

const changeTitle = (song) => {
    songName.forEach((name) => {
        name.innerText = findName(song)
    })
}

const foundSong = () => {
    const found = musicList.find(element => element == MusicParam.id );
    const foundIndex = musicList.indexOf(found);
    return foundIndex;
}

const handleNext = () => {
    const foundIndex = foundSong();
    let nextIndex = 0;
    if (foundIndex != 4) {
        nextIndex = foundIndex + 1
    } else {
        nextIndex = 0
    }
    musicPlayList(musicList[nextIndex]);
    nextImage(musicList[nextIndex]);
    changeTitle(musicList[nextIndex]);
    changeToPauseBtn();
    jsProgress.style.width = 0;
    
}

const handleBack = (e) => {
    const foundIndex = foundSong();
    let BackIndex = 0;
    if (foundIndex != 0) {
        BackIndex = foundIndex - 1
    } else {
        BackIndex = 4
    }
    musicPlayList(musicList[BackIndex]);
    nextImage(musicList[BackIndex]);
    changeTitle(musicList[BackIndex]);
    changeToPauseBtn();
    jsProgress.style.width = 0;
}

function init() {
    jsAudio.onloadedmetadata = function() {
        setTotalTime(jsAudio);
    }
    artistSongList.forEach((song) => {
        song.addEventListener("click", handleClick);
    })
    playBtn.forEach((button) => {
        button.addEventListener("click" ,handlePlayer);
    })
    jsNextBtn.forEach((button)=> {
        button.addEventListener("click", handleNext);
    })
    jsBackBtn.forEach((button)=> {
        button.addEventListener("click", handleBack);
    })
    jsAudio.addEventListener("timeupdate", setCurrentTime);
    jsMusicBar.addEventListener("input", handleMusicBar);
    jsVolumeBtn.addEventListener("click", handleVolume);
    jsVolumeController.addEventListener("change", handleVolumeControl);
    artistMain.addEventListener("click", handleMain);
}
init()
