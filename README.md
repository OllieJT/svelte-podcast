# Svelte Podcast

A collection of tools for building podcast websites and tools with Svelte or SvelteKit.

|                                               Version                                               |                                               License                                               |                                                       Status                                                        |
| :-------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
| [![npm](https://img.shields.io/npm/v/svelte-podcast)](https://www.npmjs.com/package/svelte-podcast) | [![npm](https://img.shields.io/npm/l/svelte-podcast)](https://www.npmjs.com/package/svelte-podcast) | ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/olliejt/svelte-podcast/publish.yml) |

## What's inside?

- 🔊 Load and play audio files via URL or local files
- 🔃 Navigate via client-side routing while audio continues to play
- 🎛️ Simpler control over audio playback:
  - Seek to a specific time
  - skip forward ﹢ backward
  - play ﹢ pause
  - mute ﹢ unmute
- 🛟 Save and load a users progress for each episode in localStorage
- 💾 Save and load a users preferences (like playback speed) in localStorage
  - ﹢ volume
  - ﹢ playback speed
- 🖼️ Inject episode metadata into the audio store for ea

**Roadmap**
In no particular order, here are some of the things I'm confident will be added to this library:

- ☐ Podcast player component utilities
- ☐ Pre-built player component
- ☐ RSS Feed parsing
- ☐ Looping segments of an episode
- [And more ideas being discussed](https://github.com/OllieJT/svelte-podcast/labels/feature)

## Docs

> **Warning**
> This project is in early development. The docs are not yet complete and the API is likely to change before 1.0.0.

#### Install

```bash
# with npm
npm install svelte-podcast

# with yarn
yarn add svelte-podcast

# with pnpm
pnpm add svelte-podcast
```

You must add one instance of the `<AudioLoader />` to your app. This should be places as high as possible, ideally in your root `+layout,svelte` file.

```html
<script>
	import { AudioLoader } from 'svelte-podcast';
</script>

<AudioLoader />

<slot />
```

#### Basic usage

You will likely be interacting with svelte-podcast via one of the stores it exports.

```html
<script>
	import {
		// a custom store for subscribing to the state of the audio player and controlling audio element
		audio,

		// a custom store for subscribing to the users preferences and setting a users preference
		user_preferences,

		// a utility for saving and loading the progress of an episode
		episode_progress,

		// a utility for saving and loading both the progress and preferences
		save_podcast_state,
	} from 'svelte-podcast';
</script>
```

#### `audio` store

##### `subscribe`

```html
<script>
	import { audio } from 'svelte-podcast';

	// shorthand
	$audio;

	// longhand
	audio.subscribe((value) => {
		// value is the current state of the audio store
	});
</script>
```

##### methods

###### play / pause

`audio.play()` to play the currently loaded audio, or `audio.play("toggle")` to toggle play/pause.

`audio.pause()` to pause the currently loaded audio, or `audio.pause("toggle")` to toggle play/pause.

###### mute / unmute

`audio.mute()` to mute the audio for the `<audio />` element, or `audio.mute("toggle")` to toggle mute/unmute.
`audio.unmute()` to unmute the audio for the `<audio />` element, or `audio.unmute("toggle")` to toggle mute/unmute.

###### load / unload

`audio.load(data: AudioLoadData, opts: AudioLoadOptions)` to load a new episode into the `<audio />` element.

- AudioLoadData is an object with the following properties:
  - src: `string` - the URL or local path to the audio file
  - title: `string` - the title of the episode
  - artwork: `string` - the URL or local path to the artwork for the episode
- AudioLoadOptions is an object with the following properties:
- autoplay: `boolean` - whether or not to autoplay the audio when it is loaded. Typically this should be set to `true`
- start_at: `number | undefined` - the time in seconds to start the audio at. Useful for resuming playback from a previous session. This will be overridden by the users episode progress if it exists.

`audio.unload()` - unloads the currently loaded audio file from the `<audio />` element.

###### seek / skip

`audio.seek(seconds, from)` - seek to a specific moment in the audio file.

- seconds: `number` - the time in seconds to seek to
- from: `'from-start' | 'from-end'` - whether to seek relative to the start or end of the audio file. Defaults to `'from-start'`

`audio.skip(seconds, type)` - similar to seek, but always relative to the current time.

- seconds: `number` - the time in seconds to skip
- type: `'forward' | 'backward'` - whether to skip forward or backward. Defaults to `'forward'`

Example payload:

```json
{
	"current_time": 35.624346,
	"duration": 3378.756,
	"ended": false,
	"loading": false,
	"paused": true,
	"start_at": 27.37508,
	"autoplay": true,
	"muted": false,
	"src": "/example-syntax.mp3",
	"metadata": {
		"title": "Supper Club × Rich Harris, Author of Svelte",
		"artwork": "https://ssl-static.libsyn.com/p/assets/b/3/c/d/b3cdf28da11ad39fe5bbc093207a2619/Syntax_-_499.jpg"
	},
	"playback_rate": 2,
	"volume": 1,
	"timestamp": "00:35"
}
```

#### `user_preferences` store

##### `subscribe`

```html
<script>
	import { user_preferences } from 'svelte-podcast';

	// shorthand
	$user_preferences;

	// longhand
	user_preferences.subscribe((value) => {
		// value is the current state of the user_preferences store
	});
</script>
```

#### `episode_progress` utilities

#### `save_podcast_state` utilities

## Contributing

> **Warning**
> This project is very early in development. Contributions are welcome but I do not plan to provide detailed docs for contributions until the project is more stable.
