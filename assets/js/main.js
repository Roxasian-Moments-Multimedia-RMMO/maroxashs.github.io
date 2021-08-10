/**
* MARHS WEBSITE ver. 008 (ALPHA)
* Author : Vincent Ferrer
* Ask Vincent Ferrer for changes/updates
*/

(function() {
    "use strict";
    /**
     * EASY SELECTOR HELPER FUNCTION
     */
     const select = (el, all = false) => {
        el = el.trim()
        if (all) {
          return [...document.querySelectorAll(el)]
        } else {
          return document.querySelector(el)
        }
      }
    /**
     * EASY EVENT LISTENER FUNCTION
     */
     const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
          if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
          } else {
            selectEl.addEventListener(type, listener)
          }
        }
      }
    /**
     * EASY ON SCROLL EVENT LISTENER
     */
     const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
      }
    /**
     * NAVIGATION LINKS ACTIVE STATE ON SCROLL
     */
     let navbarlinks = select('#navbar .scrollto', true)
     const navbarlinksActive = () => {
       let position = window.scrollY + 200
       navbarlinks.forEach(navbarlink => {
         if (!navbarlink.hash) return
         let section = select(navbarlink.hash)
         if (!section) return
         if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
           navbarlink.classList.add('active')
         } else {
           navbarlink.classList.remove('active')
         }
       })
     }
     window.addEventListener('load', navbarlinksActive)
     onscroll(document, navbarlinksActive)
    /**
     * SCROLL TO AN ELEMENT WITH A HEADER OFFSET
     */
     const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight
        if (!header.classList.contains('header-scrolled')) {
          offset -= 16
        }
        let elementPos = select(el).offsetTop
        window.scrollTo({
          top: elementPos - offset,
          behavior: 'smooth'
        })
      }
    /**
     * FIXED HEADER TOP ON SCROLL
     */
     let selectHeader = select('#header')
     if (selectHeader) {
       let headerOffset = selectHeader.offsetTop
       let nextElement = selectHeader.nextElementSibling
       const headerFixed = () => {
         if ((headerOffset - window.scrollY) <= 0) {
           selectHeader.classList.add('fixed-top')
           nextElement.classList.add('scrolled-offset')
         } else {
           selectHeader.classList.remove('fixed-top')
           nextElement.classList.remove('scrolled-offset')
         }
       }
       window.addEventListener('load', headerFixed)
       onscroll(document, headerFixed)
     }
     /**
      * BACK TO TOP BUTTON
      */
     let backtotop = select('.back-to-top')
     if (backtotop) {
       const toggleBacktotop = () => {
         if (window.scrollY > 100) {
           backtotop.classList.add('active')
         } else {
           backtotop.classList.remove('active')
         }
       }
       window.addEventListener('load', toggleBacktotop)
       onscroll(document, toggleBacktotop)
     }
    /**
     * TOGGLE RESPONSIVE MOBILE NAVIGATION
     */
     on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
      })
    /**
     * MOBILE NAVIGATION DROPDOWN ACTIVATION
     */
     on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
          e.preventDefault()
          this.nextElementSibling.classList.toggle('dropdown-active')
        }
      }, true)
    /**
     * SCROLL WITH AN OFFSET ON LINKS WITH A CLASS NAME .scrollto
     */
     on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
          e.preventDefault()
    
          let navbar = select('#navbar')
          if (navbar.classList.contains('navbar-mobile')) {
            navbar.classList.remove('navbar-mobile')
            let navbarToggle = select('.mobile-nav-toggle')
            navbarToggle.classList.toggle('bi-list')
            navbarToggle.classList.toggle('bi-x')
          }
          scrollto(this.hash)
        }
      }, true)
    /**
     * PRELOADER
     */
    let preloader = select ('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove()
      });
    }
    /**
     * STELLAR PARALLAX HERO
     */
     $(window).stellar({
        responsive: false,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
    });
    /**
     * ANIMATION ON SCROLL (AOS LIBRARY)
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration:1100,
            easing: 'ease-in-out',
            mirror: true,
            offset: 100
        })
    });
    /**
     * INITIATE GLIGHTBOX LIBRARY
     */
    const glightbox = GLightbox ({
        selector: '.glightbox'
    });
    /**
     * ABOUT SWIPER
     */
    var swiper = new Swiper(".aboutSwiper", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freemode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var swiper = new Swiper(".aboutSwiper2", {
        loop: true,
        spaceBetween: 5,
        thumbs: {
            swiper: swiper,
        },
    });
    /**
     *  PROGRAM DETAILS SLIDER SWIPER
     */
     new Swiper('.program-details-slider', {
      spaceBetween: 10,
      speed: 400,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        dynamicBullets: true,
        el: '.swiper-pagination',
        clickable: true
      },
      loop: true
    });
})(jQuery);