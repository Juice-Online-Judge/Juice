import React from 'react';
import Remarkable from 'react-remarkable';
import hljs from 'highlight.js';
import setDisplayName from 'recompose/setDisplayName';

const remarkableOpts = {
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return '';
  }
};

const Markdown = setDisplayName('Markdown')((props) => {
  const { children, ...rest } = props;

  if (children) {
    return (
      <Remarkable { ...rest } options={ remarkableOpts } >
        { children }
      </Remarkable>
    );
  }

  return (
    <Remarkable { ...rest } options={ remarkableOpts } />
  );
});

export default Markdown;
