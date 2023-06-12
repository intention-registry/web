<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import view from '$lib/stores/view';

	let navlinks = [`about`, `timeline`, `search`];
</script>

<nav
	class="flex flex-row min-h-16 w-full px-4 pb-3 space-x-24 items-center justify-between border-b border-slate-200"
>
	<button
		type={`button`}
		class={``}
		on:click|preventDefault={() => ($page.route.id === `/` ? view.set(`drawer`) : goto(`/`))}
	>
		<div
			class="border border-slate-800 pl-8 pr-8 py-[4px] bg-white justify-center items-center rounded-full text-slate-800 font-bold lowercase leading-[17px]"
		>
			Intention Registry
		</div>
	</button>

	<div class="max-sm:hidden flex flex-row w-full space-x-12 flex-wrap items-center">
		{#each navlinks as link}
			<a href={`/${link}`}>
				<p class="font-base font-medium text-base lowercase">
					{link.replaceAll(`-`, ` `)}
				</p>
			</a>
		{/each}
	</div>
</nav>
