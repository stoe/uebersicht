import fs from 'fs'
import path from 'path'
import {graphql} from '@octokit/graphql'
import {getContributionRange} from './dates.js'
import {getContributionColors} from './colors.js'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONFIG_PATH = path.join(__dirname, '../config.json')
const buf = fs.readFileSync(CONFIG_PATH)
const {token, colorScheme = 'default'} = JSON.parse(buf.toString())

const query = `query($from: DateTime!, $to: DateTime!) {
  viewer {
    contributionsCollection(from: $from to: $to) {
      contributionCalendar {
        isHalloween
        weeks {
          contributionDays {
            color
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`

// run
;(async () => {
  try {
    const {from, to} = getContributionRange(new Date())

    const {
      viewer: {
        contributionsCollection: {contributionCalendar},
      },
    } = await graphql(query, {
      from,
      to,
      headers: {
        authorization: `token ${token}`,
      },
    })

    console.log(JSON.stringify(getContributionColors(contributionCalendar, colorScheme)))
  } catch (error) {
    console.error(error.message)
  }
})()
