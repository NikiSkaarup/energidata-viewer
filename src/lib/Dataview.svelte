<script lang="ts">
	import { name } from './DatasetStore';
	import type { dataset } from './DatasetType';

	let datasetValue: dataset | null = null;

	type record = {};

	let records: record[] = [];
	let displayed_records: record[] = [];
	$: displayed_records = records;

	const unsubscribe = name.subscribe((value) => {
		datasetValue = value;
		if (value === null) return;
		const url = `https://api.energidataservice.dk/Dataset/${value.datasetName}?timezone=UTC`;

		fetch('https://api.energidataservice.dk/meta/Dataset')
			.then((resp) => resp.json())
			.then((json) => (records = json as dataset[]))
			.catch((e) => {
				console.log(e);
			});
	});

	function clearValue(event: MouseEvent) {
		if (event.target !== document.querySelector('#modal-backdrop-dataview')) return;
		name.set(null);
	}
</script>

{#if datasetValue !== null}
	<div id="modal-backdrop-dataview" class="backdrop" on:click={clearValue}>
		<div class="modal">
			<h2>{datasetValue.datasetName} data</h2>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(6px);
		z-index: 99999;
	}
	.modal {
		background-color: var(--tertiary-color);
		max-width: 100%;
		width: 720px;
		padding: 1rem;
		border-radius: 4px;
	}
</style>
