import assert from 'node:assert/strict'
import {suite, test} from 'node:test'
import {findElements, loadWidget, textContent} from '../helpers/widget.mjs'

const widget = await loadWidget('me')

suite('profile widget', () => {
  test('renders a heading and metadata with accompanying icons', () => {
    const tree = widget.render()
    const headings = findElements(tree, 'h3')
    const metadata = findElements(tree, 'p')

    assert.equal(headings.length, 1)
    assert.ok(textContent(headings[0]).trim())
    assert.equal(metadata.length, 2)
    for (const paragraph of metadata) {
      assert.ok(textContent(paragraph).trim())
      assert.equal(findElements(paragraph, 'svg').length, 1)
      assert.equal(findElements(paragraph, 'path').length, 1)
    }
  })
})
