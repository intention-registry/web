import type { Event } from 'nostr-tools';

export function sortRecent(list: Event[]): Event[] {
	return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
