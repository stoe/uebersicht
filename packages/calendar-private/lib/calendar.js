'use strict'

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const {google} = require('googleapis')
const moment = require('moment')

const truncate = input => (input.length > 50 ? `${input.substring(0, 47)}...` : input)

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

// The file token.json stores the user's access and refresh tokens,
// and is created automatically when the authorization flow completes for the first time.
const TOKEN_PATH = path.join(process.env.PWD, 'calendar-private/token.json')

const CREDENTIALS_PATH = path.join(process.env.PWD, 'calendar-private/credentials.json')

// Load client secrets from a local file.
fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  // Authorize a client with credentials, then call the Google Calendar API.

  authorize(JSON.parse(content), listEvents)
})

// Create an OAuth2 client with the given credentials, and then execute the
// given callback function.
// @param {Object} credentials The authorization client credentials.
// @param {function} callback The callback to call with the authorized client.
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

// Get and store new token after prompting for user authorization, and then
// execute the given callback with the authorized OAuth2 client.
// @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
// @param {getEventsCallback} callback The callback for the authorized client.
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', code => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), error => {
        if (error) console.error(error)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

// Lists the next 10 events on the user's primary calendar.
// @param {google.auth.OAuth2} auth An authorized OAuth2 client.
function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth})
  calendar.events.list(
    {
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 2,
      singleEvents: true,
      orderBy: 'startTime',
      showDeleted: false,
      showHiddenInvitations: false
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`)
      const events = res.data.items
      if (events.length) {
        const data = []
        events.map(event => {
          const start = event.start.dateTime || event.start.date
          const {htmlLink: href, status} = event

          if (event.summary) {
            const [date, time] = moment(start)
              .format('MM/DD kk:mm')
              .split(' ')

            data.push({
              date,
              time,
              event: truncate(event.summary),
              href,
              status
            })
          }
        })

        console.log(JSON.stringify(data))
      } else {
        console.log('No upcoming events found.')
      }
    }
  )
}
