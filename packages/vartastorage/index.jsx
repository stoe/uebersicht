// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'

export const refreshFrequency = 900000 // Use ms (every 15 minutes)

// NOTE: ⚠ Workaround to hide initial load
export const initialState = {output: false}

export const command = '/opt/homebrew/bin/node ./vartastorage/lib/varta.js'

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
    return <Error>{error}</Error>
  }

  // NOTE: ⚠ Workaround to hide initial load
  if (!items) {
    return <Loading>loading...</Loading>
  }

  if (items) {
    return (
      <Varta>
        {items.map(({name, value, unit}, idx) => (
          <div className={element} key={idx}>
            <p className={vName}>{name}</p> <span className={vValue}>{value}</span>
            <span className={vUnit}>{unit}</span>
          </div>
        ))}
      </Varta>
    )
  }
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

  left: 0.8em;
  bottom: 4.2em;
  width: 100vw;
`

export const Error = styled('div')`
  color: #9c1c23;
  margin: 0 0 0 0.8em;
`

export const Loading = styled('div')`
  opacity: 0.32;
  margin: 0 0 0.4em 0.8em;
`

export const Varta = styled('div')`
  display: flex;
  flex-direction: row;
  height: 2vh;
`

export const element = css`
  font-size: 0.8em;
  margin: 0 1em 0 0;
`

export const vName = css`
  font-size: 0.64em;
  opacity: 0.64;
`
export const vValue = css``
export const vUnit = css`
  font-size: 0.64em;
  opacity: 0.32;
`
