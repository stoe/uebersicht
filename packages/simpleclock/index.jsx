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
      <Time>{myTime}</Time>
      <Date>{myDate}</Date>
    </SimpleClock>
  )
}

// Styling...
export const className = css`
  font:
    normal normal 100 1.96em/1.28 -apple-system,
    Helvetica Neue;
  transition: all 1s ease;

  @media (prefers-color-scheme: light) {
    color: #2f363d;
  }
  @media (prefers-color-scheme: dark) {
    color: #ebebeb;
  }

  left: 1em;
  top: 2.4em;
  min-width: 200px;
`

export const SimpleClock = styled('div')`
  margin: 0;
`

export const Time = styled('span')`
  font-weight: 400;
`

export const Date = styled('span')`
  font-size: 0.32em;
  font-weight: 100;
  margin-left: 0.75em;
  opacity: 0.32;
`
