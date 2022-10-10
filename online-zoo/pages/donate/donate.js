const logo = document.querySelectorAll(".pet-logo"),
rangeSlider = document.querySelector(".feed-slider-range") 

logo.forEach(el => {
    el.addEventListener('click', () => {
        document.location.href = "../main/index.html"
    })
})

const setRangeMin = () => {
    const screenWidth = screen.width;
    console.log(screenWidth);
    if (screenWidth>1440) rangeSlider.setAttribute("min","0")
    else if (screenWidth<=1440 && screenWidth>980) rangeSlider.setAttribute("min","1")
    else if (screenWidth<=980) rangeSlider.setAttribute("min","2");
}

setRangeMin();
window.addEventListener('resize', setRangeMin);

const changeRange = () => {
    console.log(rangeSlider.value);
    const rangeTexts = document.querySelectorAll(".feed-slider-itemText"),
    amountInput = document.querySelector(".feed-friend-input"),
    arrValues = [5000, 2000, 1000, 500, 250, 100, 50, 25]
    rangeTexts.forEach((el,id) => {
            el.classList.remove("feed-slider-item-active");
            if (id==rangeSlider.value) el.classList.add("feed-slider-item-active");
    })
    amountInput.value = arrValues[rangeSlider.value];

}
rangeSlider.addEventListener('change', changeRange);
