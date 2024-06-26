// eslint-disable-next-line import/no-unresolved
import React, {css, styled} from 'uebersicht'

export const render = () => {
  return (
    <Me>
      <h3>Stefan Stölzle</h3>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
        Senior Manager, Services Delivery
      </p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
          <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"></path>
        </svg>
        stefan@github.com
      </p>
    </Me>
  )
}

// Styling...
export const className = css`
  font:
    normal normal 400 0.96em/1.28 -apple-system,
    Helvetica Neue;
  transition: all 1s ease;

  @media (prefers-color-scheme: light) {
    color: #2f363d;
  }

  @media (prefers-color-scheme: dark) {
    color: #ebebeb;
  }

  right: 0.8em;
  bottom: 2.9em;
`

export const Me = styled('div')`
  h3 {
    margin: 0;
    padding: 0;
  }

  p {
    font-size: 0.8em;
    font-weight: 100;

    display: flex;
    flex-direction: row;
    align-items: center;

    margin: 0.2em 0 0 0;
    padding: 0;

    svg {
      @media (prefers-color-scheme: light) {
        color: #2f363d;
      }
      @media (prefers-color-scheme: dark) {
        color: #ebebeb;
      }

      fill: currentColor;
      height: 1em;

      margin-right: 0.4em;
      margin-top: 0.1em;

      opacity: 0.32;
    }
  }
`
