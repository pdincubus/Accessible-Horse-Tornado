/**
 * Get current browser window width in pixels
 * @return {number} The number of pixels
 */
export function getWindowWidth () {
    const windowWidth = Math.max(
        document.documentElement.clientWidth, window.innerWidth || 0
    );

    return windowWidth;
}

/**
 * Get current browser window height in pixels
 * @return {number} The number of pixels
 */
export function getWindowHeight () {
    const windowHeight = Math.max(
        document.documentElement.clientHeight, window.innerHeight || 0
    );

    return windowHeight;
}

/**
 * Get absolute height of an element
 * stolen from: http://stackoverflow.com/questions/10787782/full-height-of-a-html-element-div-including-border-padding-and-margin
 *
 * @param {element} elem        the element to check
 * @return {number}             The number of pixels
 */
export function getAbsoluteHeight (elem) {
    const theElem = (typeof elem === 'string')
        ? document.querySelector(elem)
        : elem;

    const styles = window.getComputedStyle(theElem);

    const margin = parseFloat(styles.marginTop)
        + parseFloat(styles.marginBottom);

    return Math.ceil(theElem.offsetHeight + margin);
}

/**
 * Utility function to generate an element with a class and optional inner HTML
 * @param  {Element} elem       The element type we want to make
 * @param  {String} classList   Classes to add to the element
 * @param  {String} inner       Inner HTML if provided
 * @return {Element}
 */
export function generateElement (elem, classList, inner = '') {
    const tempElem = document.createElement(elem);

    tempElem.className = classList;
    tempElem.innerHTML = inner;

    return tempElem;
}

/**
 * Make a list of elements tabbable by keyboard
 * And another list of elements un-tabbable
 * @param  {Elements} tabElems      the elements you want to be untabbable
 * @param  {Elements} unTabElems    the elements you want to make tabbable
 */
export function makeTabbable (tabElems, unTabElems) {
    if (unTabElems) {
        unTabElems.forEach(unTabElem => {
            unTabElem.setAttribute('tabindex', '-1');
            unTabElem.classList.add('is_disabled');
        });
    }

    if (tabElems) {
        tabElems.forEach(tabElem => {
            tabElem.removeAttribute('tabindex');
            tabElem.classList.remove('is_disabled');
        });
    }
}

/**
 * Check form for required fields and return false until they all have values
 * @param  {Element} form   The form element to check for required fields
 * @return {Boolean}
 */
export function requiredFieldsCheck (form) {
    const requiredFields = [...form.querySelectorAll('[required]')];
    let firstMissingField = null;
    let missingField = null;

    if (!requiredFields && requiredFields.length <= 0) {
        return;
    }

    requiredFields.forEach((requiredField, index) => {
        if (requiredField.value === '' || requiredField.value === 0) {
            if (missingField === null) {
                missingField = index;
            }

            return false;
        } else if (
            requiredField.type === 'checkbox'
            || requiredField.type === 'radio'
        ) {
            if (!requiredField.checked) {
                if (missingField === null) {
                    missingField = index;
                }

                return false;
            }
        } else {
            return true;
        }
    });

    if (missingField !== null) {
        firstMissingField = requiredFields[missingField].getAttribute('id');
        document.getElementById(firstMissingField).focus();
        alert('Please ensure you have completed all required fields.');

        return false;
    }

    return true;
}

/**
 * adds data into local storage with provided key
 * @param {string} key     The local storage key to add to
 * @param {string} data    The data to add to the local storage key
 */
export function addToLocalStorage (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * fetch data from local storage by key provided
 * @param {string} key     The local storage key to get
 * @return {string}
 */
export function getFromLocalStorage (key) {
    const dataString = localStorage.getItem(key);

    return dataString;
}

/**
 * check, add and get from local storage
 * @param  {string} key     The local storage key to look for
 * @return {boolean}
 */
export function checkLocalStorage (key) {
    const siteData = localStorage.getItem(key);

    return (siteData === undefined || siteData === null || siteData === '')
        ? false
        : true;
}

/**
 * compares two time strings to see if the data is old or current
 * @param  {string} key         The local storage key to look for
 * @param  {integer} maxAge     Max allowed age for data stale-ness
 * @return {boolean}
 */
export function checkLocalStorageAge (key, maxAge) {
    const storageTime = parseInt(getFromLocalStorage(key), 10);
    const currentTime = Date.now();

    if (currentTime - storageTime >= maxAge) {
        return false;
    }

    return true;
}
