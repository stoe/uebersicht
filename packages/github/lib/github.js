'use strict'

const fs = require('fs')
const path = require('path')
const {graphql} = require('@octokit/graphql')
const dayjs = require('dayjs')

const CREDENTIALS_PATH = path.join(process.env.PWD, 'github/credentials.json')
const buf = fs.readFileSync(CREDENTIALS_PATH)
const {token} = JSON.parse(Buffer.from(buf).toString())

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

    const now = dayjs()
    const from = now.subtract(89, 'days').format(`YYYY-MM-DDT00:00:00`)
    const to = now.format(`YYYY-MM-DDT23:59:59`)

    const {
      viewer: {
        contributionsCollection: {
          contributionCalendar: {weeks}
        }
      }
    } = await graphql(query, {
      from,
      to,
      headers: {
        authorization: `token ${token}`
      }
    })

    weeks.map(week => {
      return week.contributionDays.map(({color, contributionCount}) => {
        const count = contributionCount || ''

        if (color === '#ebedf0') {
          colors.push({color: 'transparent', count})
        } else if (color === '#03001c') {
          colors.push({color: '#fddf68', count})
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
