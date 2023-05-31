import { writable } from 'svelte/store';

const loading = writable<'refresh' | 'most recent' | undefined>(undefined);
export default loading;
