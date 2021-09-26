import React, {styled, css} from 'uebersicht'

export const command = 'osascript ./nowplaying/applescript.scpt | echo'
export const refreshFrequency = 1000

export const initialState = {playing: false}

export const updateState = (event, previousState) => {
  if (event.error) {
    return {...previousState, warning: `We got an error: ${event.error}`}
  }

  const [, state, app, track, artist, position, length] = event.output.split('\n')

  const playing = state === 'playing'

  return playing
    ? {
        playing,
        data: {app, track, artist, position, length}
      }
    : {playing}
}

const truncate = input => (input.length > 42 ? `${input.substring(0, 39)}...` : input)

const displayData = ({app, artist, track}) => {
  const isSpotify = app === 'Spotify' ? 'inline' : 'none'
  const isAppleMusic = app === 'Music' ? 'inline' : 'none'

  return (
    <Player>
      <span className={trackClass}>{truncate(track)}</span>
      {artist ? <span className={artistClass}>{truncate(artist)}</span> : ''}
      <SpotifyIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className={app} display={isSpotify}>
        <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
      </SpotifyIcon>
      <MusicIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className={app} display={isAppleMusic}>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </MusicIcon>
    </Player>
  )
}

export const render = ({playing, data}) => (playing ? <div>{displayData(data)}</div> : '')

// Styling...
export const className = css`
  font: normal normal 100 0.96em/1.28 -apple-system, Helvetica Neue;
  left: 0.8em;
  top: 0.64em;
  min-width: 200px;
`

export const Player = styled('div')`
  font-size: 1.5em;
  font-weight: 100;
  color: #fff;
  margin: 0;
`

export const app = css`
  font-weight: 400;
  margin-right: 0.32em;
`

export const SpotifyIcon = styled('svg')`
  color: #1db95464;
  fill: currentColor;
  height: 0.75em;
`

export const MusicIcon = styled('svg')`
  color: #9a9a9a94;
  fill: currentColor;
  height: 0.75em;
`

export const trackClass = css`
  font-weight: 300;
  display: block;
  text-shadow: 1px 2px 2px #00000064;
`

export const artistClass = css`
  color: #9a9a9a94;
  font-weight: 100;
  margin-right: 0.32em;
`
