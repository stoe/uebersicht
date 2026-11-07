# uebersicht-worldclock

> A worldclock widget for [Übersicht](http://tracesof.net/uebersicht)

## Features

- Display current time across multiple timezones
- Customizable timezone list
- Supports light and dark color schemes
- Mona Sans typography for consistent design
- Real-time updates
- Named timezone abbreviations with automatic daylight-saving updates

The widget uses native `Date` and `Intl.DateTimeFormat` APIs for timezone conversion and formatting. No production npm dependencies are required.

Configured zones display PT/PDT, MT/MDT, CT/CDT, ET/EDT, GMT/BST, CET/CEST, IST, and AEST/AEDT. US zones use two-letter labels during standard time and three-letter labels during daylight saving. Additional zones display their configured timezone identifier instead of numeric GMT offsets.

## Installation

1. Clone this repository into your Übersicht widgets folder:

```bash
git clone https://github.com/stoe/uebersicht.git ~/.config/übersicht/widgets/uebersicht
```

2. Or manually copy the `packages/worldclock` folder into your Übersicht widgets directory.

## Configuration

Edit the widget to customize which timezones to display.

## Styling

The widget uses the following design tokens:

- **Font**: Mona Sans with sans-serif fallback
- **Light mode**: #101411
- **Dark mode**: #f2f5f3

## License

MIT © [Stefan Stölzle](https://github.com/stoe)
