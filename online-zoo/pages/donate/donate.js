const logo = document.querySelectorAll('.pet-logo')
logo.forEach(el => {
    console.log('interactive')
    el.addEventListener('click', () => {
        document.location.href = "../main/index.html"
    })
})