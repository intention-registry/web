<script lang="ts">
	import { page } from '$app/stores';
	import pool from '$lib/stores/pool';
	import relays from '$lib/stores/relays';
	import type { Event } from 'nostr-tools';
	import { onMount } from 'svelte';

	let event: Event | null;

	onMount(async () => {
		const { params } = $page;
		event = await $pool.get($relays, {
			ids: [params.id]
		});
	});
</script>

<div class="flex flex-col w-full min-h-screen px-32">
	{#each Object.entries(event || []) as ev}
		<div class="flex flex-row w-full break-all">
			{JSON.stringify(ev)}
		</div>
	{/each}
</div>
