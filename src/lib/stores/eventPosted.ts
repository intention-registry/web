import type { Event } from 'nostr-tools';
import { writable } from 'svelte/store';

const eventPosted = writable<Event[]>([]);
export default eventPosted;
