// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'

export const refreshFrequency = 3600000 // Use ms (every hour)

// NOTE: ⚠ Workaround to hide initial load
export const initialState = {output: false}

export const command = '/opt/homebrew/bin/node ./github/lib/github.js'

export const updateState = (event, prev) => {
  if (event.error) {
    return {...prev, error: event.error.message}
  }

  switch (event.type) {
    case 'UB/COMMAND_RAN':
      try {
        return {
          items: JSON.parse(event.output) || []
        }
      } catch (error) {
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
  if (items) {
    return (
      <Contributions>
        {items.map(({color, count}, idx) => (
          <div className={day} key={idx} style={{backgroundColor: `${color}`}}>
            &nbsp;{count}
          </div>
        ))}
      </Contributions>
    )
  } else {
    return 'loading...'
  }
}

// Styling...
export const className = css`
  font: normal normal 100 0.96em/1.28 -apple-system, Helvetica Neue;
  transition: all 1s ease;

  left: 0em;
  bottom: 0em;
  width: 100vw;
`

export const Error = styled('div')`
  color: #9c1c23;
  margin: 0 0 0 2em;
`

export const Contributions = styled('div')`
  display: flex;
  flex-direction: row;
  height: 2vh;

  div:last-child {
    margin: 0;
  }
`
export const day = css`
  font: normal normal 600 0.64em ui-monospace, monospace;
  color: #1b1f2364;
  opacity: 0.96;

  margin: 0;
  margin-right: 4px;
  padding: 0;
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 2px 4px;
`
