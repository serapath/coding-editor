module.exports = ({
  color_bgEditor,
  color_bgLinebar,
  color_seperator
}) => `
.cm-s-play-dark.CodeMirror { background: ${color_bgEditor}; color: white; }
.cm-s-play-dark div.CodeMirror-selected { background: #b36539; }
.cm-s-play-dark .CodeMirror-line::selection, .cm-s-play-dark .CodeMirror-line > span::selection, .cm-s-play-dark .CodeMirror-line > span > span::selection { background: rgba(179, 101, 57, .99); }
.cm-s-play-dark .CodeMirror-line::-moz-selection, .cm-s-play-dark .CodeMirror-line > span::-moz-selection, .cm-s-play-dark .CodeMirror-line > span > span::-moz-selection { background: rgba(179, 101, 57, .99); }
.cm-s-play-dark .CodeMirror-gutters { background: ${color_seperator}; border-right: 1px solid ${color_bgLinebar}; }
.cm-s-play-dark .CodeMirror-guttermarker { color: white; }
.cm-s-play-dark .CodeMirror-guttermarker-subtle { color: #d0d0d0; }
.cm-s-play-dark .CodeMirror-linenumber { color: #d0d0d0; }
.cm-s-play-dark .CodeMirror-cursor { border-left: 1px solid white; }

.cm-s-play-dark span.cm-quote      { color: #ccc; }
.cm-s-play-dark span.cm-atom       { color: #f133f1; }
.cm-s-play-dark span.cm-attribute  { color: #ff80e1; }
.cm-s-play-dark span.cm-bracket    { color: #ff9d00; }
.cm-s-play-dark span.cm-builtin    { color: #eaa; }
.cm-s-play-dark span.cm-comment    { color: #77f; }
.cm-s-play-dark span.cm-def        { color: ${'#9BC53D'}; /* #e7a */ }
.cm-s-play-dark span.cm-keyword    { color: ${'#14b9d5'}; /* #ffee80 */ }
.cm-s-play-dark span.cm-meta       { color: #50fefe; }
.cm-s-play-dark span.cm-number     { color: #ffd0d0; }
.cm-s-play-dark span.cm-operator   { color: ${'blue'}; /* #d55 */ }
.cm-s-play-dark span.cm-property   { color: #ccc; }
.cm-s-play-dark span.cm-qualifier  { color: #ccc; }
.cm-s-play-dark span.cm-special    { color: #ffbbbb; }
.cm-s-play-dark span.cm-string     { color: #3ad900; }
.cm-s-play-dark span.cm-string-2   { color: #ccc; }
.cm-s-play-dark span.cm-tag        { color: #9effff; }
.cm-s-play-dark span.cm-variable   { color: ${'white'}; /* #50fe50 */ }
.cm-s-play-dark span.cm-variable-2 { color: #e0e; }
.cm-s-play-dark span.cm-variable-3, .cm-s-play-dark span.cm-type { color: #ccc; }
.cm-s-play-dark span.cm-error      { color: #9d1e15; }

.cm-s-play-dark .CodeMirror-activeline-background { background: #013461; }
.cm-s-play-dark .CodeMirror-matchingbracket { outline:1px solid grey; color:white !important; }
`
