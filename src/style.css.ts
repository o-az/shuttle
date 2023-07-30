export const styleSheet = /*css*/ `
* {
  font-family: 'IBM Plex Mono', monospace !important;
  scrollbar-width: thin;
}

html,
body {
  height: 100%;
  min-height: 100%;
}

body {
  background-color: #1d1f28;
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

.markdown-body {
  border-radius: 5px;
}

.text-center {
  text-align: center;
}

.markdown-body:has(.highlight-source-json) {
  margin: 0 auto;
  width: 500px;
  max-width: 750px;
  font-size: 1.45rem;
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

/*******************************/

/***
    The new CSS reset - version 1.9 (last updated 19.6.2023)
    GitHub page: https://github.com/elad2412/the-new-css-reset
***/

/*
    Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
    - The "symbol *" part is to solve Firefox SVG sprite bug
    - The "html" element is excluded, otherwise a bug in Chrome breaks the CSS hyphens property (https://github.com/elad2412/the-new-css-reset/issues/36)
 */
*:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *)) {
    all: unset;
    display: revert;
}

/* Preferred box-sizing value */
*,
*::before,
*::after {
    box-sizing: border-box;
}

/* Reapply the pointer cursor for anchor tags */
a, button {
    cursor: revert;
}

/* Remove list styles (bullets/numbers) */
ol, ul, menu {
    list-style: none;
}

/* For images to not be able to exceed their container */
img {
    max-inline-size: 100%;
    max-block-size: 100%;
}

/* removes spacing between cells in tables */
table {
    border-collapse: collapse;
}

/* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
input, textarea {
    -webkit-user-select: auto;
}

/* revert the 'white-space' property for textarea elements on Safari */
textarea {
    white-space: revert;
}

/* minimum style to allow to style meter element */
meter {
    -webkit-appearance: revert;
    appearance: revert;
}

/* preformatted text - use only for this feature */
:where(pre) {
    all: revert;
}

/* reset default text opacity of input placeholder */
::placeholder {
    color: unset;
}

/* remove default dot (•) sign */
::marker {
    content: initial;
}

/* fix the feature of 'hidden' attribute.
   display:revert; revert to element instead of attribute */
:where([hidden]) {
    display: none;
}

/* revert for bug in Chromium browsers
   - fix for the content editable attribute will work properly.
   - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element*/
:where([contenteditable]:not([contenteditable="false"])) {
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
    -webkit-user-select: auto;
}

/* apply back the draggable feature - exist only in Chromium and Safari */
:where([draggable="true"]) {
    -webkit-user-drag: element;
}

/* Revert Modal native behavior */
:where(dialog:modal) {
    all: revert;
}`
