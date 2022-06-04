// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'
import moment from 'moment'

export const refreshFrequency = 1000 // Use ms (every seconds)

// eslint-disable-next-line no-unused-vars
export const command = dispatch => {}

export const render = () => {
  const [myDate, myTime] = moment().format('DD.MM.YYYY HH:mm').split(' ')

  return (
    <SimpleClock>
      <span className={time}>{myTime}</span>
      <span className={date}>{myDate}</span>
    </SimpleClock>
  )
}

// Styling...
export const className = css`
  font: normal normal 100 0.96em/1.28 -apple-system, Helvetica Neue;

  @media (prefers-color-scheme: light) {
    color: #0066ff64;
  }
  @media (prefers-color-scheme: dark) {
    color: #ebebeb64;
  }

  left: 0.8em;
  top: 6em;
  min-width: 200px;
`

export const SimpleClock = styled('div')`
  font-size: 2.5em;
  margin: 0;
`

export const time = css`
  font-weight: 300;

  @media (prefers-color-scheme: light) {
    color: #0066ff;
    text-shadow: 1px 2px 2px #00000064;
  }
  @media (prefers-color-scheme: dark) {
    color: #ebebeb;
    text-shadow: 1px 2px 2px #1b1f2364;
  }
`
export const date = css`
  font-size: 0.32em;
  font-weight: 100;
  margin-left: 0.75em;
`
