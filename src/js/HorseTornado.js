/**
 * HorseTornado
 *
 * @author Phil Steer <phil@shffld.com>
 * Tested with jQuery 2.x
 */
!function($) {
    var HorseTornado = function(elem, opts) {
        this.init('horsetornado', elem, opts);
    };

    HorseTornado.prototype = {
        constructor: HorseTornado,
        init: function(type, elem, opts) {
            this.type = type;
            this.$element = $(elem);
            this.options = this.getOptions(opts);
            this.$slides = this.$element.find(this.options.slide);
            this.numSlides = this.$slides.length;
            this.currentSlide = 0;
            this.containerWidth = 0;
            this.setup();
        },

        getOptions: function(opts) {
            return $.extend({}, $.fn[this.type].defaults, this.$element.data(), opts);
        },

        setup: function() {
            var that = this;

            this.generateDirectNav();
            this.setContainerWidth();
            this.setSlideWidth();

            //window load and resize handler
            var resizerHelper = (function () {
                var timers = {};
                return function (callback, ms, uniqueId) {
                    if (!uniqueId) {
                        uniqueId = "Don't call this twice without a uniqueId";
                    }
                    if (timers[uniqueId]) {
                        clearTimeout (timers[uniqueId]);
                    }
                    timers[uniqueId] = setTimeout(callback, ms);
                };
            })();

            $(window).resize(function() {
                resizerHelper(function() {
                    that.resetHorseTornado();
                }, 250, 'resizeHandler');
            });

            this.$element.find(this.options.slide).eq(0).addClass('active');
            this.$element.find('.' + this.options.navDirect + ' > li').first().find('.' + this.options.navDirectButton).addClass('active');
            this.$element.find(this.options.navPrev).addClass('disabled').attr('aria-disabled', true).attr('disabled', true);

            this.$element.on('click', this.options.navNext, function() {
                that.goNext();
            });

            this.$element.on('click', this.options.navPrev, function() {
                that.goPrev();
            });

            this.$element.on('click', '.' + this.options.navDirectButton, function() {
                var slide = parseInt($(this).attr('data-slide'), 10);
                that.goDirect(slide);
            });
        },

        resetHorseTornado: function() {
            this.currentSlide = 0;
            this.$element.find(this.options.slideInnerContainer).attr('style', '');
            this.setDirectNavActive(0);
            this.setNavDisabled('prev');
            this.setContainerWidth();
            this.setSlideWidth();
        },

        setContainerWidth: function() {
            this.containerWidth = this.$element.find(this.options.slideOuterContainer).width();
            var innerContainerWidth = (this.numSlides * this.containerWidth);

            this.$element.find(this.options.slideInnerContainer).css({
                width: innerContainerWidth + 'px'
            });
        },

        setSlideWidth: function() {
            var that = this;

            this.$slides.each(function() {
                $(this).css({
                    width: that.containerWidth + 'px'
                })
            });
        },

        generateDirectNav: function() {
            var that = this,
                directNavHtml = '<ul class="' + this.options.navDirect + '">';

            for ( i = 0; i < that.numSlides; i++ ) {
                directNavHtml = directNavHtml + '<li><button type="button" class="' + that.options.navDirectButton + '" data-slide="' + i + '"><span class="visuallyhidden">Go to slide </span>' + (i+1) + '</button></li>';
            }

            directNavHtml = directNavHtml + '</ul>';

            this.$element.find(this.options.nav).append(directNavHtml);
        },

        goNext: function() {
            if ( this.currentSlide == this.numSlides ) {
                this.setNavDisabled('next');
                return false;
            }

            this.setNavDisabled(false);

            var $active = this.getActiveSlide(),
                $target = this.$slides.eq(parseInt($active.attr('data-slide'), 10)),
                targetNum = parseInt($target.attr('data-slide'), 10);

            if ( targetNum >= this.numSlides) {
                this.setNavDisabled('next');

                if ( targetNum > this.numSlides ) {
                    return false;
                }
            }

            $active.removeClass('active').attr('aria-disabled', true).attr('aria-hidden', true);
            $target.addClass('active').attr('aria-disabled', false).attr('aria-hidden', false);
            this.animateTo('next', false);
            this.setDirectNavActive(targetNum - 1);
            this.currentSlide = targetNum;

            console.log('currentSlide', this.currentSlide, 'setDirectNavActive', targetNum);
        },

        goPrev: function() {
            if ( this.currentSlide == 1 ) {
                this.setNavDisabled('prev');
                return false;
            }

            this.setNavDisabled(false);

            var $active = this.getActiveSlide(),
                $target = this.$slides.eq(parseInt($active.attr('data-slide'), 10) - 2),
                targetNum = parseInt($target.attr('data-slide'), 10);

            console.log($target, targetNum);

            if ( targetNum <= 1 ) {
                this.setNavDisabled('prev');

                if ( targetNum < 1 ) {
                    return false;
                }
            }

            $active.removeClass('active').attr('aria-disabled', true).attr('aria-hidden', true);
            $target.addClass('active').attr('aria-disabled', false).attr('aria-hidden', false);
            this.animateTo('prev', false);
            this.setDirectNavActive(targetNum - 1);
            this.currentSlide = targetNum;

            console.log('currentSlide', this.currentSlide, 'setDirectNavActive', targetNum);
        },

        goDirect: function(slide) {
            if ( this.currentSlide == slide ) {
                return false;
            }

            console.log(slide);

            var $active = this.getActiveSlide(),
                $target = this.$slides.eq(slide),
                targetPos = (this.containerWidth * slide);

            if ( slide <= 0 ) {
                this.setNavDisabled('prev');

                if ( slide < 0 ) {
                    return false;
                }
            } else if ( (slide + 1) >= this.numSlides ) {
                this.setNavDisabled('next');

                if ( (slide + 1) > this.numSlides ) {
                    return false;
                }
            } else {
                this.setNavDisabled(false);
            }

            $active.removeClass('active').attr('aria-disabled', true).attr('aria-hidden', true);
            $target.addClass('active').attr('aria-disabled', false).attr('aria-hidden', false);
            this.animateTo('direct', '-' + targetPos);
            this.setDirectNavActive(slide);
            this.currentSlide = slide;
        },

        setNavDisabled: function(method) {
            if ( method == 'prev' ) {
                this.$element.find(this.options.navPrev).addClass('disabled').attr('aria-disabled', true).attr('disabled', true);
                this.$element.find(this.options.navNext).removeClass('disabled').attr('aria-disabled', false).attr('disabled', false);
            } else if ( method == 'next') {
                this.$element.find(this.options.navNext).addClass('disabled').attr('aria-disabled', true).attr('disabled', true);
                this.$element.find(this.options.navPrev).removeClass('disabled').attr('aria-disabled', false).attr('disabled', false);
            } else {
                this.$element.find(this.options.navNext).removeClass('disabled').attr('aria-disabled', false).attr('disabled', false);
                this.$element.find(this.options.navPrev).removeClass('disabled').attr('aria-disabled', false).attr('disabled', false);
            }
        },

        setDirectNavActive: function(slide) {
            this.$element.find('.' + this.options.navDirect + ' > li').children('.' + this.options.navDirectButton).removeClass('active');
            this.$element.find('.' + this.options.navDirect + ' > li').eq(slide).children('.' + this.options.navDirectButton).addClass('active');
        },

        getActiveSlide: function() {
            return this.$element.find(this.options.slide + '.active');
        },

        animateTo: function(type, pos) {
            if ( type == 'next' ) {
                this.$element.find(this.options.slideInnerContainer).animate({
                    left: '-=' + this.containerWidth
                }, 500);
            } else if ( type == 'prev' ) {
                this.$element.find(this.options.slideInnerContainer).animate({
                    left: '+=' + this.containerWidth
                }, 500);
            } else {
                this.$element.find(this.options.slideInnerContainer).animate({
                    left: pos
                }, 500);
            }
        }
    };

    $.fn.horsetornado = function(option) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (typeof option === 'string' && $.inArray(option, []) !== -1) {
            var data = this.data('horsetornado');
            return data[option].apply(data, args);
        }

        return this.each(function() {
            var $this = $(this),
               data = $this.data('horsetornado'),
               options = typeof option == 'object' && option;

            if (!data) {
                $this.data('horsetornado', data = new HorseTornado(this, options));
            }

            if (typeof option == 'string') {
                data[option]();
            }
        });
    };

    $.fn.horsetornado.defaults = {
        'slideOuterContainer': '.horse-tornado--contain',
        'slideInnerContainer': '.horse-tornado--slides',
        'slide': '.horse-tornado--slide',
        'nav': '.horse-tornado--nav',
        'navNext': '.horse-tornado--next',
        'navPrev': '.horse-tornado--prev',
        'navDirect': 'horse-tornado--slide-links',
        'navDirectButton': 'horse-tornado--slide-link'
    };
}(window.jQuery);

//----------------------------------------------------
//     general mouse/keyboard accessibility fix
//----------------------------------------------------
$(document).on( 'mousedown touchdown', 'a, button, input, select, input[type=radio] + label, input[type=checkbox] + label, label, .button, textarea', function(e) {
    $(this).addClass('no-focus');
}).on('blur touchend', function(e) {
    $(this).removeClass('no-focus');
});
