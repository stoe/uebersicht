// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'
import {formatTime} from './lib/time.js'

const list = [
  {location: '🇺🇸 San Francisco', z: 'US/Pacific'},
  {location: '🇺🇸 Salt Lake City', z: 'US/Mountain'},
  {location: '🇺🇸 Austin', z: 'US/Central'},
  {location: '🇺🇸 New York', z: 'US/Eastern'},
  {location: '🇬🇧 London', z: 'Europe/London'},
  {location: '🇩🇪 Ichenhausen', z: 'Europe/Berlin'},
  {location: '🇮🇳 Bengaluru', z: 'Asia/Kolkata'},
  {location: '🇦🇺 Sydney', z: 'Australia/Sydney'},
]

export const refreshFrequency = 1000 // Use ms (every seconds)

// eslint-disable-next-line no-unused-vars
export const command = dispatch => {}

export const render = () => {
  const now = new globalThis.Date()

  const items = list.map(item => ({
    ...item,
    ...formatTime(now, item.z),
  }))

  return items.map(item => (
    <WorldClockContainer key={item.location}>
      <City>{item.location}</City>
      <TimeBlock>
        <Time>{item.time}</Time>
        <Info>
          <Date>{item.date}</Date>
          <Timezone>{item.tz}</Timezone>
        </Info>
      </TimeBlock>
    </WorldClockContainer>
  ))
}

// Styling...
export const className = css`
  font:
    normal normal 400 1.96em/1.28 'Mona Sans',
    -apple-system,
    sans-serif;
  transition: all 1s ease;

  @media (prefers-color-scheme: light) {
    color: #101411;
  }

  @media (prefers-color-scheme: dark) {
    color: #f2f5f3;
  }

  left: 1em;
  top: 4em;
  min-width: 200px;
`

const WorldClockContainer = styled('div')`
  margin-bottom: 8px;

  display: flex;
  flex-direction: column;
`

const City = styled('div')`
  font-size: 0.4em;

  @media (prefers-color-scheme: light) {
    opacity: 0.64;
  }

  @media (prefers-color-scheme: dark) {
    opacity: 0.32;
  }

  flex-grow: 2;
`

const TimeBlock = styled('div')`
  display: inline-flex;
  flex-grow: 2;
  flex-direction: row;
`

const Time = styled('div')`
  font-size: 0.64em;
  font-weight: 400;

  flex-grow: 1;
`

const Info = styled('div')`
  font-size: 0.32em;

  @media (prefers-color-scheme: light) {
    opacity: 0.64;
  }

  @media (prefers-color-scheme: dark) {
    opacity: 0.32;
  }

  display: inline-flex;
  justify-content: space-around;
  flex-direction: column;
  flex-grow: 10;
`

const Date = styled('span')`
  font-weight: 100;
`

const Timezone = styled('span')`
  font-weight: 100;
`
