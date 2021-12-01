var navbar = document.getElementById("navbar");

/* NAVBAR - ON TOP */

var atTop = false;
var x = "";

document.addEventListener("scroll", e => {

  if (scrollY <= (window.innerHeight * 0.1)) {
    if (!atTop) {
        navbar.classList.remove('ftco-navbar-light-scrolled', 'ftco-navbar-light-scrolled-resize', 'bg-none');
        atTop = true;
    }
  } else {
    navbar.classList.add('ftco-navbar-light-scrolled', 'ftco-navbar-light-scrolled-resize', 'bg-none');
    atTop = false;
  }
});


/* SECTIONS SCROLLING LISTENER */

const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav .container-fluid div ul li');

window.addEventListener("scroll", e => {
  let current = '';
  let currentForAnimations = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    var x = 0;

    if (section.id === "exper-educ")
      x = section.clientHeight/5;

    if(scrollY >= (sectionTop - sectionHeight / 3) + x) {
      current = section.getAttribute('id');
    }

    if(scrollY >= ((sectionTop - sectionHeight / 3) - 200)) {
      currentForAnimations = section.getAttribute('id');
    }
  });

  navLi.forEach(li => {
    li.classList.remove('active');
    if(li.id === ("nav-"+current)){
      li.classList.add('active');

      const pipeLines = document.querySelectorAll('#line-pipe');
      const contactLines = document.querySelectorAll('#mail-phone-frame');
      var i = 1;

      if(current === "about") {
        pipeLines.forEach(pipeLine => {
          pipeLine.classList.add('line-animate-forward-'+i);
          i++;
          if(i > 4)
            i == 1;
        });
      }
      if(currentForAnimations === "contact") {
        contactLines.forEach(contactLine => {
          contactLine.classList.add('contact-lines');
        });
      }
    }
  });
});


