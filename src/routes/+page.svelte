<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import events from '$lib/stores/events';
	import filters from '$lib/stores/filters';
	import loading from '$lib/stores/loading';
	import pool from '$lib/stores/pool';
	import relays from '$lib/stores/relays';
	import { parseEvents } from '$lib/util/parseEvents';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});

	let listops: { title: string; op: () => Promise<void> }[] = [
		{
			title: `refresh`,
			op: async () => {
				loading.set('refresh');
				events.set(await $pool.list($relays, $filters));
				loading.set(undefined);
			}
		},
		{
			title: `most recent`,

			op: async () => {
				events.update((e) => e.sort((a, b) => b.created_at - a.created_at));
			}
		}
	];
</script>

<div class="flex flex-col w-screen min-h-screen space-y-12">
	<Nav />
	<div class={`flex flex-row w-full `}>
		<div class="flex flex-col basis-2/3 justify-center px-8 space-y-8">
			<div class="flex flex-row w-full space-x-4">
				{#each listops as { title, op }}
					<button
						on:click|preventDefault={op}
						class="flex px-3 py-1 rounded-xl bg-slate-200 opacity-60 capitalize items-center space-x-2"
					>
						{#if $loading === title}
							<span class="pr-2">
								<Spinner />
							</span>
						{/if}
						{title}
					</button>
				{/each}
			</div>
			{#each $events.filter((e) => e.kind !== 0) as event}
				<div
					class="flex flex-col h-60 w-full justify-between space-y-8 bg-slate-100 shadow-sm rounded-3xl break-all"
				>
					<div class="flex flex-row p-8 overflow-y-scroll">
						{parseEvents(event)}
					</div>
					<div class="flex flex-row h-12 w-full px-6 pb-2 justify-between items-center">
						<div class="flex flex-row max-w-40 space-x-4 items-center">
							<div class="w-8 h-8 rounded-full bg-blue-200 opacity-60" />
							<div class="w-44 text-sm truncate">
								{`written by ${event.pubkey}`}
							</div>
						</div>
						<div class="flex text-sm">{new Date(event.created_at * 1000).toLocaleString()}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<Footer />
</div>
