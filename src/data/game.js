import birdsData from './birds';
import emptyBird from '../assets/images/bird.jpg'

let lang = 'ru';
const curQuiz = document.querySelector('.cur-quiz'),
      curTitle = document.querySelector('.cur-quiz__title'),
      quizList = document.querySelector('.birds__list')

const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));


let curStage = 0,
    isPlay = false;
const nextStage = () => curStage++;


let quizBird = birdsData[curStage][rand(0,5)];
const audioQuiz = new Audio();
audioQuiz.src = quizBird.audio;
console.log(quizBird.name[lang]);
console.log(lang);

const setQuizList = () => {
  birdsData[curStage].forEach(el => {
    const li = document.createElement('li');
    li.classList.add('list__item');
    li.textContent = el.name[lang];
    quizList.append(li);
  });
}

const setNewStage = () => {
    const curImg = document.querySelector('.cur-quiz__img')
    curImg.style.backgroundImage =  `url(${emptyBird})`;
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
  playButton.addEventListener('click', playPauseAudio);