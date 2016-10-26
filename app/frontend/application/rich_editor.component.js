/* eslint-disable react/no-danger */
import { Component, PropTypes } from 'react';

import ReactQuill from 'react-quill';

export default class RichEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      value: this.props.value
    };

    this._quillModules = {
      toolbar: [
          ['bold', 'italic'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['link'],
          ['clean']
      ]
    };

    this._quillFormats = [
        "bold", "italic",
        "list", "bullet",
        "link"
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
      <div className="_quill">
        <ReactQuill
          theme="snow"
          modules={this._quillModules}
          formats={this._quillFormats}
          toolbar={false}
          value={this.state.value}
          onChange={(value) => this.onTextChange(value)}
          readOnly={this.props.disabled}
          bounds={'._quill'}>
          <div key="editor"
            ref="editor"
            className="quill-contents"
            dangerouslySetInnerHTML={{__html:this.state.value}} />
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
