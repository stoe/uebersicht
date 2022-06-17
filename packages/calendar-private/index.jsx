// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'

export const refreshFrequency = 300000 // Use ms (every 5 Minutes)

// NOTE: ⚠ Workaround to hide initial load
export const initialState = {output: false}

export const command = '/opt/homebrew/bin/node ./calendar-private/lib/calendar.js'

export const updateState = (event, prev) => {
  if (event.error) {
    return {...prev, error: `We got an error: ${event.error}`}
  }

  switch (event.type) {
    case 'UB/COMMAND_RAN':
      try {
        return {
          items: JSON.parse(event.output) || []
        }
      } catch (error) {
        // console.error(error);
        return {
          items: []
        }
      }
    default:
      return prev
  }
}

export const render = ({items, error}) => {
  if (error) {
    return <Error>Something went wrong</Error>
  }

  // NOTE: ⚠ Workaround to hide initial load
  if (!items) {
    return <Loading>loading...</Loading>
  }

  return (
    <Calendar>
      {items.map(({date, time, event}, idx) => (
        <CalendarItem key={idx}>
          <CalendarDate className={time === '24:00' ? allday : ''}>{date}</CalendarDate>
          <CalendarTime className={time === '24:00' ? allday : ''}>{time === '24:00' ? 'all day' : time}</CalendarTime>
          <CalendarEvent className={time === '24:00' ? allday : ''}>{event}</CalendarEvent>
        </CalendarItem>
      ))}
    </Calendar>
  )
}

// Styling...
export const className = css`
  font: normal normal 100 0.96em/1.28 -apple-system, Helvetica Neue;
  transition: all 1s ease;

  font-weight: 100;
  left: 0.8em;
  bottom: 2.5em;

  @media (prefers-color-scheme: light) {
    color: #2f363d;
  }
  @media (prefers-color-scheme: dark) {
    color: #ebebeb;
  }
`

export const Error = styled('div')`
  color: #9c1c23;
  margin: 0;
`

export const Loading = styled('div')`
  opacity: 0.32;
`

const Calendar = styled('ul')`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const CalendarItem = styled('li')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  line-height: 1.28em;
`

const CalendarDate = styled('span')`
  min-width: 3em;
`

const CalendarTime = styled('span')`
  margin: 0 1em;
  min-width: 3em;
`

const CalendarEvent = styled('span')`
  flex-grow: 10;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const allday = css`
  opacity: 0.32;
`
