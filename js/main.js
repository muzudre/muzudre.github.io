(function ($) {
    "use strict";

    $(window).on("load", function() {
        
        // preLoader init
        setTimeout(function(){
            $('.preloader p').addClass('loaded').text('loaded');
            $('.line_loader').addClass('loaded');
            setTimeout(function(){ $('.preloader').addClass('preloader_hide'); },200);
            setTimeout(function(){ $('.overlay , .overlay2').addClass('change');
                setTimeout(function(){ $('.overlay , .overlay2 , .preloader').fadeOut(); },1000);
            },600);
        },650);

        // isotope init
        var $grid = $('.work_items').isotope();
        // init Isotope -- work filter
        $grid.isotope({
            itemSelector: '.work_single_item'
        });
        // filter items on button click
        $('.filter_buttons').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
        // addClass on active filter button
        $('.filter_buttons button').on('click', function () {
            $('.filter_buttons button').removeClass('btn_active');
            $(this).addClass('btn_active');
        });

    });

    /* =========================================================== */

    $(window).on('scroll', function () {

        // stickyHeader init
        if ($(window).scrollTop() >= 60) {
            $('nav').addClass('nav_fixed');
        } else {
            $('nav').removeClass('nav_fixed');
        }
        
        // intro opacity init
        $('.qrop_intro').css('opacity', 1 - $(window).scrollTop() / 300);

        // scrollToDark init
        var styleTrigger = $('.qrop_about').offset();
        if($(window).scrollTop() > styleTrigger.top-200){ $('body').addClass('qrop_dark'); } 
        else { $('body').removeClass('qrop_dark'); }

    });

    /* =========================================================== */

    $(document).ready(function () {
        
        // mobile Menu init
        $('.mobile_menu_btn').on('click', function () {
            $('#menu').toggleClass('show_menu');
            $('.mobile_menu_btn>span').toggleClass('mbri-close mbri-menu');
        });
        $('#menu li a').on('click', function () {
            $('#menu').removeClass('show_menu');
            $('.mobile_menu_btn>span').removeClass('mbri-close').addClass('mbri-menu');
        });

        // onePageNav init 
        $('nav').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 750,
            scrollThreshold: 0.5,
            filter: '',
            easing: 'swing',
            begin: function() {},
            end: function() {},
            scrollChange: function($currentListItem) {}
        });

        // parallax init
        var rellax = new Rellax('.rellax');

        // wow init
        var wow = new WOW().init();

        // revealText init
        $.each(['reveal-trigger'], function(i, classname) {
            var $elements = $('.' + classname)
            $elements.each(function() {
            new Waypoint({
                element: this,
                handler: function(direction) {
                    $elements.removeClass('np-current')
                    $(this.element).addClass('np-current reveal-text')
                },
                offset: '90%',
                group: classname
                })
            })
        });

        // owl-carousel init
        // brgin of service carousel
        $('.owl-carousel.service_carousel').owlCarousel({
            nav:true,
            loop:false,
            margin:30,
            navText: ["<span class='mbri-left'></span>", "<span class='mbri-right'></span>"],
            responsive:{ 0:{ items:1 }, 900:{ items:2 }, 1000:{ items:3 } }
        });
        // end of service carousel

        // brgin of testimonial carousel
        $('.owl-carousel.testimonial_carousel').owlCarousel({
            nav:true,
            loop:true,
            navText: ["<span class='mbri-left'></span>", "<span class='mbri-right'></span>"],
            items:1
        });
        // end of testimonial carousel
        

        // magnificPopup init
        $(".zoom-gallery").magnificPopup({
            delegate: "a.zoom_image",
            type: "image",
            closeOnContentClick: !1,
            closeBtnInside: !1,
            mainClass: "mfp-with-zoom mfp-img-mobile",
            image: { verticalFit: !0 },
            gallery: { enabled: !0 },
            zoom: {
                enabled: !0,
                duration: 400,
                opener: function (a) { return a.find("img"); }
            }
        });

        // form validation
        $('#contact-form .input_fild').on('blur', function () {
            if ($(this).val().trim() == '') { $(this).addClass('inputEmpty').removeClass('inputNotEmpty'); } else { $(this).removeClass('inputEmpty').addClass('inputNotEmpty'); }
        });
        $('input[type="text"].input_fild.contact_name').on('blur', function () {
            if ($(this).val().trim() == '') { $(this).attr('placeholder', 'Name is Required!'); }
        });
        $('input[type="email"].input_fild.contact_email').on('blur', function () {
            if ($(this).val().trim() == '') { $(this).attr('placeholder', 'Email is Required!'); }
        });
        $('textarea.input_fild.contact_message').on('blur', function () {
            if ($(this).val().trim() == '') { $(this).attr('placeholder', 'Meaasge is Required!'); }
        });
        var form = $('#contact-form');
        var formMessages = $('.form-message');
        $(form).submit(function(e) {
            e.preventDefault();
            var formData = $(form).serialize();
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');
                $(formMessages).text(response);
                $('#contact-form input,#contact-form textarea').val('');
            })
            .fail(function(data) {
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');
                if (data.responseText !== '') { $(formMessages).text(data.responseText); } 
                else { $(formMessages).text('Oops! An error occured and your message could not be sent.'); }
            });
        });

    });


})(jQuery);