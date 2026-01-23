// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'

export const command = 'osascript ./nowplaying/applescript.scpt | echo'
export const refreshFrequency = 1000

export const initialState = {playing: false}

export const updateState = (event, previousState) => {
  if (event.error) {
    return {...previousState, warning: `We got an error: ${event.error}`}
  }

  const [, state, app, track, artist, error] = event.output.split('\n')

  if (error && error !== '{}') {
    const [errMsg, errNum] = error.replace(/'/g, '"').trim().split(',')

    return {
      playing: true,
      data: {
        app: 'Error',
        track: '',
        artist: '',
        error: {
          message: errMsg,
          number: errNum,
        },
      },
    }
  }

  const playing = state === 'playing'

  return playing
    ? {
        playing,
        data: {app, track, artist, error},
      }
    : {playing}
}

const truncate = input => (input.length > 42 ? `${input.substring(0, 39)}...` : input)

const displayData = ({app, artist, track, error}) => {
  const isSpotify = app === 'Spotify' ? 'inline-block' : 'none'
  const isAppleMusic = app === 'Music' ? 'inline-block' : 'none'

  if (error && error !== '{}') {
    return (
      <Player>
        <Error>
          {error.message} ({error.number})
        </Error>
      </Player>
    )
  }

  return (
    <Player>
      <Track>🎧 {truncate(track)}</Track>
      <Artist>👨‍🎤 {artist ? truncate(artist) : ''}</Artist>
      <SpotifyIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" display={isSpotify}>
        <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
      </SpotifyIcon>
      <MusicIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 361 361" display={isAppleMusic}>
        <defs>
          <linearGradient id="musicGradient" x1="180" y1="358.6" x2="180" y2="7.76">
            <stop offset="0%" stopColor="#FA233B" />
            <stop offset="100%" stopColor="#FB5C74" />
          </linearGradient>
        </defs>
        <rect width="361" height="361" rx="80.5" fill="url(#musicGradient)" />
        <path
          d="M254.5,55c-0.87,0.08-8.6,1.45-9.53,1.64l-107,21.59l-0.04,0.01c-2.79,0.59-4.98,1.58-6.67,3c-2.04,1.71-3.17,4.13-3.6,6.95c-0.09,0.6-0.24,1.82-0.24,3.62c0,0,0,109.32,0,133.92c0,3.13-0.25,6.17-2.37,8.76c-2.12,2.59-4.74,3.37-7.81,3.99c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01c-4.98,1.93-8.71,4.39-11.68,7.51c-5.89,6.17-8.28,14.54-7.46,22.38c0.7,6.69,3.71,13.09,8.88,17.82c3.49,3.2,7.85,5.63,12.99,6.66c5.33,1.07,11.01,0.7,19.31-0.98c4.42-0.89,8.56-2.28,12.5-4.61c3.9-2.3,7.24-5.37,9.85-9.11c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1.19-8.7,1.19-13.26l0-116.15c0-6.22,1.76-7.86,6.78-9.08c0,0,88.94-17.94,93.09-18.75c5.79-1.11,8.52,0.54,8.52,6.61l0,79.29c0,3.14-0.03,6.32-2.17,8.92c-2.12,2.59-4.74,3.37-7.81,3.99c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01c-4.98,1.93-8.71,4.39-11.68,7.51c-5.89,6.17-8.49,14.54-7.67,22.38c0.7,6.69,3.92,13.09,9.09,17.82c3.49,3.2,7.85,5.56,12.99,6.6c5.33,1.07,11.01,0.69,19.31-0.98c4.42-0.89,8.56-2.22,12.5-4.55c3.9-2.3,7.24-5.37,9.85-9.11c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1-8.7,1-13.26V64.46C263.54,58.3,260.29,54.5,254.5,55z"
          fill="white"
        />
      </MusicIcon>
    </Player>
  )
}

export const render = ({playing, data}) => (playing ? <div>{displayData(data)}</div> : '')

// Styling...
export const className = css`
  font:
    normal normal 400 1.96em/1.28 'Mona Sans',
    -apple-system,
    sans-serif;
  transition: all 1s ease;

  left: 1em;
  top: 0.32em;
  min-width: 200px;

  @media (prefers-color-scheme: light) {
    color: #101411;
  }

  @media (prefers-color-scheme: dark) {
    color: #f2f5f3;
  }
`

export const Error = styled('div')`
  font:
    normal normal 200 0.8em 'Monaspace Argon',
    ui-monospace,
    monospace;
  color: #fe4c25;
`

export const Player = styled('div')`
  font-size: 0.64em;
  margin: 0;
`

export const SpotifyIcon = styled('svg')`
  height: 0.75em;
  color: #1ed760;
  fill: currentColor;

  transform: translateY(2px);
`

export const MusicIcon = styled('svg')`
  height: 0.75em;
  width: 0.75em;
  border-radius: 0.12em;

  transform: translateY(2px);
`

export const Track = styled('span')`
  display: block;
`

export const Artist = styled('span')`
  font-weight: 100;

  margin-right: 0.32em;
`
