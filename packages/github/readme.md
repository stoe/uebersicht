# uebersicht-github-contibutions

> GitHub contribution graph widget for [Übersicht](http://tracesof.net/uebersicht)

## Features

- Display your GitHub contribution graph
- Shows daily contribution count
- Supports light and dark color schemes
- Customizable styling with Mona Sans typography
- Real-time updates

## Installation

1. Clone this repository into your Übersicht widgets folder:

```bash
git clone https://github.com/stoe/uebersicht.git ~/.config/übersicht/widgets/uebersicht
```

2. Or manually copy the `packages/github` folder into your Übersicht widgets directory.

## Usage

The widget requires a GitHub personal access token to fetch contribution data.

### Configuration

Create or edit `packages/github/credentials.json`:

```json
{
  "token": "your_github_personal_access_token"
}
```

## Styling

The widget uses the following design tokens:

- **Font**: Mona Sans (body), Monaspace Argon (code)
- **Light mode**: #101411 (text), #fe4c25 (error)
- **Dark mode**: #f2f5f3 (text), #fe4c25 (error)

## License

MIT © [Stefan Stölzle](https://github.com/stoe)
