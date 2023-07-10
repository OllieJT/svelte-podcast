<script lang="ts">
	export let size = 24;
	export let value: number;
	export let type: 'forward' | 'backward';
</script>

<div class="svpod--skip-container" style="font-size:{size}px">
	<span class="svpod--skip-label">
		<span class="svpod--a11y-hidden">skip {type}</span>
		{value}
		<span class="svpod--a11y-hidden">seconds</span>
	</span>
	<span
		class="svpod--skip-mask"
		class:svpod--skip-mask--right={type === 'backward'}
		class:svpod--skip-mask--left={type === 'backward'}
	/>
	<div class="svpod--skip-icon">
		{#if type === 'forward'}
			<!-- forward -->
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				style="font-size:{size}px"
			>
				<path
					d="M15.5922 0.913446C14.1363 0.310389 12.5759 -1.8792e-08 11 0L11 2C12.3132 2 13.6136 2.25866 14.8268 2.7612C16.0401 3.26375 17.1425 4.00035 18.0711 4.92893C18.9997 5.85752 19.7362 6.95991 20.2388 8.17317C20.6133 9.07731 20.8524 10.0298 20.9499 11H22.9583C22.8551 9.76677 22.5617 8.55484 22.0866 7.4078C21.4835 5.95189 20.5996 4.62902 19.4853 3.51472C18.371 2.40042 17.0481 1.5165 15.5922 0.913446Z"
					fill="currentColor"
				/>
				<path
					d="M22.9583 13C22.9338 13.2923 22.8987 13.5835 22.853 13.8728L20.9082 13.3517C20.9242 13.2348 20.9381 13.1175 20.9499 13H22.9583Z"
					fill="currentColor"
				/>
				<path
					d="M20.4408 15.297L22.3771 15.8159C22.2894 16.0775 22.1925 16.3365 22.0866 16.5922C22.078 16.6128 22.0694 16.6334 22.0608 16.6539L20.3123 15.6444C20.3573 15.5293 20.4002 15.4135 20.4408 15.297Z"
					fill="currentColor"
				/>
				<path
					d="M19.3994 17.4268L21.1333 18.4278C20.9675 18.6892 20.7916 18.944 20.6061 19.1919L19.1744 17.7602C19.2516 17.6505 19.3267 17.5394 19.3994 17.4268Z"
					fill="currentColor"
				/>
				<path
					d="M17.8609 19.2751L19.2757 20.6899C19.0399 20.9144 18.7954 21.1289 18.5429 21.333L17.5281 19.5752C17.6412 19.4778 17.7521 19.3777 17.8609 19.2751Z"
					fill="currentColor"
				/>
				<path
					d="M15.8834 20.7265L16.8835 22.4587C16.5838 22.6273 16.2766 22.7831 15.9628 22.9257L15.4366 20.9619C15.5876 20.8872 15.7366 20.8087 15.8834 20.7265Z"
					fill="currentColor"
				/>
				<path
					d="M13.5553 21.668L14.0729 23.5999C13.7189 23.6937 13.3609 23.7712 13 23.8322V21.798C13.1862 21.7599 13.3714 21.7166 13.5553 21.668Z"
					fill="currentColor"
				/>
			</svg>
		{:else}
			<!-- back -->
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				style="font-size:{size}px"
			>
				<path
					d="M11.0003 21.9499V23.9583C10.6215 23.9266 10.2447 23.877 9.87115 23.8096L10.391 21.8697C10.5931 21.9026 10.7963 21.9294 11.0003 21.9499Z"
					fill="currentColor"
				/>
				<path
					d="M7.8915 21.1169C7.98478 21.159 8.07876 21.1996 8.17342 21.2388C8.26813 21.278 8.36337 21.3158 8.45911 21.352L7.9393 23.292C7.7608 23.2278 7.58367 23.1593 7.40805 23.0866C7.23249 23.0138 7.05886 22.937 6.8873 22.8562L7.8915 21.1169Z"
					fill="currentColor"
				/>
				<path
					d="M5.67173 19.7427C5.8305 19.8725 5.99315 19.9973 6.15943 20.1169L5.15524 21.8563C4.84345 21.6397 4.54188 21.4084 4.25159 21.1629L5.67173 19.7427Z"
					fill="currentColor"
				/>
				<path
					d="M3.88341 17.841C4.00303 18.0072 4.12778 18.1698 4.25752 18.3285L2.83737 19.7487C2.59192 19.4584 2.36059 19.1569 2.14409 18.8452L3.88341 17.841Z"
					fill="currentColor"
				/>
				<path
					d="M2.64825 15.5412C2.68449 15.6369 2.72223 15.7321 2.76146 15.8268C2.80069 15.9215 2.84134 16.0156 2.88341 16.1089L1.14409 17.1131C1.06327 16.9415 0.986441 16.7678 0.913699 16.5922C0.840963 16.4166 0.772485 16.2395 0.708295 16.061L2.64825 15.5412Z"
					fill="currentColor"
				/>
				<path
					d="M2.05038 13C2.07088 13.204 2.09764 13.4072 2.1306 13.6093L0.19065 14.1291C0.123306 13.7556 0.0736704 13.3788 0.0419922 13H2.05038Z"
					fill="currentColor"
				/>
				<path
					d="M2.05038 11C2.14788 10.0298 2.38695 9.07731 2.76146 8.17317C3.26401 6.95991 4.0006 5.85752 4.92919 4.92893C5.85777 4.00035 6.96016 3.26375 8.17342 2.7612C9.38667 2.25866 10.687 2 12.0003 2V0C10.4244 1.8792e-08 8.86396 0.310389 7.40805 0.913446C5.95215 1.5165 4.62928 2.40042 3.51497 3.51472C2.40067 4.62902 1.51676 5.95189 0.913699 7.4078C0.438578 8.55484 0.145121 9.76677 0.0419922 11H2.05038Z"
					fill="currentColor"
				/>
			</svg>
		{/if}
	</div>
</div>

<style>
	div.svpod--skip-container {
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: center;
		width: 1.5em;
		height: 1.5em;
	}

	div.svpod--skip-icon,
	span.svpod--skip-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	span.svpod--skip-mask {
		z-index: 1;
		background: linear-gradient(0deg, var(--bg), transparent);
		opacity: 0.5;
	}

	div.svpod--skip-icon {
		z-index: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--svpod--content--base);
	}

	span.svpod--skip-label {
		position: relative;
		z-index: 2;
		font-size: 0.5em;
		line-height: 1em;
		color: var(--svpod--content--lighter);
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
		/* animation: Spin 1s cubic-bezier(0.5, 0.1, 0.1, 0.8) infinite; */
	}
</style>
