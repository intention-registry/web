<script lang="ts">
	import events from '$lib/stores/events';
	import pool from '$lib/stores/pool';

	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import filters from '$lib/stores/filters';
	import ndk from '$lib/stores/ndk';
	import relays from '$lib/stores/relays';
	import view from '$lib/stores/view';
	import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(async () => {
		//
		console.log('retrieving keypair');
		let sk: string | null;
		sk = localStorage.getItem('sk');
		if (!sk) {
			console.log('writing new key');
			localStorage.setItem('sk', generatePrivateKey());
		} else {
			console.log('found key');
		}
		//
		console.log('mounting app');
		await $ndk.connect();
		let sub = $pool.sub($relays, $filters);
		sub.on('event', (event) => {
			events.update((e) => [...e, event]);
		});
	});
</script>

{#if $view === `drawer`}
	<div class="flex flex-col w-screen min-h-screen space-y-12 p-12">
		<div class="flex flex-row w-full">
			<button type={`button`} class={``} on:click|preventDefault={() => view.set(undefined)}>
				{`<--`}
			</button>
		</div>
		<div class="flex flex-row w-full justify-center">
			{nip19.npubEncode(getPublicKey(localStorage.getItem('sk') || ``))}
		</div>
	</div>
{:else}
	<div class="flex flex-col w-screen min-h-screen space-y-12">
		<Nav />
		<slot />
		<Footer />
	</div>
{/if}
