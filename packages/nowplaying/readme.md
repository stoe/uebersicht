# uebersicht-nowplaying

> A "now playing" on Spotify/Music app widget for [Übersicht](http://tracesof.net/uebersicht)

## Features

- Display currently playing track from Spotify or Apple Music
- Show artist and track information
- Supports light and dark color schemes
- Mona Sans typography
- Branded icons for Spotify and Apple Music

## Installation

1. Clone this repository into your Übersicht widgets folder:

```bash
git clone https://github.com/stoe/uebersicht.git ~/.config/übersicht/widgets/uebersicht
```

2. Or manually copy the `packages/nowplaying` folder into your Übersicht widgets directory.

## Styling

The widget uses the following design tokens:

- **Font**: Mona Sans with sans-serif fallback

| Color                | Light              | Dark               |
| -------------------- | ------------------ | ------------------ |
| Primary              | #101411            | #f2f5f3            |
| Secondary            | #58635b            | #a4aea6            |
| Spotify              | #08872b            | #1ed760            |
| Apple Music gradient | #cf2230 to #fa4549 | #fa383d to #fc5c5d |
| Error                | #ae0b29            | #fd8986            |

Text, icons, and errors follow the system appearance. The widget remains transparent.

## License

MIT © [Stefan Stölzle](https://github.com/stoe)
