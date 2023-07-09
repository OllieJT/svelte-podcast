<script lang="ts">
	export let name: string;
</script>

<div class="flex flex-col items-stretch space-y-6">
	<div class="prose prose-lg prose-slate">
		<h3>{name}</h3>
	</div>

	<fieldset>
		<legend>{name} options</legend>
		<slot name="options" />
	</fieldset>

	<div class="w-full rounded-md border p-3">
		<div class="mx-auto w-max">
			<slot />
		</div>
	</div>
</div>
