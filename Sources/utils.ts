export const debounce = (callback: (...args: any[]) => void, duration: number): any => {
    let timeout = null;

    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(callback, duration, ...args);
    }
}

export const map = (array: any[], key: string): Map<string, any> => new Map(array.map(entry => [entry[key], entry]));

export const get = (selector: string, key: string): Map<string, HTMLElement> => new Map(
    [...document.querySelectorAll(selector)].map((entry: HTMLElement) => [entry.getAttribute(key), entry])
);

type RenderCallback = (element: Element) => void;

export const render = (
    tag: string,
    properties: Object = null,
    children: HTMLElement[] = null,
    callback: RenderCallback = null
): HTMLElement => {
    const element = document.createElement(tag);

    if (properties !== null) {
        for (let [key, value] of Object.entries(properties)) {
            if (key in element) {
                element[key] = value;
            } else {
                element.setAttribute(key, value);
            }
        }
    }

    if (children !== null) {
        if (children instanceof Array) {
            element.append(...children);
        } else {
            element.append(children);
        }
    }

    if (callback !== null && typeof callback === 'function') {
        callback(element);
    }

    return element;
};
