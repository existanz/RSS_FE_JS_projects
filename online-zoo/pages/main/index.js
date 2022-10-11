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
