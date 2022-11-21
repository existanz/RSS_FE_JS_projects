import birdsData from "./birds";

let lang = 'en';
const curQuiz = document.querySelector('.cur-quiz');
curQuiz.classList.add('hidden');
const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

console.log(rand(1,5));

let curStage = 0;
const nextStage = () => curStage++;
let quizBird = birdsData[curStage][rand(0,5)];
const audioQuiz = new Audio();
audioQuiz.src = quizBird.audio;
console.log(quizBird.name[lang]);
console.log(lang);
audioQuiz.play();