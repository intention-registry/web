import { writable } from 'svelte/store';

const relays = writable<string[]>([
	'wss://purplepag.es',
	'wss://nos.lol',
	'wss://relay.f7z.io',
	'wss://relay.damus.io',
	'wss://nostr.mom',
	'wss://nostr.terminus.money',
	'wss://atlas.nostr.land/',
	'wss://offchain.pub/'
]);
export default relays;
