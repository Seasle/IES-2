import { map } from './utils.js';

type RuleCallback = (...args: any[]) => any;

export class Rule {
    constructor(
        private store: any[],
        public words: string[],
        public callback: RuleCallback
    ) {}

    match(words: string[]): boolean {
        return words.some(word => this.words.includes(word.toLowerCase()));
    }

    run(words: string[]): any {
        const filtered: string[] = words
            .map((word: string) => word.toLowerCase())
            .filter((word: string) => (!this.words.includes(word) && word.length > 1));
        const mapped: Map<string, any> = map(this.store, 'name');
        const keys: string[] = [...mapped.keys()];
        const key = keys.find((key: string) => filtered.some((word: string) => key.toLowerCase().includes(word)));

        if (key !== undefined) {
            const entry = mapped.get(key);

            return this.callback(entry);
        } else {
            return this.callback(null);
        }
    }
}