const logo = document.querySelectorAll('.pet-logo')
logo.forEach(el => {
    el.addEventListener('click', () => {
        document.location.href = "index.html"
    })
})

//TESTIMONIALS SLIDER
const testCards = document.querySelector('.testimonials-cards');
const inputRange = document.querySelector('.range-slider');
let cWidth = 296;
if (screen.width < 1440) cWidth = 323;
window.addEventListener('resize', () => {
    cWidth = 296;
if (screen.width < 1440) cWidth = 323;
})
 inputRange.addEventListener('input', () => {
    testCards.style.left = -inputRange.value*cWidth + 'px';
 });

 //TESTIMONIALS POPUP
 const popCards = document.querySelectorAll('.testimonials-card-pop'),
 testPop = document.querySelector('.testimonials-popup'),
 testPopX = document.querySelector('.popup-x'),
 testShadow = document.querySelector('.testimonials-shadow')
 
 const togglePopup = () => {
    if (screen.width < 980) {
        testPop.classList.toggle('popup');
        testPopX.classList.toggle('popup');
        testShadow.classList.toggle('popup');
    }
 }

 popCards.forEach(el => {
    el.addEventListener('click', () => {
        testPop.innerHTML = el.innerHTML;
        togglePopup();
    })
 })
 testPopX.addEventListener('click', () => {
    togglePopup();
 })
 testShadow.addEventListener('click', () => {
    togglePopup();
 })