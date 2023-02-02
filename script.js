// Force page scroll position to top at page refresh in HTML
window.addEventListener("load", (event) => {
  window.scrollTo(0, 0);
});

// Animate hero-background
const heroBackground = document.querySelector(".hero-background");

document.querySelector(".hero-background-overlay").addEventListener("mousemove", (e) => {
  heroBackground.style.backgroundPositionX = -e.offsetX*0.015 + "px";
  heroBackground.style.backgroundPositionY = -e.offsetY*0.015 + "px";

});


// Add blur background to navbar on scroll
const navbar =  document.querySelector(".navbar-dimensions");

window.addEventListener("scroll", (e) => {
    let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scroll > 50) {
        navbar.style.backdropFilter = `blur(10px)`;
     } else {
        navbar.style.backdropFilter = `blur(0px)`;
     }
});
// scroll opacity change
window.addEventListener('scroll', (e) => {
  let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  // in this case opacity goes from 0 --> 1 
  let opacityHeroAbout =  (scroll /600);
  if(opacityHeroAbout <=1 ) {
    document.querySelector(".hero-background-overlay ").style.opacity = opacityHeroAbout;
    document.querySelector(".about-section ").style.opacity = opacityHeroAbout;
    
    if(opacityHeroAbout >= 0.6){
      document.querySelector(".marquee-wrapper").style.opacity = 1;
      document.querySelector(".about-content").style.opacity = 1;
    }
  }else{
    document.querySelector(".hero-background-overlay ").style.opacity = 1;
    document.querySelector(".about-section ").style.opacity = 1;
  }

  // scroll to top button
  if(scroll > 600){
    document.querySelector("#scroll-top").style.visibility = "visible";
    document.querySelector("#scroll-top").style.opacity = "1";
  }
  if(scroll < 600){
    document.querySelector("#scroll-top").style.visibility = "hidden";
    document.querySelector("#scroll-top").style.opacity = "0";
  }

}
)
// scroll to top
document.querySelector("#scroll-top").addEventListener("click", () => {
  window.scrollTo(0,0);
})


const slide = document.querySelector('.slide');
let slideIndex = 1;
let isMoving = false;

function processImages(item){
  return  `<img src="${item.url}" alt="${item.alt}">`;
}

function moveSlides(){
  slide.style.transform =`translateX(-${slideIndex * 100}%)`;
  const slidesArray = [...slide.querySelectorAll('img')];
  document.documentElement.style.setProperty('--slide-progress', `${(100 / (slidesArray.length -3)) * (slideIndex -1)}%`);
  // add corespondent content for each slide
  processContent();
}

//  move when clicked
function moveHandler(direction){
  isMoving = true;
  slide.style.transition = 'transform 450ms ease-in-out';
  direction !== 'right' ? (slideIndex -= 1) :(slideIndex += 1);
  moveSlides();
}

//  fetch images 
async function fetchImages(){
  await fetch('images.json')
    .then((response) => {
      if(!response.ok){
        throw new Error('Network response was not okay');
      }
      return response.json();
    })
    .then((data) => {
      //  cloned first and last image
      data.push(data[0]);
      data.unshift(data[data.length - 2])
      //  show slider
      slide.innerHTML = data.map(processImages).join('');
      moveSlides();
    })
    .catch((error) => {
      console.log('There has been a problem with your fetch operation:', error);
    })
}

fetchImages();

// keyboard arrow handler
window.addEventListener('keyup', e => {
  if(isMoving){
    return;
  }
  switch (e.key){
    case 'ArrowLeft':
      moveHandler()
      break;
    case 'ArrowRight':
      moveHandler('right')
      break;
    default:
      break;
  }
})
//  click right btn
document.querySelector('.slider-btn-right').addEventListener('click', () =>{
  if(isMoving){
    return;
  }
  moveHandler('right');
})
//  click left btn
document.querySelector('.slider-btn-left').addEventListener('click', () =>{
  if(isMoving){
    return;
  }
  moveHandler('');
})

slide.addEventListener('transitionend', () => {
  isMoving= false;
  const slidesArray = [...slide.querySelectorAll('img')];
  document.documentElement.style.setProperty('--slide-progress--transition', `${slideIndex === slidesArray.length - 1 ? 'none' : 'all 400ms cubic-bezier(0.82, 0.02, 0.39, 1.01)' }%`);
  if(slideIndex === 0){
    slide.style.transition = 'none';
    slideIndex = slidesArray.length - 2;
    moveSlides();
  }
  if(slideIndex ===  slidesArray.length - 1){
    slide.style.transition = 'none';
    slideIndex = 1;
    moveSlides();
  }
})

const slideContent = document.querySelector('.project-info');
const slideContentArray=[];

//  fetch images 
async function fetchSlideContent(){
  await fetch('projects.json')
    .then((response) => {
      if(!response.ok){
        throw new Error('Network response was not okay');
      }
      return response.json();
    })
    .then((data) => {
      // each image will have a title and an icon, that`s why we need to create copies of data as in the case above
      data.push(data[0]);
      data.unshift(data[data.length - 2])
      // put data on an external block variable so it can be accesible everywhere
      data.forEach(element => {
        slideContentArray.push(element);
      });
      
    })
    .catch((error) => {
      console.log('There has been a problem with your fetch operation:', error);
    })
}

fetchSlideContent();

function processContent(){
  slideContent.innerHTML = `
  <div class="project-title">
    <img src=${slideContentArray[slideIndex].url} alt="">
    <h1>${slideContentArray[slideIndex].title}</h1>
  </div>
  <div class="read-more-button">
    <a href="./Projects/${slideContentArray[slideIndex].title}/${slideContentArray[slideIndex].title}.html">
      <span>take a look</span>
    </a>
  </div>
`;
} 

// CONTACT ERROR MESSAGES
// input selectors
let nameInput = document.querySelector('#input-name');
let emailInput = document.querySelector('#input-email');
let subjectInput = document.querySelector('#input-subject');
let messageInput = document.querySelector('#input-message');

// output selectors
let nameError = document.querySelector(".name-error");
let emailError = document.querySelector('.email-error');
let subjectError = document.querySelector('.subject-error');
let messageError = document.querySelector('.message-error');
let submitError = document.querySelector('.submit-error');

function onlyLetters(str) {
  return /^[a-zA-Z ]+$/.test(str);
}

function blurEventFuncName() {
  if (this.value === ''){
      this.style.border = "2px solid var(--blue)";
      nameError.innerHTML = "Can't be blank";
      countErrors(0,1);
  }else if(!onlyLetters(this.value)){
      nameError.innerHTML = "Wrong format, letters only";
      this.style.border = "2px solid var(--blue)";
      countErrors(0,1);
  } else {
      this.style.border = "1px solid var(--dark)";
      nameError.innerHTML = "";
      countErrors(0,0);
}
}
nameInput.addEventListener('blur', blurEventFuncName);


function blurEventFuncEmail()
{
  var email = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

  if(this.value === ''){
      this.style.border = "2px solid var(--blue)";
      emailError.innerHTML = "Can't be blank";
      countErrors(0,1);
  }else if(!this.value.match(email)){
      this.style.border = "2px solid var(--blue)";
      emailError.innerHTML = "Wrong format!";
      countErrors(0,1);
  }else{
      this.style.border = "1px solid var(--dark)";
      emailError.innerHTML = "";
      countErrors(0,0);
  }
}
emailInput.addEventListener('blur', blurEventFuncEmail);

function blurEventFuncSubject() {
  if (this.value === ''){
      this.style.border = "2px solid var(--blue)";
      subjectError.innerHTML = "Can't be blank";
      countErrors(1,1);
  }else{
      this.style.border = "1px solid var(--dark)";
      subjectError.innerHTML = "";
      countErrors(1,0);
  }
}
subjectInput.addEventListener('blur', blurEventFuncSubject);

function blurEventFuncMessage() {
  if (this.value === ''){
      this.style.border = "2px solid var(--blue)";
      messageError.innerHTML = "Can't be blank";
      countErrors(2,1);
  }else{
      this.style.border = "1px solid var(--dark)";
      messageError.innerHTML = "";
      countErrors(2,0);
  }
}
messageInput.addEventListener('blur', blurEventFuncMessage);

let errors = [1, 1, 1];
function countErrors(index, value){
    errors[index] = value;
}
// verify to have 0 errors
function verifyIfComplet(){
  for(let i = 0; i < 3; i++){
      if(errors[i] === 1 ){
          return false;
      }
  }
  return true;
}

// prevent refreshing page when sumbit was clicked
document.querySelector(".contact-form").addEventListener('submit', function (event){
  event.preventDefault();
})

function Submit(){
  if(!verifyIfComplet()){
    submitError.innerHTML = "You must have all the relevant fields filled out";
  }
  // need to complete with sending message function itself
}

// responsiveness FOR MOBILE
let mobileNavbar = document.querySelector(".navbar-mobile");
let mobileMenuButton = document.querySelector("#menu-button");
let mobileCloseButton = document.querySelector("#close-button");

let heroContent = document.querySelector(".hero-content");

mobileMenuButton.addEventListener("click", () => {
  mobileNavbar.style.display = "block";
  mobileCloseButton.style.display = "block";
  mobileMenuButton.style.display = "none";
  
  let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if(scroll === 0){
    heroContent.style.top = "300px";
  }else{
    heroContent.style.top = "20%";
  }
} )

mobileCloseButton.addEventListener("click", () => {
  mobileNavbar.style.display = "none";
  mobileCloseButton.style.display = "none";
  mobileMenuButton.style.display = "block";
  heroContent.style.top = "20%";
} )


