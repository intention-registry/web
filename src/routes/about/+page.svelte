<script lang="ts">
	//
	let title = `IntentionRegistry`;
	let heading = `Share and Preserve Meaningful Intentions`;

	let text0 = `Think of it as a platform to share and preserve the impactful intentions you discover on Nostr.

Unlock the value behind these intentions and seamlessly integrate them with the vast information available to you and your network.`;

	let text1 = `Through the Nostr network, users can easily articulate and share their intentions, fostering a sense of purpose and enabling others to offer support and collaboration.`;
	let text2 = `With IntentionRegistry, you can connect with a community of like-minded individuals who are passionate about making a positive impact. Share your intentions and discover others who share similar goals, creating a network of support and collaboration.`;

	let text3 = `Harness the power of intention and transform it into tangible action. IntentionRegistry provides you with the tools and resources you need to turn your intentions into meaningful projects and initiatives. Join us today and become part of a global movement dedicated to making a difference.`;

	let textlist = [text0, text1, text2, text3];
</script>

<div class="flex flex-col w-full min-h-screen px-12 md:px-48 space-y-8">
	<div class="font-sans font-medium text-2xl">
		{title}
	</div>
	<div class="font-sans font-medium text-xl">
		{heading}
	</div>
	{#each textlist as text}
		<div class="flex flex-row w-full font-medium text-lg">{text}</div>
	{/each}
</div>
