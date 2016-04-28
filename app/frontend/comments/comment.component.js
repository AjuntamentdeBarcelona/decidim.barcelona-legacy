import { Component }                  from 'react';
import { connect }                    from 'react-redux';
import { bindActionCreators }         from 'redux';

import classNames                     from 'classnames';

import UserAvatar                     from '../application/user_avatar.component';
import FlagActions                    from '../application/flag_actions.component';

import ChildrenComments               from './children_comments.component';
import NewCommentForm                 from './new_comment_form.component';

import { 
  flagComment, 
  unFlagComment,
  upVoteComment,
  downVoteComment
} from './comments.actions';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showReplyForm: false
    };
  }

  render() {
    const { 
      comment, 
      commentable, 
      flagComment, 
      unFlagComment, 
    } = this.props;

    const { alignment, author, as } = comment;

    const cssClasses = classNames(
      'comment',
      'small-12',
      'column',
      {
        negative: alignment < 0,
        neutral: alignment === 0,
        positive: alignment > 0,
        'comment-author': author.id === commentable.author.id
      }
    );

    return (
      <div className="row">
        <div id={`comment_${comment.id}`} className={cssClasses}>
          <UserAvatar user={author} role={as} />
          <div className="comment-body">
            <div className="comment-info">
              {this.renderAuthorName()}
              {this.renderAuthorOfficialBadge()}
              {this.renderAlignmentBadge()}
              &nbsp;&bull;&nbsp;
              <time>{comment.created_at}</time>
            </div>
            <div 
              className="comment-user"
              dangerouslySetInnerHTML={{ __html: comment.body }} />
            <div id={`comment_${comment.id}_reply`} className="reply">
              <span id={`comment_${comment.id}_votes`} className="comment-votes right">
                <span>{I18n.t('comments.comment.votes', { count: comment.total_votes })}</span>
                &nbsp;|&nbsp;
                {this.renderVoteActionLinks()}
              </span>
              {I18n.t("comments.comment.responses", { count: comment.children ? comment.children.length : 0 })}
              {this.renderReplyAction()}
              <FlagActions 
                flaggeable={comment}
                flagAction={flagComment}
                unFlagAction={unFlagComment}
              />
              <NewCommentForm 
                commentable={commentable}
                visible={this.state.showReplyForm} 
                onCommentCreated={() => this.setState({ showReplyForm: false })}
                parent={comment} />
            </div>
          </div>
          <ChildrenComments comment={comment} commentable={commentable} />
        </div>
      </div>
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
    const { commentable } = this.props;

    if (commentable.permissions.comment) {
      return (
        <span>
          <span className="divider">&nbsp;|&nbsp;</span>
          <a className="reply" onClick={() => this.setState({showReplyForm: !this.state.showReplyForm })}>{I18n.t("comments_helper.reply_link")}</a>
          <span className="divider">&nbsp;|&nbsp;</span>
        </span>
      );
    }

    return null;
  }

  renderVoteActionLinks() {
    const { comment, upVoteComment, downVoteComment } = this.props;

    if (comment.permissions.vote) {
      return (
        <span>
          <span className="in_favor">
            <a onClick={() => upVoteComment(comment.id)}><i className="icon-angle-up"></i></a>
            {comment.total_likes}
          </span>
          <span className="against">
            <a onClick={() => downVoteComment(comment.id)}><i className="icon-angle-down"></i></a>
            {comment.total_dislikes}
          </span>
        </span>
      );
    }

    return (
      <span>
        <span className="in_favor">
          <i className="icon-angle-up"></i>
          {comment.total_likes}
        </span>
        <span className="against">
          <i className="icon-angle-down"></i>
          {comment.total_dislikes}
        </span>
      </span>
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
        <span>
          &nbsp;&bull;&nbsp;
          <span className={cssClasses}>{text}</span>
        </span>
      );
    }
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    flagComment, 
    unFlagComment,
    upVoteComment,
    downVoteComment
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Comment);
