import fs from 'fs'
import path from 'path'
import {graphql} from '@octokit/graphql'
import {getContributionRange} from './dates.js'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CREDENTIALS_PATH = path.join(__dirname, '../credentials.json')
const buf = fs.readFileSync(CREDENTIALS_PATH)
const {token} = JSON.parse(buf.toString())

const query = `query($from: DateTime!, $to: DateTime!) {
  viewer {
    contributionsCollection(from: $from to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            color
            date
            contributionCount
          }
        }
      }
    }
  }
}`

// run
;(async () => {
  try {
    const colors = []

    const {from, to} = getContributionRange(new Date())

    const {
      viewer: {
        contributionsCollection: {
          contributionCalendar: {weeks},
        },
      },
    } = await graphql(query, {
      from,
      to,
      headers: {
        authorization: `token ${token}`,
      },
    })

    weeks.map(week => {
      return week.contributionDays.map(({color, contributionCount}) => {
        const count = contributionCount || ''

        if (color === '#ebedf0') {
          colors.push({color: 'transparent', count})
        } else if (color === '#03001c') {
          colors.push({color: '#c46212', count})
        } else {
          colors.push({color, count})
        }
      })
    })

    console.log(JSON.stringify(colors))
  } catch (error) {
    console.error(error.message)
  }
})()
