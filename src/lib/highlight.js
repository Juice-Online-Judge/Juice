import React from 'react'
import Prism from 'prismjs'
import isString from 'lodash/isString'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'

global.Prism = Prism

function isCpp (lang) {
  return lang === 'c++' || lang === 'cpp'
}

function getGrammer (lang) {
  if (isCpp(lang)) {
    return Prism.languages.cpp
  } else {
    return Prism.languages[lang]
  }
}

function reactify (token, key) {
  if (isString(token)) {
    return token
  }

  if (Array.isArray(token)) {
    return token.map((t, idx) => reactify(t, idx))
  }

  return (
    <span className={`token ${token.type}`} key={key}>
      {reactify(token.content)}
    </span>
  )
}

export function highlightReact (code, lang) {
  const grammer = getGrammer(lang)

  if (!grammer) {
    return code
  }

  const tokens = Prism.tokenize(code, grammer)
  return reactify(tokens)
}

export function highlightString (code, lang) {
  const grammer = getGrammer(lang)

  if (!grammer) {
    return code
  }

  return Prism.highlight(code, grammer)
}
