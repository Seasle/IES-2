import { regions, cities, rules } from './store.js';
import { get, debounce, render } from './utils.js';
const containers = get('[data-container]', 'data-container');
const controls = get('[data-control]', 'data-control');
const update = () => {
    if (containers.has('spinner')) {
        containers.get('spinner').classList.add('container__wrapper-icon--hidden');
    }
    if (controls.has('input')) {
        const sentence = controls.get('input').value;
        const words = sentence.split(/\s+/g);
        const lowerWords = words.map((word) => word.toLowerCase());
        const filteredRules = rules
            .filter(rule => rule.match(words))
            .map(rule => ({
            rule,
            rating: rule.words.reduce((total, word) => {
                if (lowerWords.includes(word)) {
                    total += 1;
                }
                return total;
            }, 0)
        }))
            .sort((a, b) => (b.rating - a.rating));
        if (filteredRules.length > 0) {
            const { rule } = filteredRules[0];
            const text = rule.run(words);
            if (containers.has('response')) {
                containers.get('response').textContent = text;
            }
        }
        else {
            if (containers.has('response')) {
                containers.get('response').textContent = null;
            }
        }
    }
};
const fill = () => {
    if (containers.has('regions-list')) {
        const container = containers.get('regions-list');
        const values = regions.map(region => region.name);
        const elements = values.map(value => render('li', {
            className: 'container__list-item',
            textContent: value
        }));
        container.append(...elements);
    }
    if (containers.has('cities-list')) {
        const container = containers.get('cities-list');
        const values = cities.map(region => region.name);
        const elements = values.map(value => render('li', {
            className: 'container__list-item',
            textContent: value
        }));
        container.append(...elements);
    }
};
const bind = () => {
    const debouncedUpdate = debounce(update, 250);
    if (controls.has('input')) {
        controls.get('input').addEventListener('input', (event) => {
            if (containers.has('spinner')) {
                containers.get('spinner').classList.remove('container__wrapper-icon--hidden');
            }
            debouncedUpdate();
        });
    }
    const updateElements = (container, control) => {
        control.textContent = container.classList.contains('container__columns--hidden')
            ? 'Показать константы'
            : 'Скрыть константы';
    };
    if (containers.has('columns') && controls.has('toggle-columns')) {
        const container = containers.get('columns');
        const control = controls.get('toggle-columns');
        updateElements(container, control);
        control.addEventListener('click', (event) => {
            event.preventDefault();
            container.classList.toggle('container__columns--hidden');
            updateElements(container, control);
        });
    }
};
const init = () => {
    fill();
    bind();
};
window.addEventListener('DOMContentLoaded', init);
