document.title = 'coding-editor'

const editor = require('../')

setTimeout(async () => {
  const src = [...Array(100)].map(x => `
    function findSequence(goal) {
      function find(start, history) {
        if (start == goal)
        return history;
        else if (start > goal)
        return null;
        else
        return find(start + 5, "(" + history + " + 5)") ||
        find(start * 3, "(" + history + " * 3)");
      }
      return find(1, "1");
    }
    `).join('')
  const element = editor({
    value: src,
    lineNumbers: true,
  })
  document.body.appendChild(element)
  window.api = element.api
  var value = api.getValue()
  console.log(value)
  api.on('change', () => console.log(api.getValue()))
}, 0)

const style = document.createElement('style')
style.setAttribute('class', 'base')
style.textContent = `
  html { box-sizing: border-box; display: table; min-width: 100%; margin: 0; }
  *, *:before, *:after { box-sizing: inherit; }
  body { margin: 0; display: flex; flex-flow: column; min-height: 100vh; }
  iframe { border: 0; height: 100vh; }
  img { box-sizing: content-box; }
`
document.head.appendChild(style)
