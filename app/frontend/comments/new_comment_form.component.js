import { Component }          from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewComment }      from './comments.actions';

class NewCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCommentBody: ''
    };
  }

  render() {
    const { visible, parent } = this.props;

    if (visible) {
      let textAreaId = `comment-body-${parent && parent.id}`;

      return (
        <div>
          <form onSubmit={(e) => this.onSubmitNewComment(e)}>
            <label 
              forHtml={textAreaId}>
              Deixa el teu comentari
            </label>
            <textarea 
              id={textAreaId}
              value={this.state.newCommentBody}
              onChange={(e) => this.setState({ newCommentBody: e.target.value })}>
            </textarea>
            <input 
              type="submit" 
              value="Publica resposta" 
              className="button radius small inline-block" />
          </form>
        </div>
      );
    }

    return null;
  }

  onSubmitNewComment(event) {
    const { commentable, parent, addNewComment } = this.props;

    event.preventDefault();

    addNewComment(commentable, {
      parent, 
      body: this.state.newCommentBody 
    });

    this.setState({ newCommentBody: '' });
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(NewCommentForm);
