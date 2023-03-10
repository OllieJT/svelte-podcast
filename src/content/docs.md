## Table of contents

## What is svelte-podcast?

### Motivation

At it's core svelte-podcast provides tooling to make the following tasks easier:

#### I want to build a custom audio player

The default audio element is quite nice, but there are 2 main reasons why people want to build their own;

1. to customize the look and feel
2. to add custom functionality.

svelte-podcast provides a simple API enabling you to resolve both of these desires.

#### I find managing the state of audio difficult

It's one thing to load, play, and pause audio on a single page, but what if you want to build more custom or advanced behaviours like

> Can audio continue playing when the user navigates to a new page.

> Can I play/pause an episode from content like an article?

> Can I highlight show notes relevant to the current timestamp?

svelte-podcast makes solving these challenges easier by simplifying your interactions with the audio element.

#### I find RSS frustrating to work with

We're still working on this, it'll be coming soon™️!

### Features

| Feature             | Description                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **Simple API**      | Get essential audio data like the current timestamp, duration, play state and more...          |
| **Simple Controls** | Control your active audio source with play, pause, seek, and more methods...                   |
| **Extensible**      | Define your own metadata for each episode to easily association content with the current audio |
| **Save Progress**   | Save and load a users progress and preferences to localStorage, or your own database           |
| **Persistence**     | If your site makes use of client side routing, audio will continue playing when users navigate |
| **Typescript**      | 1st class types, with type overrides for defining your own metadata requirements               |

## Get Started

### Install

Install the latest version of svelte-podcast with your preferred package manager.

```sh
# with npm
npm install svelte-podcast@latest

# with yarn
yarn add svelte-podcast@latest

# with pnpm
pnpm add svelte-podcast@latest
```

### Setup

Add the AudioLoader component to your root layout. You must have one of these for svelte-podcast to work. You should also only load one instance of this at a time, and so we recommend you loading it at the base of your app.

```svelte
<!-- /routes/+layout.svelte -->
<script>
	import { AudioLoader } from 'svelte-podcast';
</script>

<AudioLoader />

<!-- your layout -->

<slot />
```

### Load an episode

All you need to load an episode is a URL to an audio file. svelte-podcast uses a html audio element under the hood, so any audio file compatible with the autio element is also compatible with this package.

#### Using a URL (Most Common)

An **audio url** could be a URL to an MP3 file from an RSS feed, like this: `https://media.transistor.fm/27a058c9/27b595e2.mp3`. It could also be a path to a static file on your server.

#### Using a static file

If you're using SvelteKit, you can store **static files** in the /static directory. When your site is built, everything in the static directory will be at the root of your site. If you have a file in `/static/episides/episode-01.mp3` you could load it as `/episides/episode-01.mp3`

#### Using the AudioLoader component

Only one piece of audio can be loaded at a time, however a users progress for each audio is saved in localStorage when they play, pause, or skip. You can load audio via the `episode_audio` store from anywhere in your project.

##### Example: Load audio after page is loaded

```svelte
<script>
	import { onMount } from 'svelte';
	import { episode_audio } from 'svelte-podcast';

	onMount(() => {
		// load the episode on mount without any metadata
		episode_audio.load('/episode-audio.mp3', {
			/* optional metadata */
		});
	});
</script>
```

##### Example: Load audio after a user clicks a button

```svelte
<script>
	import { episode_audio } from 'svelte-podcast';
</script>

<!-- load the episode on click -->
<button
	on:click={() =>
		episode_audio.load('/episode-audio.mp3', {
			/* optional metadata */
		})}
>
	Load Episode
</button>

<!-- unload the episode on click -->
<button on:click={() => episode_audio.unload()}>Unload Episode</button>
```

## Components

### `<PlayerWidget/>`

Coming soon...

### `<PlayerStack/>`

Coming soon...

### `<HeadlessTimeline/>`

Coming soon...

## Utilities

### Debug Mode

Coming soon...

### audio

Coming soon...

### episode_progress

Coming soon...

### episode_details

Coming soon...

### user_progress & user_preferences

Coming soon...

### save_podcast_state

Coming soon...

### secondsToTimestamp

Coming soon...

## Typescript

### Override types

Coming soon...

### Exported types

Coming soon...