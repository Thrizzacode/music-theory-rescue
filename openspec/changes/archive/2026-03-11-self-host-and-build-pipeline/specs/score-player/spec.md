## MODIFIED Requirements

### Requirement: MusicXML score rendering

The system SHALL load the AlphaTab library from a local self-hosted path (`lib/alphatab/`) instead of a CDN URL.

#### Scenario: local-alphatab-loading

- **WHEN** the player initializes AlphaTab
- **THEN** the AlphaTab ES module SHALL be imported from a local relative path (e.g., `../lib/alphatab/alphaTab.min.mjs`)
- **AND** the font directory SHALL reference a local path (e.g., `lib/alphatab/font/`)
- **AND** the SoundFont file SHALL be loaded from a local path (e.g., `lib/alphatab/soundfont/sonivox.sf2`)

### Requirement: Playback controls

The SoundFont resource used for MIDI synthesis SHALL be served from a self-hosted local path instead of a CDN URL.

#### Scenario: local-soundfont-loading

- **WHEN** the player loads the SoundFont for audio playback
- **THEN** the SoundFont SHALL be fetched from `lib/alphatab/soundfont/sonivox.sf2`
- **AND** no external network request to a CDN SHALL be made for the SoundFont
