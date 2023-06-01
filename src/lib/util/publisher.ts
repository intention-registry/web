/* eslint-disable @typescript-eslint/no-explicit-any */
import { SimplePool, getEventHash, getPublicKey, getSignature, type Event } from 'nostr-tools';

export async function publisher(
	sk: string,
	kind: number,
	content: string,
	pool: SimplePool,
	relays: string[],
	cb: (a?: any) => void,
	tags?: string[][]
): Promise<Event> {
	const pk = getPublicKey(sk);
	const event = {
		id: ``,
		sig: ``,
		kind,
		pubkey: pk,
		created_at: Math.floor(Date.now() / 1000),
		tags: [...(tags || [])],
		content
	};
	event.id = getEventHash(event);
	event.sig = getSignature(event, sk);

	const pub = pool.publish(relays, event);
	pub.on('ok', () => {
		cb();
	});
	pub.on('failed', (reason: any) => {
		cb(reason);
	});

	return event;
}
