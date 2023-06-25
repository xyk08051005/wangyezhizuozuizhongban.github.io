let audio = document.querySelector('#ado')
const _audio = document.querySelector('._audio')
const _voice = document.querySelector('._voice')

audio.src = "./audio/Mr.Children - HANABI.mp3"
audio.controls = false
audio.loop = true
audio.volume = 0.3

function bofang() {
    if (audio.paused) {
        audio.play()
        _audio.classList.remove('icon-bofang')
        _audio.classList.add('icon-zanting')
    } else {
        audio.pause()
        _audio.classList.remove('icon-zanting')
        _audio.classList.add('icon-bofang')
    }
}

_voice.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false
        _voice.classList.remove('icon-yinliangguanbi')
        _voice.classList.add('icon-yinliangkai')
    } else {
        audio.muted = true
        _voice.classList.remove('icon-yinliangkai')
        _voice.classList.add('icon-yinliangguanbi')
    }
})

// 一上来先调一次初始化函数
changeSong()

function changeSong() {
    if (audio != null) {
        audio.load()
        audio.oncanplay = function () {
            let duraTime = document.querySelector('.duraTime')
            duraTime.innerHTML = transTime(audio.duration)
        }
    }

    function transTime(time) {
        let duration = parseInt(time)
        let minute = parseInt(duration / 60)
        let sec = (duration % 60) + ''
        let isM0 = ':'
        if (minute == 0) {
            minute = '00'
        } else if (minute < 10) {
            minute = "0" + minute
        }
        if (sec.length == 1) {
            sec = "0" + sec
        }
        return minute + isM0 + sec
    }

    const progress = document.querySelector(".progress");
    const slide = document.querySelector(".slide");
    const fill = document.querySelector(".fill")
    audio.ontimeupdate = function () {
        let l = (audio.currentTime / audio.duration) * 100;
        slide.style.left = l + "%";
        fill.style.width = l + "%";
        if (audio.currentTime == 0) {
            slide.style.left = "0%";
        }
        const currentTime = document.querySelector(".currentTime");
        currentTime.innerHTML = transTime(parseInt(audio.currentTime));
        const duraTime = document.querySelector(".duraTime");
        duraTime.innerHTML = transTime(audio.duration);
    };

    slide.onmousedown = function (e) {
        let x = e.clientX - this.offsetLeft
        document.onmousemove = function (e) {
            let jlx = ((e.clientX - x) / progress.clientWidth) * 100
            if (jlx <= 100 && jlx >= 0) {
                slide.style.left = jlx + "%"
            }
            audio.currentTime = (jlx / 100) * audio.duration
        }
        document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
    slide.ontouchstart = function (e) {
        let x = e.targetTouches[0].clientX - this.offsetLeft
        document.ontouchmove = function (e) {
            let jlx = ((e.targetTouches[0].clientX - x) / progress.clientWidth) * 100
            if (jlx <= 100 && jlx >= 0) {
                slide.style.left = jlx + '%'
            }
            audio.currentTime = (jlx / 100) * audio.duration
        }
        document.ontouchend = function (e) {
            document.ontouchmove = null
            document.ontouchend = null
        }
    }
}


const items = document.querySelectorAll('.navigation li')
function setActive() {
    items.forEach((items) => {
        items.classList.remove('active')
    })
    this.classList.add('active')
    current_tag.innerText = this.innerText
}

items.forEach((items) => {
    items.addEventListener('click', setActive)
})
