export const debounce = (callback, duration) => {
    let timeout = null;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(callback, duration, ...args);
    };
};
export const map = (array, key) => new Map(array.map(entry => [entry[key], entry]));
export const get = (selector, key) => new Map([...document.querySelectorAll(selector)].map((entry) => [entry.getAttribute(key), entry]));
export const render = (tag, properties = null, children = null, callback = null) => {
    const element = document.createElement(tag);
    if (properties !== null) {
        for (let [key, value] of Object.entries(properties)) {
            if (key in element) {
                element[key] = value;
            }
            else {
                element.setAttribute(key, value);
            }
        }
    }
    if (children !== null) {
        if (children instanceof Array) {
            element.append(...children);
        }
        else {
            element.append(children);
        }
    }
    if (callback !== null && typeof callback === 'function') {
        callback(element);
    }
    return element;
};
