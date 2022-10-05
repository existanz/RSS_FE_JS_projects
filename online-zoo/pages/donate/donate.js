const logo = document.querySelectorAll('.pet-logo')
logo.forEach(el => {
    console.log('interactive')
    el.addEventListener('click', () => {
        document.location.href = "../main/index.html"
    })
})
console.log(screen.width);
if (screen.width<1440) {
    console.log(document.querySelector(".feed-slider-range"));
    document.querySelector(".feed-slider-range").setAttribute("min","1");
}