<script lang="ts">
	import Dataset from './Dataset.svelte';

	type dataset = {
		datasetName: string;
		title: string;
		description: string;
		organizationName: string;
		lastUpdate: string;
	};

	let datasets: dataset[] = [];

	let displayed_datasets: dataset[] = [];
	$: displayed_datasets = datasets;

	fetch('https://api.energidataservice.dk/meta/Dataset')
		.then((resp) => resp.json())
		.then((json) => (datasets = json as dataset[]))
		.catch((e) => {
			console.log(e);
		});
</script>

<div>
	{#if datasets.length === 0}
		<p>Loading...</p>
	{/if}

	<ul class="list">
		{#each displayed_datasets as ds}
			<Dataset dataset={ds} />
		{/each}
	</ul>
</div>

<style>
	div {
		max-width: 100%;
	}

	.list {
		max-width: 100%;
		list-style: none;
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
</style>
