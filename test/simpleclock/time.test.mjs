import assert from 'node:assert/strict'
import {suite, test} from 'node:test'
import {formatTime as formatLocalTime} from '../../packages/simpleclock/lib/time.js'

suite('simple clock', () => {
  test('local clock preserves padded dates and 24-hour time at midnight and on leap day', () => {
    assert.deepEqual(formatLocalTime(new Date(2026, 0, 1, 0, 5)), {
      date: '01.01.2026',
      time: '00:05',
    })
    assert.deepEqual(formatLocalTime(new Date(2024, 1, 29, 23, 59)), {
      date: '29.02.2024',
      time: '23:59',
    })
  })
})
