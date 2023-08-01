import { CSS as gfmCSS, KATEX_CSS } from 'https://deno.land/x/gfm@0.2.5/mod.ts'

export const styleSheet = /*css*/ `
@import url('https://necolas.github.io/normalize.css/8.0.1/normalize.css');

${gfmCSS}

${KATEX_CSS}

* {
  font-family: 'IBM Plex Mono', monospace !important;
  scrollbar-width: thin !important;
  scrollbar-color: transparent transparent !important;
}

html,
body {
  height: 100%;
  min-height: 100%;
}

body {
  background-color: rgb(22, 27, 34);
  padding: 12px;
}

main {
  max-width: 850px;
  margin: 0 auto;
}

footer a,
footer p {
  text-decoration: none;
  color: #8e9e9e;
}

footer a {
  border-bottom: 1px solid #8e9e9e;
}

footer a::active {
  color: #fff;
}

footer a::visited {
  color: #fff;
}

footer em {
  color: #f7f7f7;
  padding: 0 0.5rem;
}

footer {
  width: 97.5%;
  height: 0.35rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.7rem;
  bottom: 0;
  right: 0;
  position: fixed;
  padding: 10px;
}

section {
  padding: 12px;
  border-radius: 8px;
}

h1 > a, strong {
  font-weight: 900 !important;
}

h4 {
  color: rgb(228, 228, 231);
}

.text-center {
  text-align: center;
}

.markdown-body:has(.highlight-source-json) {
  margin: 0 auto;
  width: 400px;
  max-width: 750px;
  font-size: 1.25rem;
}

.markdown-body {
  /* background-color: rgb(21, 23, 24) !important; */
  border-radius: 5px;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 12px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.highlight-source-json {
  width: 100%;
}

::selection {
  background-color: #C9D1D8;
  color: #1d1f28;
}

@-moz-document url-prefix() {
  * {
    scrollbar-width: none;
  }
}

::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border: 5px solid transparent;
  border-radius: 1rem;
}

::-webkit-scrollbar-track {
  position: absolute;
  right: -3rem;
  top: -50rem;
  background: transparent;
}
`
