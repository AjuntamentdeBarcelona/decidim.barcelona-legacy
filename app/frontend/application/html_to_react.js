import HtmlToReact from 'html-to-react';

const htmlToReactParser = new HtmlToReact.Parser(React);

const htmlToReact = html => htmlToReactParser.parse(`<div>${html}</div>`);

export default htmlToReact;
