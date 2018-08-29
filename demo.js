const editor = require('./')

document.title = 'editor'

const style = document.createElement('style')
style.innerHTML = `
  <style>
    html { box-sizing: border-box; display: table; min-width: 100%; margin: 0; }
    *, *:before, *:after { box-sizing: inherit; }
    img { box-sizing: content-box; }
    iframe { border: 0; height: 100vh; }
    body { margin: 0; display: flex; flex-flow: column; min-height: 100vh; }
  </style>`
document.head.appendChild(style)

const src = `function testFunction () {
  alert('hello world)
  return true
}`

const element = editor({
  value: src,
  lineNumbers: true,
})
document.body.appendChild(element)

window.api = element.api
api.on('change', () => console.log(api.getValue()))

var value = api.getValue()
console.log(value)
