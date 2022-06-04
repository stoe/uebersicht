// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'

export const refreshFrequency = 300000 // Use ms (every 5 Minutes)

// NOTE: ⚠ Workaround to hide initial load
export const initialState = {output: false}

export const command = '/opt/homebrew/bin/node ./calendar/lib/calendar.js'

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
    return (
      <Error>
        Something went wrong: <strong>{String(error)}</strong>
      </Error>
    )
  }

  // NOTE: ⚠ Workaround to hide initial load
  if (items) {
    return (
      <Calendar>
        {items.map(({date, time, event}, idx) => (
          <CalendarItem key={idx}>
            <CalendarDate>{date}</CalendarDate>
            <CalendarTime>{time === '24:00' ? 'all day' : time}</CalendarTime>
            {time === '24:00' ? (
              <CalendarAllDayEvent>{event}</CalendarAllDayEvent>
            ) : (
              <CalendarEvent>{event}</CalendarEvent>
            )}
          </CalendarItem>
        ))}
      </Calendar>
    )
  } else {
    return 'loading...'
  }
}

// Styling...
export const className = css`
  font: normal normal 100 0.96em/1.28 -apple-system, Helvetica Neue;

  font-weight: 100;
  left: 0.8em;
  bottom: 5.75em;
  padding-bottom: 0.96em;

  @media (prefers-color-scheme: light) {
    color: #0066ff;
    text-shadow: 1px 2px 2px #00000094;
  }
  @media (prefers-color-scheme: dark) {
    color: #ebebeb;
    text-shadow: 1px 2px 2px #1b1f2394;
  }

  border-bottom: 1px solid #9a9a9a48;
`

export const Error = styled('div')`
  font: normal normal 100 0.96em/1.28 -apple-system, Helvetica Neue;
  color: #9c1c23;
  margin: 0;
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

const CalendarAllDayEvent = styled('span')`
  flex-grow: 10;

  @media (prefers-color-scheme: light) {
    color: #0066ff64;
  }
  @media (prefers-color-scheme: dark) {
    color: #ebebeb64;
  }
`
