<script lang="ts">
	//
	let text0 = `IntentionRegistry`;
	let text1 = `Share and Preserve Meaningful Intentions`;

	let text2 = `Think of it as a platform to share and preserve the impactful intentions you discover on Nostr.

Unlock the value behind these intentions and seamlessly integrate them with the vast information available to you and your network.`;

	let text3 = `Through the Nostr network, users can easily articulate and share their intentions, fostering a sense of purpose and enabling others to offer support and collaboration.`;
	let textlist = [text0, text1, text2, text3];
</script>

<div class="flex flex-col w-full min-h-screen px-24 space-y-4">
	{#each textlist as text}
		<div class="flex flex-row w-full font-semibold">{text}</div>
	{/each}
</div>
