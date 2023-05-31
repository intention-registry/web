import { parseReferences, type Event } from 'nostr-tools';

export function parseEvents(event: Event): string {
	const references = parseReferences(event);
	const simpleAugmentedContent = event.content;

	for (let i = 0; i < references.length; i++) {
		const { text, profile, event, address } = references[i];
		const augmentedReference = profile
			? `<strong>${profile.pubkey}</strong>`
			: event
			? `<em>${event.id}</em>`
			: address
			? `<a href="${text}">[link]</a>`
			: text;
		simpleAugmentedContent.replaceAll(text, augmentedReference);
	}
	return simpleAugmentedContent;
}
