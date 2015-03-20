/* -- Full Screen Viewport Container
   ---------------------------- */

$(window).load(function() {
    $('.preloader').fadeOut(1000); // set duration in brackets
    init();
});

$(document).ready(function() {
    fullScreenContainer();
    owlCarousel();
    magnificPopup();
    subscribe();
});



/* --- initialize functions on window load here -------------- */

function init() {
    'use strict';
    overlayContact();
    overlaySubscribe();
    tooltips();
    onePageScroll();
    scrollAnchor();
    instagram();
}

/* --- Full Screen Container ------------- */

function fullScreenContainer() {
    'use strict';

    // Set Initial Screen Dimensions

    var screenWidth = $(window).width() + 'px';
    var screenHeight = $(window).height() + 'px';

    $('.intro, .intro .item').css({
        width: screenWidth,
        height: screenHeight
    });

    // Every time the window is resized...

    $(window).resize(function() {

        // Fetch Screen Dimensions

        var screenWidth = $(window).width() + 'px';
        var screenHeight = $(window).height() + 'px';

        // Set Slides to new Screen Dimensions

        $('.intro, .intro .item').css({
            width: screenWidth,
            height: screenHeight
        });

    });

}



/* --- owlCarousel ------------- */

function owlCarousel() {
    'use strict';

    $('.carousel-items').owlCarousel({
        lazyLoad: true,
        items: 4,
        theme: 'owl-theme-main'
    });

    $('.intro.owl-carousel').owlCarousel({
        lazyLoad: true,
        lazyEffect: 'fade',
        singleItem: true,
        navigation: true,
        navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        slideSpeed: 450,
        pagination: false,
        transitionStyle: 'fade',
        theme: 'owl-theme-featured'

    });
}



/* --- Tooltips ------------------- */

function tooltips() {
    'use strict';

    $('.tooltips').tooltip();
}



/* --- scrollReveal ------------------- */

window.scrollReveal = new scrollReveal();



/* --- magnific popup ------------------- */

function magnificPopup() {
    'use strict';

    // Gallery
    $('.popup-gallery').magnificPopup({
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fade',
        disableOn: 700,
        removalDelay: 160,
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        },
        callbacks: {
            close: function() {
                $('.portfolio-item figure figcaption').removeClass('active');
                $('.portfolio-item figure .info').removeClass('active');
            }
        }
    });

    $('.portfolio-item figcaption a.preview').click(function() {
        $(this).parent().addClass('active');
        $(this).parent().siblings('.info').addClass('active');
    });

    // Zoom Gallery

    $('.zoom-modal').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom', // this class is for CSS animation below

        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function(openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('i') ? openerElement : openerElement.find('i');
            }
        }

    });

    $('.popup-modal').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });
}



/* --- Isotope ------------------- */

function isotope() {
    'use strict';

    var $container = $('.grid');

    // init
    $container.imagesLoaded(function() {
        $container.isotope({
            // options
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
    });

    // filter items on button click
    $('.filters').on('click', 'button', function(event) {
        var filterValue = $(this).attr('data-filter-value');
        $container.isotope({
            filter: filterValue
        });
        $('.filters button').removeClass('active');
        $(this).addClass('active');
    });

}


/* --- Scroll to Anchor ------------------- */

function scrollAnchor() {
    'use strict';

    // scroll to specific anchor
    $('.scroll').click(function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 650);
                return false;
            }
        }
    });

}


/* --- Modal overlay (used specifically for contact form) ------------------- */

function overlayContact() {
    'use strict';

    var container = document.querySelector('div.container'),
        triggerBttn = document.getElementById('trigger-overlay-contact'),
        overlay = document.querySelector('div.overlay-contactform'),
        closeBttn = overlay.querySelector('button.overlay-close');
    var transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        support = {
            transitions: Modernizr.csstransitions
        };

    function toggleOverlay() {
        if (classie.has(overlay, 'open')) {
            classie.remove(overlay, 'open');
            classie.remove(container, 'overlay-open');
            classie.add(overlay, 'close-me');
            var onEndTransitionFn = function(ev) {
                if (support.transitions) {
                    if (ev.propertyName !== 'visibility') return;
                    this.removeEventListener(transEndEventName, onEndTransitionFn);
                }
                classie.remove(overlay, 'close-me');
            };
            if (support.transitions) {
                overlay.addEventListener(transEndEventName, onEndTransitionFn);
            } else {
                onEndTransitionFn();
            }
        } else if (!classie.has(overlay, 'close-me')) {
            classie.add(overlay, 'open');
            classie.add(container, 'overlay-open');
        }
    }

    triggerBttn.addEventListener('click', toggleOverlay);
    closeBttn.addEventListener('click', toggleOverlay);
}

function overlaySubscribe() {
    'use strict';

    var container = document.querySelector('div.container'),
        triggerBttn = document.getElementById('trigger-overlay-subscribe'),
        overlay = document.querySelector('div.overlay-subscribeform'),
        closeBttn = overlay.querySelector('button.overlay-close');
    var transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        support = {
            transitions: Modernizr.csstransitions
        };

    function toggleOverlay() {
        if (classie.has(overlay, 'open')) {
            classie.remove(overlay, 'open');
            classie.remove(container, 'overlay-open');
            classie.add(overlay, 'close-me');
            var onEndTransitionFn = function(ev) {
                if (support.transitions) {
                    if (ev.propertyName !== 'visibility') return;
                    this.removeEventListener(transEndEventName, onEndTransitionFn);
                }
                classie.remove(overlay, 'close-me');
            };
            if (support.transitions) {
                overlay.addEventListener(transEndEventName, onEndTransitionFn);
            } else {
                onEndTransitionFn();
            }
        } else if (!classie.has(overlay, 'close-me')) {
            classie.add(overlay, 'open');
            classie.add(container, 'overlay-open');
        }
    }

    triggerBttn.addEventListener('click', toggleOverlay);
    closeBttn.addEventListener('click', toggleOverlay);
}

/* --- One Page Scroll ------------------- */

function onePageScroll() {
    'use strict';

    $('.nav').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 650,
        scrollOffset: 30,
        scrollThreshold: 0.5,
        filter: ':not(.login, .signup)',
        easing: 'swing',
        begin: function() {
            //I get fired when the animation is starting
        },
        end: function() {
            //I get fired when the animation is ending
        },
        scrollChange: function($currentListItem) {
            //I get fired when you enter a section and I pass the list item of the section
        }
    });
}


$(window).scroll(function() {
    'use strict';

    var windowpos = $(window).scrollTop();

    if (windowpos <= 500) {
        $('.nav li.current').removeClass('current');
    }
});



//Placeholder fixed for Internet Explorer
$(function() {
    'use strict';

    var input = document.createElement('input');
    if (('placeholder' in input) === false) {
        $('[placeholder]').focus(function() {
            var i = $(this);
            if (i.val() === i.attr('placeholder')) {
                i.val('').removeClass('placeholder');
                if (i.hasClass('password')) {
                    i.removeClass('password');
                    this.type = 'password';
                }
            }
        }).blur(function() {
            var i = $(this);
            if (i.val() === '' || i.val() === i.attr('placeholder')) {
                if (this.type === 'password') {
                    i.addClass('password');
                    this.type = 'text';
                }
                i.addClass('placeholder').val(i.attr('placeholder'));
            }
        }).blur().parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var i = $(this);
                if (i.val() === i.attr('placeholder'))
                    i.val('');
            });
        });
    }
});



/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs
  */
$(function() {
    'use strict';

    $('input,textarea').jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // something to have when submit produces an error ?
            // Not decided if I need it yet
        },
        submitSuccess: function($form, event) {

          if ($($form).hasClass('contact-form')) {

            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $('input#name').val();
            var email = $('input#email').val();
            var message = $('textarea#message').val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

          $.ajax({
              url: 'contact_me.php',
              type: 'POST',
              data: {
                  name: name,
                  email: email,
                  message: message
              },
              cache: false,
              success: function() {
                  // Success message
                  $('#success').html('<div class="alert alert-success">');
                  $('#success > .alert-success').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;')
                      .append('</button>');
                  $('#success > .alert-success')
                      .append('<strong>Your message has been sent. </strong>');
                  $('#success > .alert-success')
                      .append('</div>');

                  //clear all fields
                  $('.contactForm').trigger('reset');
              },
              error: function() {
                  // Fail message
                  $('#success').html('<div class="alert alert-danger">');
                  $('#success > .alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;')
                      .append('</button>');
                  $('#success > .alert-danger').append('<strong>Sorry ' + firstName + ' it seems that my mail server is not responding...</strong> Could you please email me directly to <a href="mailto:me@example.com?Subject=Message_Me from myprogrammingblog.com;">me@example.com</a> ? Sorry for the inconvenience!');
                  $('#success > .alert-danger').append('</div>');
                  //clear all fields
                  $('.contactForm').trigger('reset');
              }

            });

          }

        },
        filter: function() {
            return $(this).is(':visible');
        },
    });

    $('a[data-toggle=\"tab\"]').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
});

function subscribe() {
    'use strict';

    $('#subscribeForm').submit(function(e) {

        e.preventDefault();
        var thisForm = $(this);

        $.ajax({
            type: thisForm.attr('method'),
            url: thisForm.attr('action'),
            data: thisForm.serialize(),
            cache: false,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            error: function(err) {

                alert('Could not connect to the registration server. Please try again later.');
            },
            success: function(data) {
                if (data.result !== 'success') {
                    // Something went wrong, do something to notify the user. maybe alert(data.msg);
                    alert('something went wrong');
                } else {

                    // It worked, carry on...
                    thisForm.find('.response-subscribe').append(data.msg);
                    thisForm.find('.subscribeform-container').hide();
                }
            }
        });

    });
}

function instagram () {
    'use strict';
    $('.instagram-lite').instagramLite({
        clientID: '4b98b1a82f2e44caa026f0cc5ee2b97d',
        username: 'jc_generation',
        list: false
    });

}