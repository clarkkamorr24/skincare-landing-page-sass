(function ($) {
  'use strict';
  const TestimonialCarousel = {
    selector: '[data-testimonial-carousel]',
    instance: null,

    init() {
      const $el = $(this.selector);
      if (!$el.length) return;

      this.instance = new Flickity($el[0], {
        cellAlign: 'center',
        contain: true,
        wrapAround: true,
        prevNextButtons: true,
        pageDots: true,
        draggable: true,
        adaptiveHeight: false,
        accessibility: true,
        arrowShape: {
          x0: 10,
          x1: 60, y1: 50,
          x2: 65, y2: 45,
          x3: 20,
        },
      });
    },
  };

  const MobileNav = {
    toggleSelector: '[data-toggle-nav]',
    navSelector: '.mobile-nav',
    openClass: 'mobile-nav--open',

    init() {
      const self = this;
      $(this.toggleSelector).on('click', function () {
        const $nav = $(self.navSelector);
        const $toggle = $(this);
        const isOpen = $nav.hasClass(self.openClass);

        $nav.toggleClass(self.openClass);
        $toggle.attr('aria-expanded', !isOpen);
        $('body').toggleClass('nav-open');
      });

      $(document).on('click', function (e) {
        const $nav = $(self.navSelector);
        const $toggle = $(self.toggleSelector);
        if (
          !$nav.is(e.target) &&
          !$nav.has(e.target).length &&
          !$toggle.is(e.target) &&
          !$toggle.has(e.target).length
        ) {
          $nav.removeClass(self.openClass);
          $toggle.attr('aria-expanded', false);
          $('body').removeClass('nav-open');
        }
      });

      $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
          const $nav = $(self.navSelector);
          const $toggle = $(self.toggleSelector);
          $nav.removeClass(self.openClass);
          $toggle.attr('aria-expanded', false);
          $('body').removeClass('nav-open');
        }
      });
    },
  };

  const StickyHeader = {
    selector: '.site-header',
    scrolledClass: 'site-header--scrolled',
    threshold: 50,

    init() {
      const self = this;

      $(window).on('scroll', function () {
        const currentScroll = $(window).scrollTop();
        const $header = $(self.selector);

        if (currentScroll > self.threshold) {
          $header.addClass(self.scrolledClass);
        } else {
          $header.removeClass(self.scrolledClass);
        }
      });
    },
  };

  const AnnouncementBar = {
    selector: '.announcement-bar',
    closeSelector: '.announcement-bar__close',

    init() {
      const self = this;
      $(this.closeSelector).on('click', function () {
        $(self.selector).slideUp(300);
      });
    },
  };

  const Marquee = {
    selector: '[data-marquee]',

    init() {
      $(this.selector).on('mouseenter', function () {
        $(this).find('.trust-marquee__track').css('animation-play-state', 'paused');
      }).on('mouseleave', function () {
        $(this).find('.trust-marquee__track').css('animation-play-state', 'running');
      });
    },
  };

  const SmoothScroll = {
    init() {
      $('a[href^="#"]').on('click', function (e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
          e.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 80,
          }, 600);
        }
      });
    },
  };
  
  $(document).ready(function () {
    TestimonialCarousel.init();
    MobileNav.init();
    StickyHeader.init();
    AnnouncementBar.init();
    Marquee.init();
    SmoothScroll.init();
  });

})(jQuery);
