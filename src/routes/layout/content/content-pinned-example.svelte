<script lang="ts">
	export let prefix: string | undefined = undefined;
	export let title: string;
	export let description: string | undefined = undefined;
</script>

<div
	class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
>
	<div class="absolute inset-0 -z-10 overflow-hidden">
		<svg
			class="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-mono-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
			aria-hidden="true"
		>
			<defs>
				<pattern
					id="e813992c-7d03-4cc4-a2bd-151760b470a0"
					width="200"
					height="200"
					x="50%"
					y="-1"
					patternUnits="userSpaceOnUse"
				>
					<path d="M100 200V.5M.5 .5H200" fill="none" />
				</pattern>
			</defs>
			<svg x="50%" y="-1" class="overflow-visible fill-mono-50">
				<path
					d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
					stroke-width="0"
				/>
			</svg>
			<rect
				width="100%"
				height="100%"
				stroke-width="0"
				fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
			/>
		</svg>
	</div>
	<div
		class="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10"
	>
		<div
			class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
		>
			<div class="lg:pr-4">
				<div class="lg:max-w-lg">
					<p class="text-base font-semibold leading-7 text-primary-600">svelte-podcast</p>
					<h1 class="mt-2 text-3xl font-bold tracking-tight text-mono-900 sm:text-4xl">
						The fastest way to build a podcast site with Svelte.
					</h1>
					{#if description}
						<p class="mt-6 text-xl leading-8 text-mono-700">
							{description}
						</p>
					{/if}
				</div>
			</div>
		</div>
		<div
			class="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
		>
			<img
				class="w-[48rem] max-w-none rounded-xl bg-mono-900 shadow-xl ring-1 ring-mono-400/10 sm:w-[57rem]"
				src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
				alt=""
			/>
		</div>
		<div
			class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
		>
			<div class="lg:pr-4">
				<div class="max-w-xl text-base leading-7 text-mono-700 lg:max-w-lg">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
