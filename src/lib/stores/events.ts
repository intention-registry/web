import type { Event } from 'nostr-tools';
import { writable } from 'svelte/store';

const events = writable<Event[]>([]);
export default events;
