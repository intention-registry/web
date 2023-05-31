<script lang="ts">
	let navlinks = [`about`, `timeline`, `search`];
</script>

<nav
	class="flex flex-row h-16 w-full px-4 space-x-24 items-center justify-between border-b border-slate-200"
>
	<a href="/">
		<div
			class="border border-slate-800 pl-8 pr-8 py-[4px] bg-white justify-center items-center rounded-full text-slate-800 font-bold lowercase leading-[17px]"
		>
			Intention Registry
		</div>
	</a>

	<div class="flex flex-row w-full space-x-12">
		{#each navlinks as link}
			<a href={`/${link}`}>
				<p class="font-base font-medium text-base lowercase">
					{link.replaceAll(`-`, ` `)}
				</p>
			</a>
		{/each}
	</div>
</nav>
