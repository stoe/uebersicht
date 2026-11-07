import assert from 'node:assert/strict'
import {suite, test} from 'node:test'
import {loadWidget, textContent} from '../helpers/widget.mjs'

const widget = await loadWidget('worldclock')

suite('worldclock widget', () => {
  test('renders all eight configured locations with their local times, dates, and named zones', context => {
    context.mock.timers.enable({apis: ['Date'], now: new Date('2026-01-15T12:34:00Z').getTime()})
    const rows = widget.render()

    assert.equal(rows.length, 8)
    const values = rows.map(row => {
      const [city, block] = row.children
      assert.ok(textContent(city).trim())
      const [time, info] = block.children
      const [date, zone] = info.children
      return [textContent(time), textContent(date), textContent(zone)]
    })
    assert.deepEqual(values, [
      ['04:34', '15 Jan', 'PT'],
      ['05:34', '15 Jan', 'MT'],
      ['06:34', '15 Jan', 'CT'],
      ['07:34', '15 Jan', 'ET'],
      ['12:34', '15 Jan', 'GMT'],
      ['13:34', '15 Jan', 'CET'],
      ['18:04', '15 Jan', 'IST'],
      ['23:34', '15 Jan', 'AEDT'],
    ])
  })
})
