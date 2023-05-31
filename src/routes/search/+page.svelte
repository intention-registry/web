<script lang="ts">
	//
	let text1 = `Search`;
	let search = ``;
</script>

<div class="flex flex-col w-full min-h-screen space-y-12 items-center">
	<div class="flex font-sans text-3xl">
		{text1}
	</div>
	<div class="flex flex-row w-full px-48 justify-center">
		<input
			class="input input-primary w-full border-2"
			placeholder="search nostr relays"
			value={search}
			on:change={(e) => (search = `${e.currentTarget.value}`)}
		/>
	</div>
	<div class="flex flex-row w-full px-48 justify-center font-bold text-slate-800 opacity-70">
		{0} results
	</div>
</div>
