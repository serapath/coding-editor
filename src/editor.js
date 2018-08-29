const bel = require('bel')
const csjs = require('csjs-inject')
const codemirror = require('codemirror')
const mode_css = require('codemirror/mode/css/css')
const mode_xml = require('codemirror/mode/xml/xml')
const mode_md = require('codemirror/mode/markdown/markdown')
const mode_js = require('codemirror/mode/javascript/javascript')
const mode_html = require('codemirror/mode/htmlmixed/htmlmixed')
const mode_ehtml = require('codemirror/mode/htmlembedded/htmlembedded')

const style = require('./style.js')
document.head.appendChild(style)

// THEME
// <link href="theme/neo.css">
// <link href="codemirror/theme/dracula.css" rel="stylesheet">
// <link href="codemirror/lib/codemirror.css" rel="stylesheet">
// <link rel="stylesheet" href="css/theme.css">
// <link rel="stylesheet" href="css/style.css">
// <link rel="stylesheet" href="css/codemirror-default.css" name="Default">
// <link rel="stylesheet/less" href="css/codemirror-solarized.less" name="Solarized Light, Solarized Dark">

// ADDONS
// enable autocomplete (addon)
// <script src="addon/hint/show-hint.js"></script>
// <script src="addon/hint/css-hint.js"></script>
// <link href="addon/hint/show-hint.css">
//
// <script src="codemirror/addon/edit/closetag.js"></script>

module.exports = editor

editor.defaults = codemirror.defaults

function editor (opts = editor.defaults) {
  /* FEATURES - Functionality includes
  + undo,
  + redo,
  + jump to line,
  + reindent selection,
  + and reindent entire document.

  Two options for
  + find/replace are also available

  var uiOptions = { path : 'js/', searchMode: 'popup', buttons: ['foo']}

  // then create the editor
  var editor = new CodeMirrorUI(textarea,uiOptions,codeMirrorOptions);

  CodeMirror.keyMap.tabSpace = {
      Tab: function (cm) {
        var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces, 'end', '+input');
      },
      fallthrough: ['default']
    };

    const extJson = {
      "ini": [
        ".editorconfig"
      ],
      "json": [
        ".jshintrc",
        ".yaspellerrc",
        ".jscsrc",
        ".babelrc",
        ".bowerrc"
      ]
    }
  */

  // LIFE CYCLE HOOKS?
  // 1. .on('attribute')
  // 2. .on('created')
  // 3. .on('attached') // dettached?
  // 4. .on('change') // e.g. user writes into editor...

  var defaults = {
    value: "// hello world\n",
    mode: "javascript",
    lineNumbers: true,
    autofocus: (window === window.top),
    matchBrackets: true,
    indentWithTabs: false,
    smartIndent: true,
    tabSize: 2,
    indentUnit: 2,
    // theme: 'mistakes' // borrowed from mistakes.io
    updateInterval: 500,
    dragAndDrop: true
  }

  // codemirror(place: Element|fn(Element), ?option: object)
  const api = codemirror(document.createElement('div'))

  Object.keys(opts).forEach(key => api.setOption(key, opts[key]))
  const el = bel`<div class=${css.editor}>${api.getWrapperElement()}</div>`
  // ALTERNATIVE:
  // var myCodeMirror = CodeMirror(function (element) {
  //   document.body.appendChild(element)
  // }, opts)
  el.api = api

  api.on('change', (...args) => console.log('change', args.length))
  const autoresize = () => {
    const { innerWidth, innerHeight } = window
    console.log('RESIZE', innerWidth, innerHeight)
    // api.setSize('250', '150')
    const width = el.parentElement.clientWidth
    const height = el.parentElement.clientHeight
    api.setSize(width, height)
  }
  const resize = (size = {}) => {
    // refresh()
    // Don't forget adding editor.refresh()
    // after setting the new size.
    // Debouncing refresh() is also a good idea
    // If your code does something to change the size of the
    // editor element (window resizes are already listened for),
    // or unhides it, you should probably follow up by calling
    // this method to ensure CodeMirror is still looking as intended.
    if (size === 'auto') {
      autoresize() // setTimeout(autoresize, 0) // @TODO: .on('attach')
      window.addEventListener('resize', autoresize)
    } else if (Object(size) === size) {
      const { width, height } = size
      if (Number.isNaN(Number(width)) || Number.isNaN(Number(height))) return
      api.setSize(width, height)
      window.removeEventListener('resize', autoresize)
    } else {
      api.setSize(size, size)
      window.removeEventListener('resize', autoresize)
    }
  }
  api.resize = resize
  setTimeout(function onAttach () {
    api.setCursor(api.lineCount(), 0) // @TODO: check what `.lineCount()` exactly does
    resize('auto')
    // api.focus()
  }, 0)
  window.api = api
  window.addEventListener("resize", debounce(autoresize))

  return el
}

function debounce (fn) {
  const wait = 100
  var timeout, context, args
  const exec = () => {
    fn.apply(context, args)
    timeout = undefined
  }
  return function () {
    context = this
    args = arguments
    if (timeout) return
    timeout = setTimeout(exec, wait)
  }
}

const css = csjs`
.editor {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
}`

/*
CodePrinter.defaults = {
  mode: 'plaintext',
  theme: 'default',
  caretStyle: 'vertical',
  lineEndings: '\n',
  width: 'auto',
  height: 300,
  tabWidth: 2,
  tabIndex: -1,
  fontSize: 12,
  fontFamily: 'Menlo, Monaco, Consolas, Courier, monospace',
  minFontSize: 6,
  maxFontSize: 60,
  lineHeight: 'normal',
  caretHeight: 1,
  caretBlinkRate: 500,
  viewportMargin: 80,
  keyupInactivityTimeout: 1000,
  scrollSpeed: 1,
  autoCompleteDelay: 200,
  historyStackSize: 100,
  historyDelay: 1000,
  firstLineNumber: 1,
  lineNumbers: true,
  lineNumberFormatter: false,
  lineWrapping: false,
  autoComplete: false,
  autoFocus: true,
  abortSelectionOnBlur: false,
  legacyScrollbars: false,
  readOnly: false,
  drawIndentGuides: true,
  history: true,
  matching: true,
  highlightCurrentLine: true,
  blinkCaret: true,
  autoScroll: true,
  autoIndent: true,
  indentByTabs: false,
  trimTrailingSpaces: false,
  insertClosingBrackets: true,
  insertClosingQuotes: true,
  useParserKeyMap: true,
  tabTriggers: true,
  shortcuts: true,
  disableThemeClassName: false
}
*/
