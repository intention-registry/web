import { lists } from '$lib/lists/relays';
import NDK from '@nostr-dev-kit/ndk';
import { writable } from 'svelte/store';

const ndk = writable<NDK>(new NDK({ explicitRelayUrls: lists.relays }));
export default ndk;
