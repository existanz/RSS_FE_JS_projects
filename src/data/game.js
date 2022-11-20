import birdsData from "./birds";

const curQuiz = document.querySelector('.cur-quiz');
curQuiz.classList.add('hidden');
const rand = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};
console.log(rand(1,5));