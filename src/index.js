import './index.css';
import './index.html';
import './game.html';
import './gallery.html';
import './data/birds';
console.log("Its start!");
let lang = 'en';

const linkLang = document.querySelector('.menu__link-lang');

const changeLang = () => {
  if (lang=='en') lang = 'ru'
  else lang = 'en'
  linkLang.innerHTML = `Lang [${lang}]`;
  setQuizList();
};
linkLang.addEventListener('click', changeLang);
console.log(lang);


/* GAME JS MOVE THERE because webpack*/
import birdsData from './data/birds';
import emptyBird from './assets/images/bird.jpg'

const curQuiz = document.querySelector('.cur-quiz'),
      curTitle = document.querySelector('.cur-quiz__title'),
      quizList = document.querySelector('.birds__list'),
      birdsInfo = document.querySelector('.birds__info')

const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));


let curStage = 0,
    isPlay = false;
const nextStage = () => curStage++;


let quizBird = birdsData[curStage][rand(0,5)];
const audioQuiz = new Audio();
audioQuiz.src = quizBird.audio;
console.log(quizBird.name[lang]);
console.log(lang);

const showInfo = (el) => () => {
  birdsInfo.innerHTML = '';
  const imgBird = document.createElement('img');
  imgBird.classList.add('birds__info-image')
  imgBird.src = el.image;
  imgBird.height = 150;
  birdsInfo.append(imgBird);
  console.log(imgBird);
  const infoBird = document.createElement('div');
  infoBird.classList.add('birds__info-info');
  infoBird.innerHTML = el.description[lang];
  birdsInfo.append(infoBird);
}

const setQuizList = () => {
  if (quizList) {
    quizList.innerHTML = '';
    birdsData[curStage].forEach(el => {
      const li = document.createElement('li');
      li.classList.add('list__item');
      li.textContent = el.name[lang];
      li.addEventListener('click', showInfo(el));
      quizList.append(li);
    });
  }
}

const setNewStage = () => {
    const curImg = document.querySelector('.cur-quiz__img');
    if (curImg) curImg.style.backgroundImage =  `url(${emptyBird})`;
    setQuizList();
};

setNewStage();

const playButton = document.querySelector('.play');

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
/*END OF GAME JS*/