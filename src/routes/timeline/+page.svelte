<script lang="ts">
	//
	let text1 = `Timeline of Core Platform`;
</script>

<div class="flex flex-col w-full min-h-screen space-y-6 items-center">
	<div class="flex font-sans text-2xl">
		{text1}
	</div>
	<div class="flex flex-row w-full">
		<div class="flex flex-row basis-1/3 justify-end">
			<div class="flex flex-col w-10 py-12 space-y-16">
				{#each [`Q4 2023`, `Q1 2024`] as tm}
					<div class="font-semibold text-sm opacity-60">
						{tm}
					</div>
				{/each}
			</div>
		</div>
		<div class="flex flex-col basis-2/3 justify-center items-center">
			<ul class="steps steps-vertical steps-xl">
				<li class="step">Initial development phase building NOSTR client</li>
				<li class="step">Second phase writing the LLM API</li>
				<li class="step">Third phase alpha release and testing</li>
				<li class="step">Fourth phase launch of the Core Platform</li>
			</ul>
		</div>
		<div class="flex basis-1/3">
			{` `}
		</div>
	</div>
</div>
