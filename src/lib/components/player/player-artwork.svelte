<script lang="ts">
	export let src: string;
</script>

<img width={80} height={80} alt="" {src} />

<style>
	img {
		width: 80px;
		height: 80px;
		object-fit: cover;
		border-radius: 10%;
		overflow: hidden;
		pointer-events: none;
	}
</style>
