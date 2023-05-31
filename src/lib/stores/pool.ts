import { SimplePool } from 'nostr-tools';
import { writable } from 'svelte/store';

const sp = new SimplePool();
const pool = writable<SimplePool>(sp);
export default pool;
