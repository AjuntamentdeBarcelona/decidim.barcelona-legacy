import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import Loading                  from '../application/loading.component';

import * as actions             from './comments.actions';

class NewCommentForm extends Component {
  constructor(props) {
    super(props);

    this.newCommentTemplate = {
      body: '',
      alignment: "0"
    };

    this.state = {
      visible: this.props.visible,
      loading: false,
      newComment: { ...this.newCommentTemplate }
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ visible: newProps.visible });
  }

  render() {
    const { parent } = this.props;

    if (this.state.visible) {
      let textAreaId = `comment-body-${parent ? parent.id : 'root'}`,
          submitButtonText = parent ? I18n.t("comments_helper.reply_button") : I18n.t("comments_helper.comment_button");

      return (
        <div>
          <form className="new_comment" onSubmit={(e) => this.onSubmitNewComment(e)}>
            <Loading show={this.state.loading} />
            <label 
              htmlFor={textAreaId}>
              Deixa el teu comentari
            </label>
            <textarea id={textAreaId} value={this.state.newComment.body} onChange={e => this.setBody(e.target.value)}></textarea>
            {this.renderAlignmentRadioButtons()}
            {this.renderCommentAsModerator()}
            <span className="right">&nbsp;&nbsp;</span>
            {this.renderCommentAsAdministrator()}
            <span className="right">&nbsp;&nbsp;</span>
            <input 
              disabled={this.state.newComment.body === ''}
              type="submit" 
              value={submitButtonText} 
              className="button radius small inline-block" />
          </form>
        </div>
      );
    }

    return null;
  }

  renderAlignmentRadioButtons() {
    const { commentable, parent } = this.props;

    if (commentable.arguable && !parent) {
      let positiveId = `comment-body-${parent ? parent.id : 'root'}-positive-alignment`,
          neutralId  = `comment-body-${parent ? parent.id : 'root'}-neutral-alignment`,
          negativeId = `comment-body-${parent ? parent.id : 'root'}-negative-alignment`;

      return (
        <div className="alignment">
          <span className="alignment-input">
            <input id={positiveId} type="radio" value="1" checked={this.state.newComment.alignment === "1"} onChange={e => this.setAlignment(e.target.value)} />
            <label htmlFor={positiveId}>{I18n.t('comments.form.alignment.positive')}</label>
          </span>
          <span className="alignment-input">
            <input id={neutralId} type="radio" value="0" checked={this.state.newComment.alignment === "0"} onChange={e => this.setAlignment(e.target.value)} />
            <label htmlFor={neutralId}>{I18n.t('comments.form.alignment.neutral')}</label>
          </span>
          <span className="alignment-input">
            <input id={negativeId} type="radio" value="-1" checked={this.state.newComment.alignment === "-1"} onChange={e => this.setAlignment(e.target.value)} />
            <label htmlFor={negativeId}>{I18n.t('comments.form.alignment.negative')}</label>
          </span>
        </div>
      );
    }

    return null;
  }

  setBody(body) {
    this.setState({ 
      newComment: { 
        ...this.state.newComment, 
        body
      }
    });
  }

  setAlignment(alignment) {
    this.setState({ 
      newComment: { 
        ...this.state.newComment, 
        alignment
      }
    });
  }

  renderCommentAsModerator() {
    const { commentable, parent } = this.props;

    if (commentable.permissions.comment_as_moderator) {
      let checkboxId = `comment-as-moderator-${parent ? parent.id : 'root'}`;

      return (
        <div className="right">
          <input 
            type="checkbox" 
            id={checkboxId} 
            checked={this.state.newComment.as_moderator} 
            onChange={e => this.setCommentAsModerator(e.target.checked)} />
          <label className="checkbox" htmlFor={checkboxId}>{I18n.t("comments.form.comment_as_moderator")}</label>
        </div>
      );
    }

    return null;
  }

  setCommentAsModerator(as_moderator) {
    this.setState({ 
      newComment: { 
        ...this.state.newComment, 
        as_moderator
      }
    });
  }

  renderCommentAsAdministrator() {
    const { commentable, parent } = this.props;

    if (commentable.permissions.comment_as_administrator) {
      let checkboxId = `comment-as-administrator-${parent ? parent.id : 'root'}`;

      return (
        <div className="right">
          <input 
            type="checkbox" 
            id={checkboxId} 
            checked={this.state.newComment.as_administrator} 
            onChange={e => this.setCommentAsAdministrator(e.target.checked)} />
          <label className="checkbox" htmlFor={checkboxId}>{I18n.t("comments.form.comment_as_admin")}</label>
        </div>
      );
    }

    return null;
  }

  setCommentAsAdministrator(as_administrator) {
    this.setState({ 
      newComment: { 
        ...this.state.newComment, 
        as_administrator
      }
    });
  }

  onSubmitNewComment(event) {
    const { commentable, parent, addNewComment } = this.props;

    event.preventDefault();

    addNewComment(commentable, {
      parent, 
      newComment: this.state.newComment 
    }).then(() => {
      this.setState({ loading: false });
      if (this.props.onCommentCreated) {
        this.props.onCommentCreated();
      }
    });

    this.setState({ loading: true, newComment: { ...this.newCommentTemplate }})
  }
}

export default connect(null, actions)(NewCommentForm);

NewCommentForm.propTypes = {
  visible: PropTypes.bool,
  parent: PropTypes.object,
  commentable: PropTypes.object.isRequired,
  addNewComment: PropTypes.func.isRequired,
  onCommentCreated: PropTypes.func
};
