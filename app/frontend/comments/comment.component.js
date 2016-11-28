import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import classNames               from 'classnames';

import Icon                     from '../application/icon.component';
import UserAvatar               from '../application/user_avatar.component';
import FlagActions              from '../application/flag_actions.component';
import DangerLink               from '../application/danger_link.component';

import ChildrenComments         from './children_comments.component';
import NewCommentForm           from './new_comment_form.component';

import * as actions             from './comments.actions';

import htmlToReact              from '../application/html_to_react';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showReplyForm: false
    };
  }

  render() {
    const { comment } = this.props;
    const { ancestry } = comment;

    if (ancestry) {
      return this.renderComment();
    } else {
      return (
        <div className="comment-thread">
          {this.renderComment()}
        </div>
      );
    }
  }

  renderComment() {
    const { 
      comment, 
      commentable, 
      flagComment, 
      unFlagComment
    } = this.props;

    const { author, ancestry } = comment;

    const authorUrl = author ? `/users/${author.id}` : '#';
    const official = author ? author.official : false;

    const cssClasses = classNames(
      'comment',
      {
        'comment--nested': ancestry,
        'comment--highlight': official
      }
    );

    return (
      <article id={`comment_${comment.id}`} className={cssClasses}>
        <div className="comment__header">
          <div className="author-data">
            <div className="author-data__main">
              <div className="author author--inline">
                <a href={authorUrl} className="author__avatar">
                  <UserAvatar user={author} />
                </a>
                <a href={authorUrl} className="author__name">
                  {this.renderAuthorName()}
                </a>
                <time dateTime={comment.created_at}>{' ' + comment.created_at}</time>
                <div className="author-data__extra">
                  <FlagActions 
                    flaggeable={comment}
                    flagAction={flagComment}
                    unFlagAction={unFlagComment}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comment__content">
          <p>
            {this.renderAlignmentBadge()}
            {htmlToReact(comment.body)}
          </p>
        </div>
        <div className="comment__footer">
          <div id={`comment_${comment.id}_reply`} className="reply">
            {this.renderReplyAction()}
            {this.renderHideButton()}
            {this.renderHideAuthorButton()}
            <NewCommentForm 
              commentable={commentable}
              visible={this.state.showReplyForm} 
              onCommentCreated={() => this.setState({ showReplyForm: false })  }  parent={comment} />
          </div>
          {this.renderVoteActionLinks()}
        </div>
        <ChildrenComments comment={comment} commentable={commentable} />
      </article>
    );
  }

  renderAuthorName() {
    const { author, as, administrator_id, moderator_id } = this.props.comment;

    if (author.hidden || author.erased) {
      return (
        <span className="user-name">{I18n.t("comments.comment.user_deleted")}</span>
      );
    } else {
      if (as === 'administrator') {
        return (
          <span className="user-name">{`${I18n.t("comments.comment.admin")} #`}{administrator_id}</span>
        );
      } else if (as === 'moderator') {
        return (
          <span className="user-name">{`${I18n.t("comments.comment.moderator")} #`}{moderator_id}</span>
        );
      } else {
        return (
          <span className="user-name"><a href={`/users/${author.id}`}>{author.name}</a></span>
        );
      }
    }
  }

  renderReplyAction() {
    const { commentable, participatoryProcess } = this.props;
    const { step } = participatoryProcess;
    const { flags } = step;

    if ((commentable.type !== 'Proposal' || flags.enable_proposal_comments) &&
      commentable.permissions.comment) {
      return (
        <span>
          <a className="comment__reply muted-link" onClick={() => this.setState({showReplyForm: !this.state.showReplyForm })}>{I18n.t("comments_helper.reply_link")}</a>
        </span>
      );
    }

    return null;
  }

  renderVoteActionLinks() {
    const { comment, upVoteComment, downVoteComment } = this.props;

    if (comment.permissions.vote) {
      return (
        <div id={`comment_${comment.id}_votes`} className="comment__votes">
          <a onClick={() => upVoteComment(comment.id)} className="comment__votes--up">
            <Icon name="chevron-top" className="icon--small" ariaLabel="Votar a favor" role="img" />
            {comment.total_likes}
          </a>
          <a onClick={() => downVoteComment(comment.id)} className="comment__votes--down">
            <Icon name="chevron-bottom" className="icon--small" ariaLabel="Votar en contra" role="img" />
            {comment.total_dislikes}
          </a>
        </div>
      );
    }

    return (
      <div id={`comment_${comment.id}_votes`} className="comment__votes">
        <span className="comment__votes--up">
          <Icon name="chevron-top" className="icon--small" ariaLabel="Votar a favor" role="img" />
          {comment.total_likes}
        </span>
        <span className="comment__votes--down">
          <Icon name="chevron-bottom" className="icon--small" ariaLabel="Votar en contra" role="img" />
          {comment.total_dislikes}
        </span>
      </div>
    );
  }

  renderAuthorOfficialBadge() {
    const { author } = this.props.comment;
    const { official, official_level } = author;

    if (official) {
      return (
        <span>
          &nbsp;&bull;&nbsp;
          <span className={`label round level-${official_level}`}>
            {I18n.t(`officials.level_${official_level}`)}
          </span>
        </span>
      );
    }

    return null;
  }

  renderAlignmentBadge() {
    const { comment, commentable } = this.props;
    const { alignment } = comment;

    if (commentable.arguable && alignment !== null) {
      const cssClasses = classNames(
        'round',
        'label',
        {
          success: alignment > 0,
          alert: alignment < 0,
          secondary: alignment === 0
        }
      );
      const text = 
        alignment > 0 ? I18n.t('comments.form.alignment.positive') :
        alignment < 0 ? I18n.t('comments.form.alignment.negative') :
        I18n.t('comments.form.alignment.neutral');

      return (
        <span className={cssClasses}>{text}</span>
      );
    }
    return null;
  }

  renderHideButton() {
    const { comment, hideComment } = this.props;
    const { id, permissions } = comment;

    if (permissions.hide) {
      return (
        <span>
          <span className="divider">&nbsp;|&nbsp;</span>
          <DangerLink onClick={() => hideComment(id)}>
            { I18n.t('admin.actions.hide') }
          </DangerLink>
        </span>
      );
    }
    return null;
  }

  renderHideAuthorButton() {
    const { comment, hideCommentAuthor } = this.props;
    const { id, permissions } = comment;

    if (permissions.hide_author) {
      return (
        <span>
          <span className="divider">&nbsp;|&nbsp;</span>
          <DangerLink onClick={() => hideCommentAuthor(id)}>
            { I18n.t('admin.actions.hide_author') }
          </DangerLink>
        </span>
      );
    }
    return null;
  }
}

export default connect(
  ({ participatoryProcess }) => ({ participatoryProcess }),
  actions
)(Comment);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  commentable: PropTypes.object.isRequired,
  flagComment: PropTypes.func.isRequired,
  unFlagComment: PropTypes.func.isRequired,
  hideComment: PropTypes.func.isRequired,
  hideCommentAuthor: PropTypes.func.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
  participatoryProcess: PropTypes.object.isRequired
};
