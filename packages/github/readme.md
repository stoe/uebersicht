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

Install the GitHub widget's dependencies from the repository root with `npm install`. It uses `@octokit/graphql` for API requests and native `Date` arithmetic for the contribution window.

The widget runs `/opt/homebrew/bin/node`, which must provide Node.js 24+.

## Usage

The widget requires a GitHub personal access token to fetch contribution data.

### Configuration

Create or edit `packages/github/config.json`:

```json
{
  "token": "your_github_personal_access_token",
  "colorScheme": "default"
}
```

For existing installations, rename `credentials.json` to `config.json`, keeping your token. The config file is ignored by Git.

`colorScheme` defaults to `default`, which preserves GitHub's contribution colors. The custom themes are `gray`, `blue`, `yellow`, `red`, `purple`, `pink`, `coral`, `lemon`, `lime`, `teal`, and `indigo`.

Custom themes use steps 1, 3, 5, and 7 from the [Primer Brand color scales](https://primer.style/brand/primitives/color/). Their light and dark palettes switch automatically with your system preference, without waiting for another GitHub refresh.

Green is the default GitHub theme, and orange is reserved for Halloween; neither is a separate custom theme. Black and white themes are not provided. Unrecognized scheme names fall back to `default`.

When GitHub reports `isHalloween`, every scheme uses the existing automatic Halloween colors, including the widget's orange adjustment. The selected custom theme resumes afterward.

Custom-theme counts use contrasting light or solid dark text in both modes. Fourth-quartile counts retain contrast-aware text in the default and Halloween themes too. Counts are absolutely centered within each cell.

## Styling

The widget uses the following design tokens:

- **Font**: Mona Sans (body), Monaspace Argon (code)
- **Light mode**: #101411 (text), #fe4c25 (error)
- **Dark mode**: #f2f5f3 (text), #fe4c25 (error)

## License

MIT © [Stefan Stölzle](https://github.com/stoe)
