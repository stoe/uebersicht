import assert from 'node:assert/strict'
import {suite, test} from 'node:test'
import {findElements, loadWidget, textContent} from '../helpers/widget.mjs'

const widget = await loadWidget('nowplaying')

const output = (state, app = 'Spotify', track = 'Fixture track', artist = 'Fixture artist', error = '{}') => ({
  output: `\n${state}\n${app}\n${track}\n${artist}\n${error}\n`,
})

suite('nowplaying widget', () => {
  test('hides idle playback and clears stale data when playback pauses or stops', () => {
    assert.equal(widget.render(widget.initialState), '')
    const previous = {playing: true, data: {app: 'Spotify', track: 'Old track', artist: 'Old artist'}}
    for (const state of ['paused', 'stopped']) {
      const next = widget.updateState(output(state), previous)
      assert.deepEqual(next, {playing: false})
      assert.equal(widget.render(next), '')
    }
  })

  test('parses playing tracks and selects only the active player icon', () => {
    for (const app of ['Spotify', 'Music']) {
      const next = widget.updateState(output('playing', app), widget.initialState)
      assert.deepEqual(next, {
        playing: true,
        data: {app, track: 'Fixture track', artist: 'Fixture artist', error: '{}'},
      })
      const tree = widget.render(next)
      const [track, artist] = findElements(tree, 'span')
      assert.ok(textContent(track).endsWith('Fixture track'))
      assert.ok(textContent(artist).endsWith('Fixture artist'))
      assert.deepEqual(
        findElements(tree, 'svg').map(icon => icon.props.display),
        app === 'Spotify' ? ['inline-block', 'none'] : ['none', 'inline-block'],
      )
    }
  })

  test('command errors preserve prior playback without mutating its state', () => {
    const data = Object.freeze({app: 'Music', track: 'Previous track', artist: 'Previous artist', error: '{}'})
    const previous = Object.freeze({playing: true, data})
    const next = widget.updateState({error: 'Fixture command failure'}, previous)

    assert.deepEqual(next, {...previous, warning: 'We got an error: Fixture command failure'})
    assert.notEqual(next, previous)
    assert.equal(next.data, data)
    assert.equal(Object.hasOwn(previous, 'warning'), false)
    assert.ok(textContent(widget.render(next)).includes('Previous track'))
  })

  test('AppleScript errors replace the track display with their message and number', () => {
    const next = widget.updateState(
      output('stopped', 'Music', '', '', "'Fixture permission denied',-1743"),
      widget.initialState,
    )

    assert.deepEqual(next, {
      playing: true,
      data: {
        app: 'Error',
        track: '',
        artist: '',
        error: {message: '"Fixture permission denied"', number: '-1743'},
      },
    })
    const tree = widget.render(next)
    assert.equal(textContent(tree), '"Fixture permission denied" (-1743)')
    assert.equal(findElements(tree, 'svg').length, 0)
    assert.equal(findElements(tree, 'span').length, 0)
  })

  test('truncates long track and artist names but preserves names at the limit', () => {
    for (const [name, expected] of [
      ['x'.repeat(42), 'x'.repeat(42)],
      ['x'.repeat(43), `${'x'.repeat(39)}...`],
    ]) {
      const next = widget.updateState(output('playing', 'Spotify', name, name), widget.initialState)
      const [track, artist] = findElements(widget.render(next), 'span')
      assert.equal(track.children.at(-1), expected)
      assert.equal(artist.children.at(-1), expected)
    }
  })

  test('renders tracks without an artist and hides icons for an unrecognized app', () => {
    const next = widget.updateState(output('playing', 'Other player', 'Fixture track', ''), widget.initialState)
    const tree = widget.render(next)
    const [track, artist] = findElements(tree, 'span')
    assert.equal(track.children.at(-1), 'Fixture track')
    assert.equal(artist.children.at(-1), '')
    assert.deepEqual(
      findElements(tree, 'svg').map(icon => icon.props.display),
      ['none', 'none'],
    )
  })
})
