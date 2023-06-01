import { writable } from 'svelte/store';

const errorMessage = writable<string | undefined>(undefined);
export default errorMessage;
