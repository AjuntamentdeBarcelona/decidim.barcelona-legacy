import { Component }                      from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onBoldClick(event) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <button onClick={(event) => this._onBoldClick(event)}>Bold</button>
        <Editor 
          editorState={this.state.editorState} 
          handleKeyCommand={(command) => this.handleKeyCommand(command)}
          onChange={(event) => this.onChange(event)} 
        />
      </div>
    );
  }
}
