const logo = document.querySelectorAll(".pet-logo"),
rangeSlider = document.querySelector(".feed-slider-range"),
amountInput = document.querySelector(".feed-friend-input"),
arrValues = [5000, 2000, 1000, 500, 250, 100, 50, 25]

logo.forEach(el => {
    el.addEventListener('click', () => {
        document.location.href = "../main/index.html"
    })
})

const setRangeMin = () => {
    const screenWidth = screen.width;
    if (screenWidth>1440) rangeSlider.setAttribute("min","0")
    else if (screenWidth<=1440 && screenWidth>980) rangeSlider.setAttribute("min","1")
    else if (screenWidth<=980) rangeSlider.setAttribute("min","3");
}
setRangeMin();

window.addEventListener('resize', setRangeMin);

const changeRange = () => {
    const rangeTexts = document.querySelectorAll(".feed-slider-itemText");
    rangeTexts.forEach((el,id) => {
            el.classList.remove("feed-slider-item-active");
            if (id==rangeSlider.value) el.classList.add("feed-slider-item-active");
    })
    amountInput.value = arrValues[rangeSlider.value];
    rangeSlider.classList.remove('range-inactive');
}
const clearRange = () => {
    const rangeTexts = document.querySelectorAll(".feed-slider-itemText");
    rangeTexts.forEach((el,id) => {
        el.classList.remove("feed-slider-item-active");
    })
    rangeSlider.classList.add('range-inactive');
}

rangeSlider.addEventListener('change', changeRange);

amountInput.addEventListener('input', () => {
    const iValue = amountInput.value;
    const newRangeValue = arrValues.indexOf(Number(amountInput.value));
        if (newRangeValue<=rangeSlider.getAttribute('max')&& newRangeValue>=rangeSlider.getAttribute('min')) {
            rangeSlider.value = newRangeValue;
            changeRange();
        }
        else {
            clearRange();
        }

    }
)
