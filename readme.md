# uebersicht

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Test](https://github.com/stoe/uebersicht/workflows/Test/badge.svg)](https://github.com/stoe/uebersicht/actions/workflows/test.yml) [![CodeQL](https://github.com/stoe/uebersicht/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/stoe/uebersicht/actions/workflows/github-code-scanning/codeql) [![Publish](https://github.com/stoe/uebersicht/actions/workflows/publish.yml/badge.svg)](https://github.com/stoe/uebersicht/actions/workflows/publish.yml)

Collection of widgets for [Übersicht](http://tracesof.net/uebersicht), a system-wide widget engine for macOS.

## Features

- **5 customizable widgets** for displaying GitHub activity, time, and media playback
- **Consistent design** across all widgets with Mona Sans typography
- **Light & dark mode support** with carefully chosen color palettes
- **Real-time updates** for dynamic information display
- **Type-safe JavaScript/JSX** with ESLint and Prettier formatting
- **Monorepo structure** using npm workspaces for easy management

## Widgets

### [github](packages/github)

GitHub contribution graph widget displaying your GitHub activity with real-time updates.

**Features:** Daily contribution count, light/dark color schemes, Mona Sans typography

### [me](packages/me)

Personal information or status widget for displaying custom content.

**Features:** Customizable display, SVG icon support, theme-aware styling

### [nowplaying](packages/nowplaying)

"Now playing" widget for Spotify and Apple Music showing currently playing tracks.

**Features:** Spotify and Apple Music support, artist/track info, branded icons, gradient styling

### [simpleclock](packages/simpleclock)

Simple, minimal clock widget displaying the current time in a large, readable format.

**Features:** Large format display, minimal design, consistent typography

### [worldclock](packages/worldclock)

Worldclock widget showing current time across multiple customizable timezones.

**Features:** Multi-timezone display, customizable locations, real-time updates

## Installation

1. Clone this repository into your Übersicht widgets folder:

```bash
git clone https://github.com/stoe/uebersicht.git ~/.config/übersicht/widgets/uebersicht
```

2. Or download and manually copy the folder into `~/.config/übersicht/widgets/`

3. Open Übersicht and enable the widgets you want to use

## Project Structure

```
packages/
  ├── github/          GitHub contributions widget
  ├── me/              Personal info widget
  ├── nowplaying/      Spotify/Music app widget
  ├── simpleclock/     Clock widget
  └── worldclock/      Multi-timezone clock widget
```

## Design System

All widgets share a consistent design language:

- **Font**: Mona Sans (body text), Monaspace Argon (code/monospace)
- **Light mode**: #101411 (text), #f2f5f3 (background context)
- **Dark mode**: #f2f5f3 (text), #101411 (background context)
- **Accent colors**: #fe4c25 (error)

## Development

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
npm install
```

### Available Scripts

```bash
npm run format    # Format code with Prettier
npm run test      # Run ESLint checks
npm run dev       # Development mode (if applicable)
```

### Code Quality

- **Linting**: ESLint with strict rules
- **Formatting**: Prettier with GitHub's config
- **Pre-commit**: Automatic formatting and linting via Husky

## License

[MIT](./license) © [Stefan Stölzle](https://github.com/stoe)
