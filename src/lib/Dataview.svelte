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

		fetch(url)
			.then((resp) => resp.json())
			.then((json) => (records = json as record[]))
			.catch((e) => console.log(e));

		// disable scrolling
		document.documentElement.style.top = -document.documentElement.scrollTop + 'px';
		document.documentElement.style.position = 'fixed';
		document.documentElement.style.overflowY = 'scroll';
		document.body.style.overflowY = 'scroll';
		document.documentElement.style.width = '100vw';
	});

	function clearValue(event: MouseEvent) {
		if (event.target !== document.querySelector('#modal-backdrop-dataview')) return;
		name.set(null);

		// re-enable scrolling
		const scrollTop = Math.abs(parseInt(document.documentElement.style.top, 10));
		document.documentElement.removeAttribute('style');
		document.body.removeAttribute('style');
		document.documentElement.scrollTop = scrollTop;
		document.body.scrollTop = scrollTop;
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
		position: fixed;
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
		backdrop-filter: blur(4px);
		z-index: 99999;
		overscroll-behavior: none;
	}
	.modal {
		background-color: var(--tertiary-color);
		max-width: 100%;
		width: 720px;
		padding: 1rem;
		border-radius: 4px;
		max-height: 90vh;
		overscroll-behavior: none;
		scrollbar-gutter: stable;
	}
</style>
