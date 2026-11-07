import assert from 'node:assert/strict'
import {spawnSync} from 'node:child_process'
import {suite, test} from 'node:test'
import {getContributionRange} from '../../packages/github/lib/dates.js'

suite('GitHub contribution ranges', () => {
  test('contribution ranges span 90 local calendar dates across leap years and year boundaries', () => {
    for (const [now, from, to] of [
      [new Date(2024, 1, 29, 23, 59), '2023-12-02', '2024-02-29'],
      [new Date(2026, 0, 1, 0, 5), '2025-10-04', '2026-01-01'],
    ]) {
      const original = now.getTime()
      assert.deepEqual(getContributionRange(now), {
        from: `${from}T00:00:00`,
        to: `${to}T23:59:59`,
      })
      assert.equal(now.getTime(), original)
    }
  })

  test('contribution ranges preserve local dates across DST and UTC date rollover', () => {
    const moduleUrl = new URL('../../packages/github/lib/dates.js', import.meta.url).href
    const code = `
    const {getContributionRange} = await import(process.argv[1])
    console.log(JSON.stringify([
      getContributionRange(new Date(2024, 2, 11, 0, 30)),
      getContributionRange(new Date(2024, 10, 4, 0, 30)),
      getContributionRange(new Date('2026-01-01T23:30:00Z')),
    ]))
  `

    for (const [TZ, from, to] of [
      ['America/Los_Angeles', '2025-10-04', '2026-01-01'],
      ['Pacific/Auckland', '2025-10-05', '2026-01-02'],
    ]) {
      const result = spawnSync(process.execPath, ['--input-type=module', '-e', code, moduleUrl], {
        env: {...process.env, TZ},
        encoding: 'utf8',
      })
      assert.equal(result.status, 0, result.stderr)
      assert.deepEqual(JSON.parse(result.stdout), [
        {from: '2023-12-13T00:00:00', to: '2024-03-11T23:59:59'},
        {from: '2024-08-07T00:00:00', to: '2024-11-04T23:59:59'},
        {from: `${from}T00:00:00`, to: `${to}T23:59:59`},
      ])
    }
  })
})
