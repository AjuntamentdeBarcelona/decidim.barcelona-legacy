import { Component, PropTypes } from 'react';

import ReactQuill from 'react-quill';

export default class RichEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      value: this.props.value
    };

    this.toolbarItems = [
      { 
        label:'Text', type:'group', items: [
          { type:'bold', label:'Bold' },
          { type:'italic', label:'Italic' },
          { type:'strike', label:'Strike' },
          { type:'underline', label:'Underline' },
          { type:'separator' },
          { type:'link', label:'Link' }
        ]
      },
      { 
        label:'Blocks', type:'group', items: [
          { type:'bullet', label:'Bullet' },
          { type:'separator' },
          { type:'list', label:'List' }
        ]
      }
    ];

  }

  componentWillReceiveProps({ value }) {
    this.setState({ value });
  }

  onTextChange(value) {
    this.setState({ value });

    if (this.props.onTextChange && this.props.value !== value) {
      this.props.onTextChange(value);
    }
  }

  render() {
    return (
      <div>
        <ReactQuill
          theme="snow"
          value={this.state.value}
          onChange={(value) => this.onTextChange(value)}
          readOnly={this.props.disabled}>
          <ReactQuill.Toolbar key="toolbar"
            ref="toolbar"
            items={this.toolbarItems} />
          <div key="editor"
            ref="editor"
            className="quill-contents" />
        </ReactQuill>
        <input id={this.props.id} type="hidden" name={this.props.name} value={this.state.value} />
      </div>
    );
  }
}

RichEditor.propTypes = {
  value: PropTypes.string,
  onTextChange: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string
};
