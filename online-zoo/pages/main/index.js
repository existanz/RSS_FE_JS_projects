const arrPets = [
    {
      img: "../../assets/images/pets/pandas.png",
      title: "Giant pandas",
      location: "Native to Southwest China",
      food: "../../assets/icons/vegetables.svg",
    },
    {
      img: "../../assets/images/pets/eagle.png",
      title: "Eagles",
      location: "Native to South America",
      food: "../../assets/icons/meatfish.svg",
    },
    {
      img: "../../assets/images/pets/gorilla.png",
      title: "Gorillas",
      location: "Native to Congo",
      food: "../../assets/icons/vegetables.svg",
    },
    {
      img: "../../assets/images/pets/sloth.png",
      title: "Two-toed sloth",
      location: "Mesoamerica, South America",
      food: "../../assets/icons/vegetables.svg",
    },
    {
      img: "../../assets/images/pets/cheetahs.png",
      title: "Cheetahs",
      location: "Native to Africa",
      food: "../../assets/icons/meatfish.svg",
    },
    {
      img: "../../assets/images/pets/penguin.png",
      title: "Penguins",
      location: "Native to Antarctica",
      food: "../../assets/icons/meatfish.svg",
    },
    {
      img: "../../assets/images/pets/alligator.png",
      title: "Alligators",
      location: "Native to Southeastern U. S.",
      food: "../../assets/icons/meatfish.svg",
    },
    {
      img: "../../assets/images/pets/armadillo.png",
      title: "Armadillo",
      location: "Native to America",
      food: "../../assets/icons/meatfish.svg",
    },
    {
      img: "../../assets/images/pets/turtle.png",
      title: "Arakan forest turtle",
      location: "Native to Arakan Hills",
      food: "../../assets/icons/meatfish.svg",
    },
    {
      img: "../../assets/images/pets/quokka.png",
      title: "Quokkas",
      location: "Native to Rottnest Island",
      food: "../../assets/icons/vegetables.svg",
    },
    {
      img: "../../assets/images/pets/sleepy.png",
      title: "Sleepy",
      location: "Native to Eastern Himalayas",
      food: "../../assets/icons/meatfish.svg",
    },
    {
      img: "../../assets/images/pets/tryceratops.png",
      title: "Tryceratops",
      location: "Native to Pangea",
      food: "../../assets/icons/vegetables.svg",
    },
    {
      img: "../../assets/images/pets/giraffe.png",
      title: "Giraffe",
      location: "Native to Africa",
      food: "../../assets/icons/vegetables.svg",
    },
    {
      img: "../../assets/images/pets/koala.png",
      title: "Koala",
      location: "Native to South Australia",
      food: "../../assets/icons/vegetables.svg",
    },
    {
      img: "../../assets/images/pets/elephant.png",
      title: "Elephant",
      location: "Native to Africa",
      food: "../../assets/icons/vegetables.svg",
    },
    {
      img: "../../assets/images/pets/chacoan-peccary.png",
      title: "Chacoan peccary",
      location: "Native to Gran Chaco",
      food: "../../assets/icons/vegetables.svg",
    },
    {
      img: "../../assets/images/pets/platypus.png",
      title: "Platypus",
      location: "Native to Australia",
      food: "../../assets/icons/meatfish.svg",
    },
    {
      img: "../../assets/images/pets/heena.png",
      title: "Heena",
      location: "Native to Africa",
      food: "../../assets/icons/meatfish.svg",
    },
];

//PETS CAROUSEL

const animalLeft = document.querySelector(".animal-left"),
animalCenter = document.querySelector(".animal-center"),
animalRight = document.querySelector(".animal-right"),
animalLLeft = document.querySelector(".animal-left-left"),
animalRRight = document.querySelector(".animal-right-right"),
animalWraper = document.querySelector(".animals-wraper"),
nextBtn = document.querySelector(".arrow-right"),
prevBtn = document.querySelector(".arrow-left")

let slideWidth = 1550,
q=1;
if (screen.width <=1440) slideWidth = 1000;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    console.log('shuffled')
}
function getPets(data) {
    data.slice(0, 6).forEach(({img, title, location, food}) => {
      const petsCardLeft = document.createElement("article");
      petsCardLeft.classList.add("animal-card");
  
      petsCardLeft.innerHTML = `
        <img
          src="${img}"
          alt="${title}"
          class="animal-card-img"
        />
        <div class="animal-card-desc">
          <div class="animal-card-text">
            <h3 class="animal-card-title">${title}</h3>
            <p class="animal-card-area">${location}</p>
          </div>
          <img 
            src="${food}"
            alt="" 
            class="card-icon"
          />
        </div>
      `;
      animalLeft.append(petsCardLeft);
      animalRRight.append(petsCardLeft.cloneNode(true));
    });
  
    data.slice(6, 12).forEach(({img, title, location, food}) => {
      const petsCenter = animalCenter;
      const petsCardCenter = document.createElement("article");
      petsCardCenter.classList.add("animal-card");
  
      petsCardCenter.innerHTML = `
        <img
          src="${img}"
          alt="${title}"
          class="animal-card-img"
        />
        <div class="animal-card-desc">
          <div class="animal-card-text">
            <h3 class="animal-card-title">${title}</h3>
            <p class="animal-card-area">${location}</p>
          </div>
          <img 
            src="${food}"
            alt="" 
            class="card-icon"
          />
        </div>
      `;
      petsCenter.append(petsCardCenter);
    });
  
    data.slice(12).forEach(({img, title, location, food}) => {
      const petsCardRight = document.createElement("article");
      petsCardRight.classList.add("animal-card");
  
      petsCardRight.innerHTML = `
        <img
          src="${img}"
          alt="${title}"
          class="animal-card-img"
        />
        <div class="animal-card-desc">
          <div class="animal-card-text">
            <h3 class="animal-card-title">${title}</h3>
            <p class="animal-card-area">${location}</p>
          </div>
          <img 
            src="${food}"
            alt="" 
            class="card-icon"
          />
        </div>
      `;
      animalRight.append(petsCardRight);
      animalLLeft.append(petsCardRight.cloneNode(true));
    });
}
shuffle(arrPets);
getPets(arrPets);
animalWraper.style.transform = `translateX(${-slideWidth*q}px)`

function nextSlide() {
        q++;
        if(q>4) q=0;
        animalWraper.style.transform = `translateX(${-slideWidth*q}px)`;
        console.log(q);
  }
  
  function prevSlide() {
        q--;
        if (q<0) q=4;
        animalWraper.style.transform = `translateX(${-slideWidth*q}px)`;
        console.log(q)
  }
  
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  //LOGO LINK
const logo = document.querySelectorAll('.pet-logo')
logo.forEach(el => {
    el.addEventListener('click', () => {
        document.location.href = "index.html"
    })
})

//TESTIMONIALS SLIDER
const testCards = document.querySelector('.testimonials-cards');
const inputRange = document.querySelector('.range-slider');
cWidth = 296;
inputRange.setAttribute('max','7');
if (screen.width < 1440) {
cWidth = 323;
inputRange.setAttribute('max','8');
}
window.addEventListener('resize', () => {
    location.reload()
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