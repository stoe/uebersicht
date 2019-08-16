import {styled, css} from 'uebersicht'

const moment = require('moment')

export const refreshFrequency = 30000 // Use ms (every 30 seconds)

export const command = dispatch => {}

export const render = ({items, error}) => {
  const [myDate, myTime] = moment()
    .format('DD.MM.YYYY HH:mm')
    .split(' ')

  return error ? (
    <div>
      Something went wrong: <strong>{String(error)}</strong>
    </div>
  ) : (
    <SimpleClock>
      <span className={time}>{myTime}</span>
      <span className={date}>{myDate}</span>
    </SimpleClock>
  )
}

// Styling...
export const className = css`
  font-family: -apple-system, Helvetica Neue;
  color: #f5f5f532;
  left: 2em;
  top: 2em;
  min-width: 200px;
`

export const SimpleClock = styled('div')`
  font-size: 2.5em;
  margin: 0;
`

export const time = css`
  font-weight: 300;
  color: #f5f5f596;
`
export const date = css`
  font-size: 0.32em;
  font-weight: 100;
  color: #f5f5f525;
  margin-left: 0.75em;
`
