import './index.css';
import './index.html';
import './game.html';
import './gallery.html';
import './results.html';
import './data/birds';

let lang = 'en';

// local storage S A V E   A N D   L O A D
getLocalStorage();

function setLocalStorage() {
  localStorage.setItem('language', lang);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('language')) {
    lang = (localStorage.getItem('language'))
  }
  else lang = 'en';
}

window.addEventListener('load', getLocalStorage);

const linkLang = document.querySelectorAll('.menu__link-lang');

const changeLang = () => {
  if (lang=='en') lang = 'ru'
  else lang = 'en'
  showLang();
  setGreet();
  setStages();
  setQuizList();
  defaulBirdInfo();
  showBirdInfo();
  showMenu();
  showResults();
};

const showLang = () => {
  linkLang[0].innerHTML = `Lang [${lang}]`;
  linkLang[1].innerHTML = `Lang [${lang}]`;
}

showLang();

linkLang[0].addEventListener('click', changeLang);
linkLang[1].addEventListener('click', changeLang);

console.log('Всем кто ждал меня до последнего - спасибо. Я стараюсь, и ваша поддержка меня очень мотивирует!');

const translate = {
  en: {
    menu: {
      home: 'Home',
      game: 'Game',
      gallery: 'Gallery'
    },
    results: {
      congrats: 'Congratulation yove earned 30 points of 30',
      promt: 'try to play one more time',
      restartbutton: 'restart game'
    },
    misc: {
      greetings: 'Welcome to songbird quiz!',
      greetlink: 'press <a class="greetings__link" href="./game.html">play</a> to start the game!',
      score: 'Score',
      birdsinfo: 'Listen to the player and select the name of the bird whose voice sounded',
      levels: ['warm-up', 'passerine','forest birds','songbirds','predator birds','sea birds'],
      nextbutton: 'next level'
    }
  },
  ru: {
    menu: {
      home: 'Главная',
      game: 'Викторина',
      gallery: 'Галлерея'
    },
    results: {
      congrats: 'Поздравляем! вы набрали 30 очков из 30',
      promt: 'попробуйте сыграть ещё раз',
      restartbutton: 'Сыграть ещё раз'
    },
    misc: {
      greetings: 'Добро пожаловать в викторину Songbird',
      greetlink: 'для начала игры нажми <a class="greetings__link" href="./game.html">играть</a> !',
      score: 'Score',
      birdsinfo: 'Прослушайте плеер и выберите название птицы чей голос прозвучал',
      levels: ['разминка', 'воробьиные','лесные птицы','певчие птицы','хищные птицы','морские птицы'],
      nextbutton: 'далее'
    }

  }
};

const showMenu = () => {
  const menuItems = document.querySelectorAll('.menu__link');
  menuItems[0].innerHTML = translate[lang].menu.home;
  menuItems[1].innerHTML = translate[lang].menu.game;
  menuItems[2].innerHTML = translate[lang].menu.gallery;
  menuItems[4].innerHTML = translate[lang].menu.home;
  menuItems[5].innerHTML = translate[lang].menu.game;
  menuItems[6].innerHTML = translate[lang].menu.gallery;
}
showMenu();

const setGreet = () => {
  const greetTitle = document.querySelector('.greetings__title'),
        greetSubtitle = document.querySelector('.greetings__subtitle');
  if (greetTitle)
  greetTitle.innerHTML = translate[lang].misc.greetings;
  if (greetSubtitle)
  greetSubtitle.innerHTML = translate[lang].misc.greetlink;
}
setGreet();


/* GAME JS MOVE THERE because webpack*/
import birdsData from './data/birds';
import emptyBird from './assets/images/bird.jpg'

const curQuiz = document.querySelector('.cur-quiz'),
      curTitle = document.querySelector('.cur-quiz__title'),
      curImg = document.querySelector('.cur-quiz__img'),
      quizList = document.querySelector('.birds__list'),
      birdsInfo = document.querySelector('.birds__info')

const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));


let curStage = 0,
    isPlay = false,
    curScore = 0,
    score = 0

const nextStage = () => curStage++;

const setStages = () => {
  const quizLevels = document.querySelector('.quiz__levels');
  if (quizLevels) {
    quizLevels.innerHTML = '';
    translate[lang].misc.levels.forEach((el, id) => {
      const level = document.createElement('div');
      level.innerHTML = el;
      level.classList.add('level');
      if (id == curStage) level.classList.add('active');
      quizLevels.append(level);
    });
  }
};

setStages();

let quizBird = birdsData[curStage][rand(0,5)],
    selBird = false;
const audioQuiz = new Audio();
audioQuiz.src = quizBird.audio;
const correctAudio = new Audio();
correctAudio.src = './assets/correct.mp3';
const wrongAudio = new Audio();
wrongAudio.src = './assets/wrong.mp3';
console.log(quizBird.name[lang]);

const setQuizBird = () => {
  quizBird = birdsData[curStage][rand(0,5)];
  audioQuiz.src = quizBird.audio;
}

let correctFlag = false;

const nextLevel = () => {
  if (correctFlag) {
    if (curStage==5) window.location.href = './results.html';
    nextStage();
    setNewStage();
    correctFlag = false;
    setNextButton();
    setStages();
    setQuizBird();
    selBird = false;
    defaulBirdInfo();
  }
}

const nextButton = document.querySelector('.next-button'),
      setNextButton = () => {
        if (nextButton) {
          nextButton.innerHTML = translate[lang].misc.nextbutton;
          if (correctFlag) nextButton.classList.add('active') 
          else nextButton.classList.remove('active');
        }
      }

setNextButton();
if (nextButton)
nextButton.addEventListener('click', nextLevel);

const setSelBird = (el) => (li) => {
  selBird = el;
  if(el.id == quizBird.id) {
    correctAudio.play();
    if (!correctFlag) li.target.classList.add('correct');
    correctFlag = true;
    nextButton.classList.add('active');
    audioQuiz.pause();
    curImg.style.backgroundImage = `url(${el.image})`;
    curTitle.innerHTML = el.name[lang];
    console.log(el.image,curImg);
  }
  else {
    wrongAudio.play();
    if(!correctFlag) li.target.classList.add('wrong');
  }
  showBirdInfo();
}
const defaulBirdInfo = () => {
  if(birdsInfo)
  birdsInfo.innerHTML = translate[lang].misc.birdsinfo;
}
defaulBirdInfo();
const showBirdInfo = () => {
  if (selBird) {
    birdsInfo.innerHTML = '';
    const imgBird = document.createElement('img');
    imgBird.classList.add('birds__info-image')
    imgBird.src = selBird.image;
    imgBird.height = 150;
    birdsInfo.append(imgBird);
    const infoBird = document.createElement('div');
    infoBird.classList.add('birds__info-info');
    infoBird.innerHTML = selBird.description[lang];
    birdsInfo.append(infoBird);
  }
}


const setQuizList = () => {
  if (quizList) {
    quizList.innerHTML = '';
    birdsData[curStage].forEach(el => {
      const li = document.createElement('li');
      li.classList.add('list__item');
      li.textContent = el.name[lang];
      li.addEventListener('click', setSelBird(el));
      quizList.append(li);
    });
  }
}

const setNewStage = () => {
  console.log(2);
    if (curImg) curImg.style.backgroundImage =  `url(${emptyBird})`;
    if (curTitle) curTitle.innerHTML = '***********';
    setQuizList();
};

setNewStage();

//RESULTS HTML
const showResults = () => {
  const restartButton = document.querySelector('.restart__button');
  if (restartButton) restartButton.innerHTML = translate[lang].results.restartbutton;
  const resultTitle = document.querySelector('.result__title');
  if (resultTitle) resultTitle.innerHTML = translate[lang].results.congrats;
  const resultSubtitle = document.querySelector('.result__subtitle');
  if (resultSubtitle) resultSubtitle.innerHTML = translate[lang].results.promt;
}
//END OF RESULTS
showResults();


/**PLAYER */
const playButton = document.querySelector('.play'),
timeline = document.querySelector('.timeline'),
audioLen = document.querySelector('.length'),
audioName = document.querySelector('.song-name'),
volumeButton = document.querySelector('.volume-button'),
volumeEl = document.querySelector('.volume'),
volumeSlider = document.querySelector('.volume-slider'),
volumePercentage = document.querySelector('.volume-percentage'),
progressBar = document.querySelector('.progress'),
currentDuration = document.querySelector('.duration .current')

const playPauseAudio = () => {
    if (!isPlay) {
      isPlay = true;
      playButton.classList.add('pause');
      audioQuiz.play();
    } else {
      isPlay = false;
      playButton.classList.remove('pause');
      audioQuiz.pause();
    }
  };
  if (playButton) playButton.addEventListener('click', playPauseAudio);

//audioQuiz.addEventListener('ended', playNext);

audioQuiz.addEventListener(
  "loadeddata",
  () => {
    //audioName.textContent = document.querySelector('.item-active .song-name').textContent;
    if(audioLen)
    audioLen.textContent = getTimeCodeFromNum(audioQuiz.duration);
    //audioQuiz.volume = .75;
  },
  false
);

//progress bar
//click on timeline to skip around
if (timeline)
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audioQuiz.duration;
  audioQuiz.currentTime = timeToSeek;
}, false);
//check audio percentage and update time accordingly
setInterval(() => {
  if (progressBar)
  progressBar.style.width = audioQuiz.currentTime / audioQuiz.duration * 100 + "%";
  if (currentDuration)
  currentDuration.textContent = getTimeCodeFromNum(audioQuiz.currentTime);
}, 500);
//volume slider click change volume
if(volumeSlider)
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audioQuiz.volume = newVolume;
  volumePercentage.style.width = newVolume * 100 + '%';
}, false)

//volume button mute\unmute
if(volumeButton)
volumeButton.addEventListener("click", () => {
  audioQuiz.muted = !audioQuiz.muted;
  if (audioQuiz.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

/*END OF GAME JS*/

