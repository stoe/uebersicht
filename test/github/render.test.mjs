import assert from 'node:assert/strict'
import {suite, test} from 'node:test'
import {findElements, loadWidget, textContent} from '../helpers/widget.mjs'

const widget = await loadWidget('github')

suite('GitHub contribution widget', () => {
  test('handles command output and recovers from invalid or null JSON', () => {
    const items = [{color: '#dbbffd', count: 3}]
    assert.deepEqual(widget.updateState({type: 'UB/COMMAND_RAN', output: JSON.stringify(items)}, {}), {items})
    for (const output of ['invalid JSON', 'null', '[]']) {
      assert.deepEqual(widget.updateState({type: 'UB/COMMAND_RAN', output}, {}), {items: []})
    }
    const previous = Object.freeze({items})
    assert.equal(widget.updateState({type: 'OTHER_EVENT', output: '[]'}, previous), previous)
  })

  test('preserves existing contributions on command errors and renders a generic error', () => {
    const items = Object.freeze([{color: '#dbbffd', count: 3}])
    const previous = Object.freeze({items})
    const next = widget.updateState({error: new Error('Fixture command failure')}, previous)

    assert.deepEqual(next, {items, error: 'Fixture command failure'})
    assert.notEqual(next, previous)
    assert.equal(next.items, items)
    assert.equal(Object.hasOwn(previous, 'error'), false)
    const tree = widget.render(next)
    assert.equal(textContent(tree), 'Something went wrong')
    assert.equal(findElements(tree, 'span').length, 0)
  })

  test('distinguishes initial loading from a successfully loaded empty calendar', () => {
    assert.equal(textContent(widget.render(widget.initialState)), 'loading...')
    const tree = widget.render({items: []})
    assert.equal(textContent(tree), '')
    assert.equal(findElements(tree, 'div').length, 1)
    assert.equal(findElements(tree, 'span').length, 0)
  })

  test('forwards paired theme colors to contribution cells', () => {
    const items = [
      {color: 'transparent', count: ''},
      {
        color: '#dbbffd',
        darkColor: '#d3b3fe',
        textColor: '#101411',
        darkTextColor: '#101411',
        count: 123,
      },
    ]
    const tree = widget.render({items})
    assert.equal(tree.children.length, 2)
    for (const [index, cell] of tree.children.entries()) {
      const item = items[index]
      assert.deepEqual(cell.props.style, {
        '--contribution-color': item.color,
        '--contribution-dark-color': item.darkColor,
        '--contribution-text-color': item.textColor,
        '--contribution-dark-text-color': item.darkTextColor,
      })
      assert.equal(textContent(cell).trim(), String(item.count))
    }
  })
})
