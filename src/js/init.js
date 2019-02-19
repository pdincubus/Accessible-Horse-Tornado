import debounce from 'lodash.debounce';
import { getWindowWidth, getWindowHeight } from './utilities';

import HorseTornado from './HorseTornado';

let currentWidth = getWindowWidth();
let currentHeight = getWindowHeight();

const tornadoContainer = document.querySelector('.horse-tornado');

const AccessibleTornado = new HorseTornado(
    tornadoContainer,
    [...tornadoContainer.querySelectorAll('.horse-tornado__slide')],
    tornadoContainer.querySelector('.horse-tornado__button--next'),
    tornadoContainer.querySelector('.horse-tornado__button--prev'),
    tornadoContainer.querySelector('.horse-tornado__button--start'),
    tornadoContainer.querySelector('.horse-tornado__button--stop')
);

if (tornadoContainer) {
    AccessibleTornado.init();
}

window.addEventListener('resize', debounce(() => {
    const newWidth = getWindowWidth();
    const newHeight = getWindowHeight();

    if (
        (newHeight !== currentHeight && newWidth === currentWidth)
        || (newWidth === currentWidth)
    ) {
        return false;
    }

    currentWidth = newWidth;
    currentHeight = newHeight;

    if (newWidth < 768) {
        // Things
    }

    if (newWidth >= 768) {
        // Things
    }
}, 500));
