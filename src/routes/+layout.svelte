<script lang="ts">
	import events from '$lib/stores/events';
	import pool from '$lib/stores/pool';

	import filters from '$lib/stores/filters';
	import relays from '$lib/stores/relays';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(async () => {
		console.log('mounting app');
		let sub = $pool.sub($relays, $filters);

		sub.on('event', (event) => {
			events.update((e) => [...e, event]);
		});
	});
</script>

<slot />
