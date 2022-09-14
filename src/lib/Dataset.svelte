<script lang="ts">
	import { item } from './DatasetStore';
	type ds = {
		datasetName: string;
		title: string;
		description: string;
		organizationName: string;
		lastUpdate: string;
	};

	export let dataset: ds = {
		datasetName: '',
		title: '',
		description: '',
		lastUpdate: '',
		organizationName: ''
	};

	const url = `https://api.energidataservice.dk/Dataset/${dataset.datasetName}?timezone=UTC`;

	function openModal() {
		item.set(dataset);
	}
</script>

<li class="item">
	<p class="name">
		<a class="ellipsis" href={url} title={dataset.datasetName}>
			{dataset.datasetName}
		</a>
	</p>
	<p class="ellipsis organizationname" title={dataset.organizationName}>
		{dataset.organizationName}
	</p>
	<p class="ellipsis title" title={dataset.title}>{dataset.title}</p>
	<p class="lastupdate">{new Date(dataset.lastUpdate).toUTCString()}</p>
	<button class="btn" on:click={openModal}>view</button>
</li>

<style>
	.ellipsis {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	a {
		display: block;
	}

	.btn {
		padding: 0.125rem 0.5rem;
		display: block;
		width: 60px;
	}

	.item {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		max-width: 100%;
		gap: 0.5rem;
		padding: 0.5rem;
		font-size: 0.875rem;
	}

	.item:hover {
		background-color: var(--secondary-color);
	}

	.name {
		width: 250px;
	}

	.name > a {
		color: var(--text-color);
	}

	.name > a:visited {
		color: var(--accent-color);
	}

	.title {
		width: calc(100% - 647px);
	}

	.lastupdate {
		padding-top: 0.2rem;
		font-size: 0.75rem;
		width: 185px;
	}

	.organizationname {
		width: 120px;
	}
</style>
