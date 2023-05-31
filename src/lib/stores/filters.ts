import type { Filter } from 'nostr-tools';
import { writable } from 'svelte/store';

const filters = writable<Filter[]>([{ kinds: [0, 1], limit: 10 }]);
export default filters;
