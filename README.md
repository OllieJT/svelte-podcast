<!--
41.9 kB

First make this easier to understand. Next convert comments to JSDOC comments, then add additional JSDOC comments where needed. JSDOC comments should not include types that conflict with existing Typescript types. Finally make sure variables are snake_case and not cammalCase, and that types are in PascalCase.

Convert typescrtipt types to JSDOC types, object types should be extracted into an explicit typedef with descriptions for each property. Add JSDOC comments to explain anything that is exported. Make sure variables are snake_case and not cammalCase.
-->

# Svelte Podcast

Svelte-Podcast streamlines the creation of custom audio players and simplifies state management in Svelte apps.

|                                               Version                                               |                                               License                                               |                                                       Status                                                        |
| :-------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
| [![npm](https://img.shields.io/npm/v/svelte-podcast)](https://www.npmjs.com/package/svelte-podcast) | [![npm](https://img.shields.io/npm/l/svelte-podcast)](https://www.npmjs.com/package/svelte-podcast) | ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/olliejt/svelte-podcast/publish.yml) |

## What's inside?

### Build custom Audio Player UI

Simplify the creation of custom audio players with a set of headless components that keep out of your way and take care of core functionality.

### Easily manage Audio State

Loading, controlling, and keeping track of multiple audio sources is a pain. svelte-podcast abstracts this away and provides a simple interface to manage audio state.

### Track user preferences

Users expect a lot from media players. It should remember their preferences like playback speed, and it should remember where they were in an episode even after reloading the page. svelte-podcast takes care of this for you, and provides you with access to extend this with your own database.

### Features

-  🔊 Load and play audio files via URL or local files
-  🔃 Navigate via client-side routing while audio continues to play
-  🎛️ Simpler control over audio playback:
   -  Seek to a specific time
   -  skip forward ﹢ backward
   -  play ﹢ pause
   -  mute ﹢ unmute
-  🛟 Save and load a users progress for each episode in localStorage
-  💾 Save and load a users preferences (like playback speed) in localStorage
   -  ﹢ volume
   -  ﹢ playback speed
-  🖼️ Inject episode metadata into the audio store for ea

**Roadmap**
In no particular order, here are some of the things I'm confident will be added to this library:

-  [ ] Podcast player component utilities
-  [ ] Pre-built player components
-  [ ] RSS Feed parsing
-  [ ] Looping segments of an episode

[And more ideas being discussed](https://github.com/OllieJT/svelte-podcast/labels/feature)

## Docs

> **Warning**
> We're getting close to v1, but this project is stil pre v1.0.0. Braking changes are still possible.

> **Note**
> Contributions are welcome but I do not plan to provide guides for contributing until the project is more stable.

#### Install

```bash
# with npm
npm install svelte-podcast@latest

# with yarn
yarn add svelte-podcast@latest

# with pnpm
pnpm add svelte-podcast@latest
```

You can find docs and guides for getting started on [svelte-podcast.com](https://svelte-podcast.com/)

| Resource                                                          | Link                                                          |
| ----------------------------------------------------------------- | ------------------------------------------------------------- |
| Provides guidance on Installation, Audio Sources, and Type Safety | [Getting Started](https://svelte-podcast.com/getting-started) |
| Covers API methods for audio, user preferences, and user progress | [API](https://svelte-podcast.com/api)                         |
| Offers examples of Headless UI, Tailwind, and CSS players         | [Examples](https://svelte-podcast.com/examples)               |
