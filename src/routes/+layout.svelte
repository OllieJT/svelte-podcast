<script lang="ts">
	import { MagnifyingGlass } from '@inqling/svelte-icons/heroicon-20-solid';
	import { Github, Npm } from '@inqling/svelte-icons/simple-icons';
	// import 'highlight.js/styles/base16/dracula.css';
	import { AudioLoader } from 'svelte-podcast';
	import '../app.postcss';
</script>

<header class="bg-white shadow-sm lg:static lg:overflow-y-visible" id="navigation">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
			<div class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
				<div class="flex flex-shrink-0 items-center">
					<a href="/#navigation">
						<img
							class="block h-8 w-auto"
							width={60}
							height={32}
							src="/logo.png"
							alt="Your Company"
						/>
					</a>
				</div>
			</div>
			<div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
				<div
					class="flex items-center px-3 py-2 sm:py-3 sm:px-6 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"
				>
					<!-- TODO: add search functionality -->
					<div class="w-full">
						<label for="search" class="sr-only">Search</label>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<MagnifyingGlass class="h-5 w-5 text-mono-400" />
							</div>
							<input
								id="search"
								name="search"
								class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-mono-900 ring-1 ring-inset ring-mono-300 placeholder:text-mono-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
								placeholder="Search"
								type="search"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="flex items-center justify-end gap-3 sm:gap-5 xl:col-span-4">
				<a
					href="https://github.com/OllieJT/svelte-podcast"
					class="flex-shrink-0 rounded-full bg-white p-1 text-mono-400 hover:text-mono-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
				>
					<span class="sr-only">View notifications</span>
					<Github class="h-6 w-6" aria-hidden="true" />
				</a>
				<a
					href="https://www.npmjs.com/package/svelte-podcast"
					class="flex-shrink-0 rounded-full bg-white p-1 text-mono-400 hover:text-mono-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
				>
					<span class="sr-only">View notifications</span>
					<Npm class="h-6 w-6" aria-hidden="true" />
				</a>
			</div>
		</div>
	</div>
</header>

<AudioLoader />

<slot />
