// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'

export const refreshFrequency = 3600000 // Use ms (every hour)

// NOTE: ⚠ Workaround to hide initial load
export const initialState = {output: false}

export const command = '/opt/homebrew/bin/node --no-warnings ./github/lib/github.js'

export const updateState = (event, prev) => {
  if (event.error) {
    return {...prev, error: event.error.message}
  }

  switch (event.type) {
    case 'UB/COMMAND_RAN':
      try {
        return {
          items: JSON.parse(event.output) || [],
        }
      } catch (error) {
        return {
          items: [],
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
  }
}

// Styling...
export const className = css`
  font:
    normal normal 400 0.96em/1.28 'Mona Sans',
    -apple-system,
    sans-serif;

  @media (prefers-color-scheme: light) {
    color: #101411;
  }
  @media (prefers-color-scheme: dark) {
    color: #f2f5f3;
  }

  transition: all 1s ease;

  left: 0em;
  bottom: 0em;
`

export const Error = styled('div')`
  font:
    normal normal 400 1em 'Monaspace Argon',
    ui-monospace,
    monospace;
  color: #fe4c25;
  margin: 0 0 0.4em 0.8em;
`

export const Loading = styled('div')`
  @media (prefers-color-scheme: light) {
    opacity: 0.64;
  }
  @media (prefers-color-scheme: dark) {
    opacity: 0.32;
  }

  margin: 0 0 0.4em 1em;
`

export const Contributions = styled('div')`
  height: 2vh;
  width: 100vw;

  display: flex;
  gap: 2px;
`

export const day = css`
  font:
    normal normal 400 0.64em 'Monaspace Argon',
    ui-monospace,
    monospace;
  color: #10141196;

  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`
