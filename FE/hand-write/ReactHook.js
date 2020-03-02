const React = (function() {
  let hooks = []
  let idx = 0

  function useState(initVal) {
    const state = hooks[idx] || initVal
    const _idx = idx
    const setState = (newValue) => {
      hooks[_idx] = newValue
    }

    idx++

    return [state, setState];
  }

  function render (Component) {
    idx = 0
    const component = Component()
    component.render()
    return component
  }

  function useEffect (fn, depArray) {
    const oldDeps = hooks[idx]
    let hasChange = true
    if (oldDeps) {
      hasChange = depArray.some((item, i) => !Object.is(item, oldDeps[i]))
    }

    if (hasChange) fn()
    hooks[idx] = depArray
    idx++
  }

  function workLoop() {
    idx = 0
    render(hooks)()
    setTimeout(workLoop, 300)
  }

  return { useState, render, useEffect };
})()

function Component () {
  let [state, setState] = React.useState(1);
  let [text, setText] = React.useState('banana');

  React.useEffect(() => {
    console.log('Its effect')
  }, [text])

  return {
    render: () => console.log({ state, text }),
    click: () => setState(state + 1),
    type: t => setText(t),
  }
}

var App = React.render(Component)
App.click()
var App = React.render(Component)
App.type('apple')
var App = React.render(Component)

// var App2 = React.render(Component)
