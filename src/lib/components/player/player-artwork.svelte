<script lang="ts">
	export let src: string;
</script>

<img class="podcast-player-artwork" width={80} height={80} alt="" {src} />

<style>
	.podcast-player-artwork {
		width: 80px;
		height: 80px;
		object-fit: cover;
	}
</style>
