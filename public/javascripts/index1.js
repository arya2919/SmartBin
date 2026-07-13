function locomotive(){
    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
    
    
    
  }
  locomotive();
 

  function cursorAnimation (){
    var page1Content = document.querySelector(".page1-content");
  var cursor1 = document.querySelector(".cursor1");
  
  page1Content.addEventListener("mousemove", function (key) {
    gsap.to(cursor1, {
        x: key.x,
        y: key.y
    })
  })
  page1Content.addEventListener("mouseenter",function(){
    gsap.to(cursor1, {
        scale:1,
        opacity:1
     })
  })
  page1Content.addEventListener("mouseleave",function(){
    gsap.to(cursor1, {
       scale:0,
       opacity:0
    })
  })
  };
  cursorAnimation();
  
  function page2Animation(){
    gsap.from(".services .container h3",{
        y:60,
        stagger:0.2,
        duration:1,
        opacity:0,
        scrollTrigger:{
            trigger:".page2",
            scroller:".main",
            start:"top 40%",
            end: "top 37%",
            // markers:true,
            scrub:2,
        }
    })
    }
    page2Animation();


   
//page 3 animation
var t1=gsap.timeline();
t1.from(".main-content .about",{
    opacity:0,
    y:60,
    stagger:0.5,
    delay:2,
    duration:0.9,
    scrollTrigger:{
        trigger:".page3",
        scroller:".main",
        start:"top 60%",
        //markers:true,
        end:"top 40%",
        scrub:1,
    }
})


    function loader() {
      return new Promise((resolve) => {
        window.addEventListener('load', () => {
          const preLoader = document.querySelector(".pre-loader");
          const navbar = document.querySelector("nav"); // select the navbar
          const tl = gsap.timeline();
          
          tl.to(".pre-loader h3", {
            opacity: 0,
            x: -10,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.in"
          })
          .to(preLoader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              preLoader.style.display = "none";
              navbar.style.opacity = 1; // show the navbar
              resolve();
            }
          });
        });
      });
    }
    
    // Use async/await to ensure loader is complete before initializing other functions
    async function init() {
      await loader();
      locomotive();
      cursorAnimation();
      // Call other init functions here
    }
    init();


function swiper(){
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,

    autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
    
  });

}
swiper();

  //userIcon

  document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.getElementById('userIcon');
    const loginDropdown = document.getElementById('loginDropdown');
  
    userIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        loginDropdown.classList.toggle('show');
    });
  
    document.addEventListener('click', function(event) {
        if (!event.target.matches('#userIcon')) {
            if (loginDropdown.classList.contains('show')) {
                loginDropdown.classList.remove('show');
            }
        }
    });
  });


  //menuIcon

  document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menuIcon');
    const menuDropdown = document.getElementById('MenuDropdown');
  
    menuIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      menuDropdown.classList.toggle('show');
    });
  
    document.addEventListener('click', (event) => {
      if (!event.target.matches('#menuIcon') && menuDropdown.classList.contains('show')) {
        menuDropdown.classList.remove('show');
      }
    });
  });

    
