import HtmlToReact from 'html-to-react';

const isValidNode = () => true;

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const processingInstructions = [{
  // Custom <a> processing 
  shouldProcessNode: function(node) {
      return node.parent && node.parent.name && node.parent.name === 'a';
  },
  processNode: function(node) {
      node.parent.attribs.rel = "nofollow";
      node.parent.attribs.target = "_blank";
      return node.data;
  }
}, {
  // Anything else 
  shouldProcessNode: function() {
      return true;
  },
  processNode: processNodeDefinitions.processDefaultNode
}];

const htmlToReactParser = new HtmlToReact.Parser(React);

const htmlToReact = html => htmlToReactParser.parseWithInstructions(`<div>${html}</div>`, isValidNode, processingInstructions);

export default htmlToReact;
