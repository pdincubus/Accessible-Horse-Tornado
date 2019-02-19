/**
 * Accessible Horse tornado.
 * A (hopefully) very accessible carousel script
 *
 * @author Phil Steer
 * @package Accessible-Horse-Tornado
 */
export default class HorseTornado {
    constructor (
        tornado = false,
        slides,
        nextButton,
        prevButton,
        startButton = false,
        stopButton = false,
        animationDuration = 500
    ) {
        if (!tornado) {
            return;
        }

        this.tornado = tornado;
        this.slides = slides;
        this.nextButton = nextButton;
        this.prevButton = prevButton;
        this.startButton = startButton;
        this.stopButton = stopButton;
        this.animationDuration = animationDuration;
    }

    init () {
        console.log('Horse tornado: Init');

        this.addEventListeners();
        this.reset();
    }

    addEventListeners () {
        console.log('Horse tornado: addEventListeners');

        this.prevButton.addEventListener('click', e => {
            e.preventDefault();

            this.prev();
        });

        this.nextButton.addEventListener('click', e => {
            e.preventDefault();

            this.next();
        });

        if (this.startButton) {
            this.startButton.addEventListener('click', e => {
                e.preventDefault();

                this.start();
            });
        }

        if (this.stopButton) {
            this.stopButton.addEventListener('click', e => {
                e.preventDefault();

                this.stop();
            });
        }
    }

    next () {
        console.log('Horse tornado: next');

        const currentSlide = this.tornado.querySelector('.horse-tornado__slide.is_active');
        const nextSlide = currentSlide.nextElementSibling;
        const futureSlide = nextSlide.nextElementSibling;

        if (!futureSlide) {
            this.nextButton.setAttribute('disabled', true);
            this.nextButton.classList.add('is_disabled');
        }

        this.prevButton.removeAttribute('disabled');
        this.prevButton.classList.remove('is_disabled');

        currentSlide.classList.add('is_leaving');
        nextSlide.classList.remove('is_hidden');
        nextSlide.classList.add('is_entering');
        nextSlide.classList.add('is_active');

        setTimeout(function () {
            currentSlide.classList.remove('is_leaving');
            currentSlide.classList.remove('is_active');
            currentSlide.classList.add('is_hidden');
            nextSlide.classList.remove('is_entering');
        }, this.animationDuration);
    }

    prev () {
        console.log('Horse tornado: prev');

        const currentSlide = this.tornado.querySelector('.horse-tornado__slide.is_active');
        const prevSlide = currentSlide.previousElementSibling;
        const futureSlide = prevSlide.previousElementSibling;

        if (!futureSlide) {
            this.prevButton.setAttribute('disabled', true);
            this.prevButton.classList.add('is_disabled');
        }

        this.nextButton.removeAttribute('disabled');
        this.nextButton.classList.remove('is_disabled');

        currentSlide.classList.add('is_leaving');
        prevSlide.classList.remove('is_hidden');
        prevSlide.classList.add('is_entering');
        prevSlide.classList.add('is_active');

        setTimeout(function () {
            currentSlide.classList.remove('is_leaving');
            currentSlide.classList.remove('is_active');
            currentSlide.classList.add('is_hidden');
            prevSlide.classList.remove('is_entering');
        }, this.animationDuration);
    }

    start () {
        console.log('Horse tornado: start');
    }

    stop () {
        console.log('Horse tornado: stop');
    }

    resize () {
        console.log('Horse tornado: resize');
    }

    reset () {
        console.log('Horse tornado: reset');

        this.slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('is_active');
            } else {
                slide.classList.remove('is_active');
                slide.classList.remove('is_leaving');
                slide.classList.remove('is_entering');
                slide.classList.add('is_hidden');
            }
        });

        this.prevButton.classList.add('is_disabled');
        this.prevButton.setAttribute('disabled', true);

        this.nextButton.classList.remove('is_disabled');
        this.nextButton.removeAttribute('disabled');
    }
}
