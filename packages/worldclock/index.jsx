// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'
import moment from 'moment-timezone'

const list = [
  {city: '🇺🇸 San Francisco', tz: 'US/Pacific'},
  {city: '🇺🇸 Salt Lake City', tz: 'US/Mountain'},
  {city: '🇺🇸 Austin', tz: 'US/Central'},
  {city: '🇺🇸 New York', tz: 'US/Eastern'},
  {city: '🇬🇧 London', tz: 'Europe/London'},
  {city: '🇩🇪 Ichenhausen', tz: 'Europe/Berlin'},
  {city: '🇮🇳 Bengaluru', tz: 'Asia/Kolkata'},
  {city: '🇦🇺 Sydney', tz: 'Australia/Sydney'}
]

export const refreshFrequency = 1000 // Use ms (every seconds)

// eslint-disable-next-line no-unused-vars
export const command = dispatch => {}

export const render = () => {
  const now = moment()

  const items = list.map(item => {
    const {city, tz} = item

    const [date, time, timezone] = now.tz(tz).format('DD.MM HH:mm z').split(' ')

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
  font: normal normal 100 1.4em/1.28 -apple-system, Helvetica Neue;
  transition: all 1s ease;

  @media (prefers-color-scheme: light) {
    color: #2f363d;
  }
  @media (prefers-color-scheme: dark) {
    color: #ebebeb;
  }

  left: 0.96em;
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
  font-size: 0.64em;
  opacity: 0.32;
`

export const timeblock = css`
  flex-grow: 2;
  flex-direction: row;
  display: inline-flex;
`

export const time = css`
  font-weight: 150;
  flex-grow: 1;
`

export const info = css`
  display: inline-flex;
  justify-content: space-around;
  flex-direction: column-reverse;
  flex-grow: 10;
  font-size: 0.48em;
  opacity: 0.32;
`

export const date = css``

export const timezone = css``
