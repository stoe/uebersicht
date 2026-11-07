# uebersicht-simpleclock

> A simple clock widget for [Übersicht](http://tracesof.net/uebersicht)

## Features

- Display current time in a large, readable format
- Supports light and dark color schemes
- Mona Sans typography for consistent design
- Minimal and clean appearance

The widget formats local dates and times with the native `Date` API. No production npm dependencies are required.

## Installation

1. Clone this repository into your Übersicht widgets folder:

```bash
git clone https://github.com/stoe/uebersicht.git ~/.config/übersicht/widgets/uebersicht
```

2. Or manually copy the `packages/simpleclock` folder into your Übersicht widgets directory.

## Styling

The widget uses the following design tokens:

- **Font**: Mona Sans with sans-serif fallback

| Color     | Light   | Dark    |
| --------- | ------- | ------- |
| Primary   | #101411 | #f2f5f3 |
| Secondary | #58635b | #a4aea6 |

Colors follow the system appearance. The date uses an opaque secondary color, while the widget remains transparent.

## License

MIT © [Stefan Stölzle](https://github.com/stoe)
