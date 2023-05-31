<script lang="ts">
	let navlinks = [`about-us`, `search`];
</script>

<nav
	class="flex flex-row h-16 w-full px-4 space-x-24 items-center justify-between border-b border-slate-200"
>
	<div
		class="pl-8 pr-8 py-[1px] bg-white justify-center items-center rounded-full text-slate-800 font-bold"
	>
		IntentionRegistry
	</div>

	<div class="flex flex-row w-full space-x-12">
		{#each navlinks as link}
			<a href={link}>
				<p class="font-base font-medium text-base capitalize">
					{link.replaceAll(`-`, ` `)}
				</p>
			</a>
		{/each}
	</div>
</nav>
