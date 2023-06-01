import { lists } from '$lib/lists/relays';
import { writable } from 'svelte/store';

const relays = writable<string[]>(lists.relays);
export default relays;
