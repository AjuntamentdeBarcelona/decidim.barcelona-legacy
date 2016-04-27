import { Component }          from 'react';
import classNames             from 'classnames';

import UserAvatar             from '../application/user_avatar.component';
import ChildrenComments       from './children_comments.component';
import NewCommentForm         from './new_comment_form.component';

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showReplyForm: false
    };
  }

  render() {
    const { comment, commentable } = this.props;
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
          <UserAvatar user={author} as={as} />
          <div className="comment-body">
            <div className="comment-info">
              <span className="user-name"><a href={`/users/${author.id}`}>{author.name}</a></span>
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
                <span className="in_favor">
                  <i className="icon-angle-up"></i>
                  {comment.total_likes}
                </span>
                <span className="against">
                  <i className="icon-angle-down"></i>
                  {comment.total_dislikes}
                </span>
              </span>
              {I18n.t("comments.comment.responses", { count: comment.children ? comment.children.length : 0 })}
              <span className="divider">&nbsp;|&nbsp;</span>
              <a onClick={() => this.setState({showReplyForm: !this.state.showReplyForm })}>{I18n.t("comments_helper.reply_link")}</a>
              <NewCommentForm 
                commentable={commentable}
                visible={this.state.showReplyForm} 
                parent={comment} />
            </div>
          </div>
          <ChildrenComments comment={comment} commentable={commentable} />
        </div>
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
        <span>
          &nbsp;&bull;&nbsp;
          <span className={cssClasses}>{text}</span>
        </span>
      );
    }
    return null;
  }
}
