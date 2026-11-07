import assert from 'node:assert/strict'
import {suite, test} from 'node:test'
import {formatTime as formatZonedTime} from '../../packages/worldclock/lib/time.js'

suite('worldclock', () => {
  test('worldclock uses named standard and daylight abbreviations for all configured zones', () => {
    const cases = [
      ['US/Pacific', '04:00', 'PT', '05:00', 'PDT'],
      ['US/Mountain', '05:00', 'MT', '06:00', 'MDT'],
      ['US/Central', '06:00', 'CT', '07:00', 'CDT'],
      ['US/Eastern', '07:00', 'ET', '08:00', 'EDT'],
      ['Europe/London', '12:00', 'GMT', '13:00', 'BST'],
      ['Europe/Berlin', '13:00', 'CET', '14:00', 'CEST'],
      ['Asia/Kolkata', '17:30', 'IST', '17:30', 'IST'],
      ['Australia/Sydney', '23:00', 'AEDT', '22:00', 'AEST'],
    ]

    for (const [zone, winterTime, winterTz, summerTime, summerTz] of cases) {
      assert.deepEqual(formatZonedTime(new Date('2026-01-15T12:00:00Z'), zone), {
        date: '15 Jan',
        time: winterTime,
        tz: winterTz,
      })
      assert.deepEqual(formatZonedTime(new Date('2026-07-15T12:00:00Z'), zone), {
        date: '15 Jul',
        time: summerTime,
        tz: summerTz,
      })
    }
  })

  test('worldclock preserves local date rollover, midnight, and September month text', () => {
    assert.deepEqual(formatZonedTime(new Date('2026-01-01T00:05:00Z'), 'US/Pacific'), {
      date: '31 Dec',
      time: '16:05',
      tz: 'PT',
    })
    assert.deepEqual(formatZonedTime(new Date('2026-09-01T22:05:00Z'), 'Europe/Berlin'), {
      date: '02 Sep',
      time: '00:05',
      tz: 'CEST',
    })
  })

  test('worldclock follows daylight-saving transitions', () => {
    assert.deepEqual(formatZonedTime(new Date('2026-03-08T09:59:00Z'), 'US/Pacific'), {
      date: '08 Mar',
      time: '01:59',
      tz: 'PT',
    })
    assert.deepEqual(formatZonedTime(new Date('2026-03-08T10:00:00Z'), 'US/Pacific'), {
      date: '08 Mar',
      time: '03:00',
      tz: 'PDT',
    })
  })

  test('European and Australian abbreviations switch at the daylight-saving boundaries', () => {
    for (const [zone, instant, time, tz] of [
      ['Europe/London', '2026-03-29T00:59:00Z', '00:59', 'GMT'],
      ['Europe/London', '2026-03-29T01:00:00Z', '02:00', 'BST'],
      ['Europe/Berlin', '2026-10-25T00:59:00Z', '02:59', 'CEST'],
      ['Europe/Berlin', '2026-10-25T01:00:00Z', '02:00', 'CET'],
      ['Australia/Sydney', '2026-04-04T15:59:00Z', '02:59', 'AEDT'],
      ['Australia/Sydney', '2026-04-04T16:00:00Z', '02:00', 'AEST'],
      ['Australia/Sydney', '2026-10-03T15:59:00Z', '01:59', 'AEST'],
      ['Australia/Sydney', '2026-10-03T16:00:00Z', '03:00', 'AEDT'],
    ]) {
      const output = formatZonedTime(new Date(instant), zone)
      assert.equal(output.time, time, `${zone}: ${instant}`)
      assert.equal(output.tz, tz, `${zone}: ${instant}`)
    }
  })

  test('additional zones display their configured identifier instead of a numeric GMT offset', () => {
    assert.deepEqual(formatZonedTime(new Date('2026-01-15T12:00:00Z'), 'Europe/Paris'), {
      date: '15 Jan',
      time: '13:00',
      tz: 'Europe/Paris',
    })
  })
})
