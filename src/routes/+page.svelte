<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import errorMessage from '$lib/stores/errorMessage';
	import eventPosted from '$lib/stores/eventPosted';
	import events from '$lib/stores/events';
	import filters from '$lib/stores/filters';
	import loading from '$lib/stores/loading';
	import pool from '$lib/stores/pool';
	import relays from '$lib/stores/relays';
	import { parseEvents } from '$lib/util/parseEvents';
	import { publisher } from '$lib/util/publisher';
	import { sortRecent } from '$lib/util/sortRecent';
	import { nip19 } from 'nostr-tools';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	let post = ``;
	let notice = ``;

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

	async function postedCallback(n: number, fn?: () => void) {
		await new Promise((resolve) => setTimeout(resolve, n));
		if (fn) {
			fn();
		}
	}

	async function submitPost() {
		if (!post) {
			console.log(`no post`);
			errorMessage.set(`Write a post first to send`);
			return;
		}
		loading.set('posting');

		//
		let sk: string | null;
		sk = localStorage.getItem('sk');
		if (!sk) {
			console.log(`no sk`);
			return;
		}
		const publishCb = async () => {
			return;
		};
		const publishedEvent = await publisher(sk, 1, post, $pool, $relays, publishCb);
		await postedCallback(1000, () => (post = ``));
		loading.set(undefined);
		eventPosted.update((ls) => [...ls, publishedEvent]);
		notice = `Post sent.`;
		await postedCallback(2000, () => (notice = ``));
	}
</script>

<div class="flex flex-row w-full min-h-screen">
	<div class="flex flex-col w-full lg:w-auto lg:basis-2/3 px-8 space-y-8">
		<div class="flex flex-row w-full">
			<textarea
				class="textarea w-full rounded-xl bg-slate-100 border border-slate-200 font-semibold"
				rows={2}
				placeholder="Share your thoughts and insights with the world"
				value={post}
				on:input={(e) => {
					errorMessage.set(undefined);
					post = e.currentTarget.value;
				}}
			/>
		</div>
		<div class="flex flex-row w-full justify-end">
			<div class="flex flex-row space-x-4 items-center">
				{#if notice}
					<p class={`font-sans font-semibold text-base opacity-70 `}>
						{`${notice}`}
					</p>
				{/if}
				{#if !!$errorMessage}
					<p class={`font-sans font-semibold text-base opacity-70 `}>
						{`${$errorMessage}`}
					</p>
				{/if}
				<button
					class="flex h-12 px-4 py-1 rounded-xl bg-slate-200 opacity-60 capitalize items-center space-x-2"
					on:click={async () => await submitPost()}
				>
					{#if $loading === 'posting'}
						<span class="pr-2">
							<Spinner />
						</span>
					{/if}
					post
				</button>
			</div>
		</div>

		<div class="flex flex-row w-full space-x-4">
			{#each listops as { title, op }}
				<button
					on:click|preventDefault={op}
					class="flex h-12 px-3 py-1 rounded-xl bg-slate-200 opacity-60 capitalize items-center space-x-2"
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
		{#if $eventPosted.length}
			{#each sortRecent($eventPosted) as ownpost}
				<div
					class="flex flex-col h-60 w-full justify-between space-y-8 bg-slate-100 shadow-sm rounded-3xl break-all"
				>
					<div class="flex flex-row p-8 overflow-y-scroll">
						<p class={`font-base font-medium text-base break-all select-text`}>
							{@html parseEvents(ownpost)}
						</p>
					</div>
					<div class="flex flex-row h-12 w-full px-6 pb-2 justify-between items-center">
						<div class="flex flex-row max-w-40 space-x-4 items-center">
							<div class="w-8 h-8 rounded-full bg-blue-200 opacity-60" />
							<div class="w-44 text-sm truncate">
								{`written by ${ownpost.pubkey}`}
							</div>
						</div>
						<div class="flex text-sm">
							{new Date(Number(ownpost.created_at) * 1000).toLocaleString()}
						</div>
					</div>
				</div>
			{/each}
		{/if}
		{#if $events.length < 4}
			<div class="flex flex-row w-full justify-center">
				<Spinner />
			</div>
		{/if}
		{#each [...$events.filter((e) => e.kind !== 0)] as event}
			<div
				class="flex flex-col h-60 w-full justify-between space-y-8 bg-slate-100 shadow-sm rounded-3xl break-all"
			>
				<div class="flex flex-row p-8 overflow-y-scroll">
					<p class={`font-base font-medium text-base break-all select-text`}>
						{@html parseEvents(event)}
					</p>
				</div>
				<div class="flex flex-row h-12 w-full px-6 pb-2 justify-between items-center">
					<div class="flex flex-row max-w-40 space-x-4 items-center">
						<div class="w-8 h-8 rounded-full bg-blue-200 opacity-60" />
						<div class="w-44 text-sm truncate">
							{`written by ${nip19.npubEncode(event.pubkey)}`}
						</div>
					</div>
					<div class="flex text-sm">
						{new Date(Number(event.created_at) * 1000).toLocaleString()}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
