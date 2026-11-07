import assert from 'node:assert/strict'
import {spawnSync} from 'node:child_process'
import {copyFile, mkdir, mkdtemp, rm, writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import path from 'node:path'
import {suite, test} from 'node:test'
import {pathToFileURL} from 'node:url'
import {getContributionColors} from '../../packages/github/lib/colors.js'

const levels = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE']

const paletteCases = [
  ['gray', ['#e4ebe6', '#c4ccc6', '#96a199', '#58635b'], ['#c4ccc6', '#7c8980', '#353d37', '#191f1b']],
  ['blue', ['#bcecff', '#5fb9ff', '#0377ff', '#0040a7'], ['#a2daff', '#3094ff', '#0a50db', '#082a8f']],
  ['yellow', ['#ffe777', '#fabf21', '#be7d00', '#824800'], ['#f7d162', '#db9d00', '#a06100', '#653200']],
  ['red', ['#ffcecb', '#ff8182', '#cf2230', '#860620'], ['#feb2ae', '#fc5c5d', '#d31231', '#860620']],
  ['purple', ['#dbbffd', '#b870ff', '#8534f3', '#43179e'], ['#d3b3fe', '#a665f9', '#6619e1', '#26115f']],
  ['pink', ['#ffc9f2', '#ff80d2', '#ef2aa4', '#952866'], ['#fcabe7', '#ed55ba', '#ca2186', '#741550']],
  ['coral', ['#ffcab8', '#ff7b56', '#e13f1b', '#a22710'], ['#fdb7a1', '#f66945', '#c53211', '#801e0f']],
  ['lemon', ['#f5e36b', '#e1c50f', '#a98906', '#614d01'], ['#f9e76a', '#e4c411', '#a98906', '#654d02']],
  ['lime', ['#e8fc97', '#d1f441', '#92c219', '#425e13'], ['#dcff96', '#b1e119', '#608a10', '#22360b']],
  ['teal', ['#a4efe8', '#39dad2', '#197b7b', '#024b4d'], ['#99f1e8', '#26ede2', '#0bbab6', '#047172']],
  ['indigo', ['#d4dbff', '#8e9df7', '#4956e5', '#262dae'], ['#b3c1fd', '#6a7df0', '#2d3dd7', '#212183']],
]

const calendar = (colors, isHalloween = false) => ({
  isHalloween,
  weeks: [
    {
      contributionDays: colors.slice(0, 2).map((color, i) => ({
        color,
        contributionCount: i === 0 ? 0 : 1,
        contributionLevel: levels[i],
      })),
    },
    {
      contributionDays: colors.slice(2).map((color, i) => ({
        color,
        contributionCount: 1,
        contributionLevel: levels[i + 2],
      })),
    },
  ],
})

suite('GitHub contribution colors', () => {
  test('default and omitted color schemes preserve contribution colors and ordering', () => {
    const input = calendar(['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'])
    const expected = [
      {color: 'transparent', count: ''},
      {color: '#9be9a8', count: 1},
      {color: '#40c463', count: 1},
      {color: '#30a14e', count: 1},
      {color: '#216e39', count: 1, textColor: '#f2f5f3'},
    ]
    assert.deepEqual(getContributionColors(input), expected)
    assert.deepEqual(getContributionColors(input, 'default'), expected)
  })

  test('custom schemes map relative levels to Primer Brand light and dark palettes', () => {
    const input = calendar(['#161b22', '#03001c', '#03001c', '#03001c', '#03001c'])
    for (const [name, light, dark] of paletteCases) {
      const output = getContributionColors(input, name)
      assert.deepEqual(
        output.map(({color, darkColor, count}) => [color, darkColor, count]),
        [['transparent', 'transparent', ''], ...light.map((color, i) => [color, dark[i], 1])],
        name,
      )
      assert.equal(output[0].textColor, undefined)
      assert.equal(output[0].darkTextColor, undefined)
    }
  })

  test('active custom-theme cells retain readable text in both modes', () => {
    const luminance = hex => {
      const channels = hex
        .slice(1)
        .match(/.{2}/g)
        .map(value => parseInt(value, 16) / 255)
        .map(value => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
    }
    const input = calendar(['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'])
    for (const [name] of paletteCases) {
      for (const item of getContributionColors(input, name).slice(1)) {
        for (const [background, foreground] of [
          [item.color, item.textColor],
          [item.darkColor, item.darkTextColor],
        ]) {
          const values = [luminance(background), luminance(foreground)]
          const ratio = (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05)
          assert.ok(ratio >= 4.5, `${name}: ${background} / ${foreground}`)
        }
      }
    }
  })

  test('Halloween overrides every custom scheme and preserves the existing orange adjustment', () => {
    const input = calendar(['#ebedf0', '#ffee4a', '#ffc501', '#fe9600', '#03001c'], true)
    const expected = [
      {color: 'transparent', count: ''},
      {color: '#ffee4a', count: 1},
      {color: '#ffc501', count: 1},
      {color: '#fe9600', count: 1},
      {color: '#c46212', count: 1, textColor: '#101411'},
    ]
    for (const scheme of ['default', ...paletteCases.map(([name]) => name)]) {
      assert.deepEqual(getContributionColors(input, scheme), expected)
    }
  })

  test('excluded and unrecognized scheme names fall back to GitHub defaults', () => {
    const input = calendar(['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'])
    for (const name of ['green', 'orange', 'black', 'white', 'unknown', 'constructor', '__proto__']) {
      assert.deepEqual(getContributionColors(input, name), getContributionColors(input), name)
    }
  })

  test('fourth-quartile foreground adapts to bright contribution colors', () => {
    const output = getContributionColors(calendar(['#ebedf0', '#0e4429', '#006d32', '#26a641', '#39d353']))
    assert.deepEqual(output.at(-1), {color: '#39d353', count: 1, textColor: '#101411'})
  })

  test('the GitHub command reads config.json and requests Halloween and intensity fields', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'uebersicht-github-config-'))
    try {
      await mkdir(path.join(dir, 'lib'))
      for (const file of ['github.js', 'dates.js', 'colors.js']) {
        await copyFile(new URL(`../../packages/github/lib/${file}`, import.meta.url), path.join(dir, 'lib', file))
      }
      await writeFile(path.join(dir, 'package.json'), '{"type":"module"}')
      await writeFile(path.join(dir, 'config.json'), JSON.stringify({token: 'fixture-token', colorScheme: 'purple'}))

      const mock = `
      import assert from 'node:assert/strict'
      export const graphql = async (query, {headers}) => {
        assert.match(query, /isHalloween/)
        assert.match(query, /contributionLevel/)
        assert.equal(headers.authorization, 'token fixture-token')
        return {viewer: {contributionsCollection: {contributionCalendar: {
          isHalloween: false,
          weeks: [{contributionDays: [{color: '#9be9a8', contributionCount: 3, contributionLevel: 'FIRST_QUARTILE'}]}],
        }}}}
      }
    `
      const code = `
      import {registerHooks} from 'node:module'
      registerHooks({
        resolve(specifier, context, nextResolve) {
          return specifier === '@octokit/graphql'
            ? {url: ${JSON.stringify(`data:text/javascript,${encodeURIComponent(mock)}`)}, shortCircuit: true}
            : nextResolve(specifier, context)
        },
      })
      await import(process.argv[1])
    `
      const result = spawnSync(
        process.execPath,
        ['--input-type=module', '-e', code, pathToFileURL(path.join(dir, 'lib', 'github.js')).href],
        {encoding: 'utf8'},
      )
      assert.equal(result.status, 0, result.stderr)
      assert.equal(result.stderr, '')
      assert.deepEqual(JSON.parse(result.stdout), [
        {color: '#dbbffd', count: 3, darkColor: '#d3b3fe', textColor: '#101411', darkTextColor: '#101411'},
      ])
    } finally {
      await rm(dir, {recursive: true, force: true})
    }
  })
})
