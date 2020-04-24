import { map } from './utils.js';
export class Rule {
    constructor(store, words, callback) {
        this.store = store;
        this.words = words;
        this.callback = callback;
    }
    match(words) {
        return words.some(word => this.words.includes(word.toLowerCase()));
    }
    run(words) {
        const filtered = words
            .map((word) => word.toLowerCase())
            .filter((word) => (!this.words.includes(word) && word.length > 1));
        const mapped = map(this.store, 'name');
        const keys = [...mapped.keys()];
        const key = keys.find((key) => filtered.some((word) => key.toLowerCase().includes(word)));
        if (key !== undefined) {
            const entry = mapped.get(key);
            return this.callback(entry);
        }
        else {
            return this.callback(null);
        }
    }
}
