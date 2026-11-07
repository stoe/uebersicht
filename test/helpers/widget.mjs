import {readFileSync} from 'node:fs'
import {registerHooks} from 'node:module'
import {transformSync} from 'esbuild'

// Model the host's element tree without evaluating layout or computed styles.
const React = {
  createElement(type, props, ...values) {
    const children = values.flat(Infinity).filter(value => value != null && typeof value !== 'boolean')
    return typeof type === 'function' ? type({...props, children}) : {type, props: props ?? {}, children}
  },
}

export default React

export const css = (strings, ...values) => String.raw({raw: strings}, ...values)

export const styled =
  type =>
  () =>
  ({children, ...props}) =>
    React.createElement(type, props, ...children)

export const loadWidget = async name => {
  const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
      return specifier === 'uebersicht' ? {url: import.meta.url, shortCircuit: true} : nextResolve(specifier, context)
    },
    load(url, context, nextLoad) {
      if (!url.endsWith('.jsx')) return nextLoad(url, context)
      const source = readFileSync(new URL(url), 'utf8')
      return {
        format: 'module',
        source: transformSync(source, {loader: 'jsx', jsxFactory: 'React.createElement', format: 'esm'}).code,
        shortCircuit: true,
      }
    },
  })
  try {
    return await import(new URL(`../../packages/${name}/index.jsx`, import.meta.url))
  } finally {
    hooks.deregister()
  }
}

export const findElements = (tree, type) => {
  if (Array.isArray(tree)) return tree.flatMap(child => findElements(child, type))
  if (!tree || typeof tree !== 'object') return []
  return [...(tree.type === type ? [tree] : []), ...findElements(tree.children, type)]
}

export const textContent = tree => {
  if (Array.isArray(tree)) return tree.map(textContent).join('')
  if (tree && typeof tree === 'object') return textContent(tree.children)
  return tree == null || typeof tree === 'boolean' ? '' : String(tree)
}
