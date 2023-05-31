import { parseReferences, type Event } from 'nostr-tools';

//const urlRegex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/;
const urlRegex = /^(https?):\/\/([^\s/$.?#]+).*/;

export function parseEvents(event: Event): string {
	const references = parseReferences(event);
	let augmentedContent = event.content;
	for (let i = 0; i < references.length; i++) {
		const { text, profile, event, address } = references[i];
		let augmentedReference = ``;
		if (profile) {
			augmentedReference = profile.pubkey;
		} else if (event) {
			augmentedReference = `<span class="text-purple-400 font-semibold"><a href="events/${event.id}">${event.id}</a></span>`;
		} else if (address) {
			augmentedReference = `<a href="${text}">${text} [link]</a>`;
		} else {
			augmentedReference = text;
		}
		augmentedContent = augmentedContent.replaceAll(text, augmentedReference);
	}

	const resultContent = augmentedContent
		.split(` `)
		.map((str) => {
			if (urlRegex.test(str)) {
				const addurl = `<span class="text-blue-400 font-bold"><a href="${str}">${str}</a></span>`;
				console.log(JSON.stringify(addurl, null, 4), `addurl`);
				return addurl;
			} else {
				return str;
			}
		})
		.join(` `);

	return resultContent;
}
