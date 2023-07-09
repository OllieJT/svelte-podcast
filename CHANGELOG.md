# svelte-podcast

## 0.6.0

### Minor Changes

- 9232f4d: Improves theming with css variables
  Improves developer logs
  Fixes various package export issues
  Adds player components:

  - Player: `<PlayerStack />`
  - Player: `<PlayerWidget />`
  - Utility: `<HeadlessTimeline />`

## 0.5.0

### Minor Changes

- feba0d4: Improvements to audio stores:

  - Adds missing `is_paused` value.
  - Fixes to `start_at` value
  - Refactors localStorage stores & user preferences

## 0.4.0

### Minor Changes

- ff6a6d9: refactored audio element bindings for better control over element

## 0.3.4

### Patch Changes

- ff5caf2: fix to allow override of internal types

## 0.3.3

### Patch Changes

- 802c704: fixes dist exports

## 0.3.2

### Patch Changes

- 6c849b7: Fixes derived store causing exessive updates

## 0.3.1

### Patch Changes

- 02598d4: fixes exported typings

## 0.3.0

### Minor Changes

- 0b12aab: Adds mechanic for managing user preferences

## 0.2.0

### Minor Changes

- 6f89448: Adds the ability to bind episode metadata to the audio store
- a70d68d:
  - Restructures lib to make dist cleaner and dev easier to grock
  - Refactors <audio /> bindings to make it easier to change values when loading a different source
  - Moves more values to micro-stores
- 1841199: Adds save/load mechanic for episode progress

## 0.1.1

### Patch Changes

- 549d858: Fixes release build

## 0.1.0

### Minor Changes

- 2e6f082: Adds initial audio element abstraction with store
