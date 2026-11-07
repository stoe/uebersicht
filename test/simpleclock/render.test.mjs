import assert from 'node:assert/strict'
import {suite, test} from 'node:test'
import {findElements, loadWidget, textContent} from '../helpers/widget.mjs'

const widget = await loadWidget('simpleclock')

suite('simple clock widget', () => {
  test('renders the native local time and date at the current instant', context => {
    context.mock.timers.enable({apis: ['Date'], now: new Date(2026, 0, 2, 3, 4).getTime()})
    const tree = widget.render()

    assert.deepEqual(findElements(tree, 'span').map(textContent), ['03:04', '02.01.2026'])
  })
})
