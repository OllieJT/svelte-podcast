<script>
	/** @type {string} */
	export let name;

	/** @type {unknown} */
	export let data;
</script>

<div class="flex flex-col items-stretch space-y-6">
	<h3>{name}</h3>

	<h4>subscription: ${name}</h4>
	<pre><code class="hljs language-json">{JSON.stringify({ data }, null, 2)}</code></pre>

	<h4>methods</h4>
	<slot />
</div>
