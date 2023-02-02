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

// responsiveness FOR MOBILE

// let desktopNavbar = document.querySelector(".responsiveness");
let mobileNavbar = document.querySelector(".navbar-mobile");
let mobileMenuButton = document.querySelector("#menu-button");
let mobileCloseButton = document.querySelector("#close-button");

let presentationVideo = document.querySelector(".project-section");

mobileMenuButton.addEventListener("click", () => {
  mobileNavbar.style.display = "block";
  mobileCloseButton.style.display = "block";
  mobileMenuButton.style.display = "none";
  let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if(scroll === 0){
    presentationVideo.style.paddingTop = "200px";
  }else{
    presentationVideo.style.paddingTop = "0px";
  }
} )

mobileCloseButton.addEventListener("click", () => {
  mobileNavbar.style.display = "none";
  mobileCloseButton.style.display = "none";
  mobileMenuButton.style.display = "block";
  presentationVideo.style.paddingTop = "0px";
} )
