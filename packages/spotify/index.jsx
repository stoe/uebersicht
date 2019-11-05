/* global React */
import {styled, css} from 'uebersicht'

export const refreshFrequency = 2000 // Use ms (every 2 seconds)

export const command = `osascript <<< 'tell application "Spotify"
  if it is running then
    set myTrack to current track
    if myTrack is not "missing value" then set myArtist to artist of myTrack
    if myTrack is not "missing value" then set myTitle to name of myTrack
    if myTrack is not "missing value" then return myArtist & "|" & myTitle
  end if
end tell'`

const truncate = input => (input.length > 42 ? `${input.substring(0, 39)}...` : input)

export const updateState = (event, prev) => {
  if (event.error) {
    return {...prev, warning: `We got an error: ${event.error}`}
  }

  switch (event.type) {
    case 'UB/COMMAND_RAN':
      // eslint-disable-next-line no-case-declarations
      const [spotifyArtist, spotifyTitle] = event.output.split('|')

      return {
        output: {spotifyArtist, spotifyTitle}
      }
    default:
      return prev
  }
}

export const render = ({output, error}) => {
  if (error) {
    return (
      <Error>
        Something went wrong: <strong>{String(error)}</strong>
      </Error>
    )
  }

  const {spotifyArtist, spotifyTitle} = output

  if (spotifyArtist && spotifyTitle) {
    return (
      <Spotify>
        <SpotifyIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
        </SpotifyIcon>
        <span className={title}>{truncate(spotifyTitle)}</span>
        <span className={artist}>{spotifyArtist}</span>
      </Spotify>
    )
  } else return null
}

// Styling...
export const className = css`
  font: normal normal 100 0.64em/1.28 -apple-system, Helvetica Neue;
  right: 2em;
  bottom: 2em;
  min-width: 200px;
  width: auto;
  text-align: right;
`

export const Error = styled('div')`
  font-size: 1em;
  color: #9c1c23;
  margin: 0;
`

export const Spotify = styled('div')`
  font-size: 2.5em;
  font-weight: 100;
  color: #fff;
  margin: 0;
`

export const SpotifyIcon = styled('svg')`
  color: #1db95464;
  fill: currentColor;
  height: 0.75em;
  margin-right: 0.32em;
`

export const title = css`
  font-weight: 400;
  margin-right: 0.32em;
`

export const artist = css`
  color: #9a9a9a64;
`
