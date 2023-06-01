import { writable } from 'svelte/store';

const view = writable<'drawer' | undefined>(undefined);
export default view;
