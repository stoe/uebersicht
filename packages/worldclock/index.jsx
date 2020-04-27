/* global React */
import {styled, css} from 'uebersicht'

const moment = require('moment-timezone')

const list = [
  {city: 'San Francisco', tz: 'US/Pacific'},
  {city: 'Salt Lake City', tz: 'US/Mountain'},
  {city: 'Austin', tz: 'US/Central'},
  {city: 'New York', tz: 'US/Eastern'},
  {city: 'London', tz: 'Europe/London'},
  {city: 'Ichenhausen', tz: 'Europe/Berlin'},
  {city: 'Bengaluru', tz: 'Asia/Kolkata'},
  {city: 'Sydney', tz: 'Australia/Sydney'}
]

export const refreshFrequency = 1000 // Use ms (every seconds)

// eslint-disable-next-line no-unused-vars
export const command = dispatch => {}

export const render = () => {
  const now = moment()

  const items = list.map(item => {
    const {city, tz} = item

    const [date, time, timezone] = now
      .tz(tz)
      .format('DD.MM HH:mm z')
      .split(' ')

    return {
      city,
      date,
      time,
      timezone
    }
  })

  return items.map(item => (
    <WorldClockContainer key={item.city}>
      <div className={city}>{item.city}</div>
      <div className={timeblock}>
        <div className={time}>{item.time}</div>
        <div className={info}>
          <span className={date}>{item.date}</span>
          <span className={timezone}>{item.timezone}</span>
        </div>
      </div>
    </WorldClockContainer>
  ))
}

// Styling...
export const className = css`
  font: normal normal 100 0.96em/1.15 -apple-system, Helvetica Neue;
  color: #9a9a9a;
  left: 2em;
  top: 6em;
  min-width: 200px;
`

const WorldClockContainer = styled('div')`
  display: flex;
  flex-direction: column;

  margin-bottom: 8px;
`

export const city = css`
  flex-grow: 2;

  font-size: 1em;
`

export const timeblock = css`
  flex-grow: 2;
  flex-direction: row;
  display: inline-flex;
`

export const time = css`
  font-weight: 150;
  font-size: 1.96em;
  flex-grow: 1;

  color: #fff;
`

export const info = css`
  display: inline-flex;
  justify-content: space-around;
  flex-direction: column-reverse;
  flex-grow: 10;

  font-size: 0.6em;
`

export const date = css``

export const timezone = css``
