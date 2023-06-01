import { writable } from 'svelte/store';

const loading = writable<'refresh' | 'most recent' | undefined | 'posting'>(undefined);
export default loading;
