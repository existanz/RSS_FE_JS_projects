import './index.css';
import './index.html';
import './game.html';
import './gallery.html';
import './data/birds';
import './data/game';
console.log("Its start!");
let lang = 'en';

const linkLang = document.querySelector('.menu__link-lang');

const changeLang = () => {
  if (lang=='en') lang = 'ru'
  else lang = 'en'
  linkLang.innerHTML = `Lang [${lang}]`;
};
linkLang.addEventListener('click', changeLang);
console.log(lang);
