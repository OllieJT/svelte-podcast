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
npm install svelte-podcast@latest

# with yarn
yarn add svelte-podcast@latest

# with pnpm
pnpm add svelte-podcast@latest
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

You can find docs and guides for getting started on [svelte-podcast-docs.vercel.app](https://svelte-podcast-docs.vercel.app/)

> **Warning**
> This project is early in development. API changes are likely until we reach v1.0.0.

> **Info**
> Contributions are welcome but I do not plan to provide guides for contributing until the project is more stable.
