<script lang="ts">
	import Explorer from '$lib/Explorer.svelte';
</script>

<svelte:head>
	<title>Explorer</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Explorer for
		<a target="_blank" referrerpolicy="no-referrer" href="https://www.energidataservice.dk/">
			Energi Data Service
		</a>
		data
	</h1>

	<Explorer />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		gap: 2rem;
	}
</style>
