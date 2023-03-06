<script lang="ts">
	export let size = 24;
</script>

<style>
	div.svpod--spinner-container {
		display: inline-block;
		position: relative;
	}

	div.svpod--item {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.5;
		color: var(--svpod--accent--lighter);
	}
	div.svpod--item:nth-child(1) {
		opacity: 1;
		color: var(--svpod--content--lighter);
		z-index: 2;
	}

	@keyframes Spin {
		0%,
		100% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	svg {
		animation: Spin 1s cubic-bezier(0.5, 0.1, 0.1, 0.8) infinite;
	}
</style>

<div class="svpod--spinner-container" style="width:{size}px; height:{size}px">
	{#each [0, 0.075, 0.15] as delay}
		<div class="svpod--item">
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				style="animation-delay: {delay}s;"
			>
				<path
					d="M24 12C24 14.3734 23.2962 16.6935 21.9776 18.6668C20.6591 20.6402 18.7849 22.1783 16.5922 23.0866C14.3995 23.9948 11.9867 24.2324 9.65892 23.7694C7.33114 23.3064 5.19295 22.1635 3.51472 20.4853C1.83649 18.8071 0.693599 16.6689 0.230577 14.3411C-0.232446 12.0133 0.00519403 9.60051 0.913446 7.4078C1.8217 5.21509 3.35977 3.34094 5.33316 2.02236C7.30655 0.703788 9.62662 -2.83022e-08 12 0L12 3C10.22 3 8.47991 3.52784 6.99987 4.51677C5.51983 5.50571 4.36627 6.91131 3.68508 8.55585C3.0039 10.2004 2.82567 12.01 3.17293 13.7558C3.5202 15.5016 4.37737 17.1053 5.63604 18.364C6.89471 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.4722 15.5201 21 13.78 21 12H24Z"
					fill="currentColor"
				/>
			</svg>
		</div>
	{/each}
</div>
