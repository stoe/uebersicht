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
    // console.log(items)

    const {Betriebsstatus: chargeStatus, Erzeugungsleistung, Energieverbrauch, Ladezustand: charge, Netz} = items

    const batteryEmpty = charge < 25 ? 'inline' : 'none'
    const batteryQuarter = charge >= 25 && charge < 50 ? 'inline' : 'none'
    const batteryHalf = charge >= 50 && charge < 75 ? 'inline' : 'none'
    const batteryThreeQuarter = charge >= 75 && charge < 100 ? 'inline' : 'none'
    const batteryFull = charge === 100 ? 'inline' : 'none'

    return (
      <Varta>
        {/* Erzeugung */}
        <div className={element}>
          <SolarPanel xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={chargeStatus}>
            <path d="M96 0C80.7 0 67.6 10.8 64.6 25.7l-64 320c-1.9 9.4 .6 19.1 6.6 26.6S22.4 384 32 384H288v64H224c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V384H608c9.6 0 18.7-4.3 24.7-11.7s8.5-17.2 6.6-26.6l-64-320C572.4 10.8 559.3 0 544 0H96zm5.4 168L122.2 64h90.4L202.3 168H101.4zm-9.6 48H197.5L187.1 320H71L91.8 216zm153.9 0H394.3l10.4 104H235.3l10.4-104zm196.8 0H548.2L569 320h-116L442.5 216zm96-48H437.7L427.3 64h90.4l20.8 104zm-149.1 0h-139L260.9 64H379.1l10.4 104z" />
          </SolarPanel>
          <span className="value">{Erzeugungsleistung.value}</span>
          <span className="unit">{Erzeugungsleistung.unit}</span>
        </div>
        {/* Ladezustand */}
        <div className={element}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" display={batteryEmpty}>
            <path d="M80 96C35.8 96 0 131.8 0 176V336c0 44.2 35.8 80 80 80H464c44.2 0 80-35.8 80-80V320c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32V176c0-44.2-35.8-80-80-80H80zM64 176c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16V336c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V176z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" display={batteryQuarter}>
            <path d="M0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176zm80-16c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zm112 32V320H96V192h96z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" display={batteryHalf}>
            <path d="M0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176zm80-16c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zm208 32V320H96V192H288z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" display={batteryThreeQuarter}>
            <path d="M0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176zm80-16c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zm272 32V320H96V192H352z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" display={batteryFull}>
            <path d="M0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176zm80-16c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zm368 32V320H96V192H448z" />
          </svg>
          <span className="value">{charge}</span>
          <span className="unit">%</span>
        </div>
        {/* Energieverbrauch */}
        <div className={element}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z" />
          </svg>
          <span className="value">{Energieverbrauch.value}</span>
          <span className="unit">{Energieverbrauch.unit}</span>
        </div>
        {/* Netz */}
        <div className={element}>
          <Grid xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={Netz.direction}>
            <path d="M96 0C78.3 0 64 14.3 64 32v96h64V32c0-17.7-14.3-32-32-32zM288 0c-17.7 0-32 14.3-32 32v96h64V32c0-17.7-14.3-32-32-32zM32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32v32c0 77.4 55 142 128 156.8V480c0 17.7 14.3 32 32 32s32-14.3 32-32V412.8C297 398 352 333.4 352 256V224c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z" />
          </Grid>
          <span className="value">{Netz.value}</span>
          <span className="unit">{Netz.unit}</span>
        </div>
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

    span.unit {
      opacity: 0.64;
    }
  }
  @media (prefers-color-scheme: dark) {
    color: #ebebeb;

    span.unit {
      opacity: 0.32;
    }
  }

  left: 0.8em;
  bottom: 2em;
  width: 100vw;

  svg {
    @media (prefers-color-scheme: light) {
      color: #2f363d64;
    }
    @media (prefers-color-scheme: dark) {
      color: #ebebeb32;
    }

    fill: currentColor;
    height: 0.75em;

    margin-right: 0.2em;
  }

  span {
    &.unit {
      font-size: 0.64em;
    }
  }
`

export const Error = styled('div')`
  font-size: 0.64em;
  color: #9c1c23;
`

export const Loading = styled('div')`
  font-size: 0.64em;
  opacity: 0.32;
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

export const SolarPanel = styled('svg')`
  &.entladen {
    color: rgb(207, 34, 46);
  }

  &.laden {
    color: rgb(26, 127, 55);
  }
`

export const Grid = styled('svg')`
  &.from {
    color: rgb(207, 34, 46);
  }

  &.to {
    color: rgb(26, 127, 55);
  }
`
