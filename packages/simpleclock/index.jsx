// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'
import {formatTime} from './lib/time.js'

export const refreshFrequency = 1000 // Use ms (every seconds)

// eslint-disable-next-line no-unused-vars
export const command = dispatch => {}

export const render = () => {
  const {date: myDate, time: myTime} = formatTime(new globalThis.Date())

  return (
    <SimpleClock>
      <Time>{myTime}</Time>
      <Date>{myDate}</Date>
    </SimpleClock>
  )
}

// Styling...
export const className = css`
  --widget-text: #101411;
  --widget-muted: #58635b;

  font:
    normal normal 400 1.96em/1.28 'Mona Sans',
    -apple-system,
    sans-serif;
  color: var(--widget-text);
  transition: opacity 1s ease;

  @media (prefers-color-scheme: dark) {
    --widget-text: #f2f5f3;
  }

  left: 1em;
  top: 2.4em;
  min-width: 200px;
`

export const SimpleClock = styled('div')``

export const Time = styled('span')``

export const Date = styled('span')`
  color: var(--widget-muted);
  font-size: 0.32em;
  font-weight: 100;

  margin-left: 0.64em;
`
