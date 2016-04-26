import { Component } from 'react';
import classNames    from 'classnames';

import AuthorAvatar  from '../application/author_avatar.component';

export default class Comment extends Component {
  render() {
    const { comment, commentableAuthorId } = this.props;
    const { alignment, user_id } = comment;

    const cssClasses = classNames(
      'comment',
      'small-12',
      'column',
      {
        negative: alignment < 0,
        neutral: alignment === 0,
        positive: alignment > 0,
        'comment-author': user_id === commentableAuthorId
      }
    );

    return (
      <div className="row">
        <div id={`comment_${comment.id}`} className={cssClasses}>
          <AuthorAvatar author={{name: comment.author_name}} />
          <div className="comment-body">
            <div className="comment-info">
              <span className="user-name">{comment.author_name}</span>
              &nbsp;&bull;&nbsp;
              <time>{comment.created_at}</time>
            </div>
            <div className="comment-user">
              { comment.body }
            </div>
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
            </div>
          </div>
          {this.renderChildren()}
        </div>
      </div>
    );
  }

  renderChildren() {
    const { comment, commentableAuthorId } = this.props;

    if (comment.children) {
      return (
        <div className="comment-children">
          {
            comment.children.map(comment => (
              <Comment 
                key={comment.id} 
                comment={comment} 
                commentableAuthorId={commentableAuthorId} />
            ))
          }
        </div>
      );
    }

    return null;
  }
}
//<span>
//  <%= t('comments.comment.votes', count: comment.total_votes) %>
//</span>
//&nbsp;|&nbsp;
//<span class="in_favor">
//  <% if can?(:vote, comment) %>
//    <%= link_to vote_comment_path(comment, value: 'yes'),
//        method: "post", remote: true do %>
//        <i class="icon-angle-up"></i>
//    <% end %>
//  <% else %>
//    <i class="icon-angle-up"></i>
//  <% end %>
//  <%= comment.total_likes %>
//</span>
//
//<span class="against">
//  <% if can?(:vote, comment) %>
//    <%= link_to vote_comment_path(comment, value: 'no'),
//        method: "post", remote: true do %>
//        <i class="icon-angle-down"></i>
//    <% end %>
//  <% else %>
//    <i class="icon-angle-down"></i>
//  <% end %>
//  <%= comment.total_dislikes %>
//</span>
//
//            <%= t("comments.comment.responses", count: comment.children.size) %>
//
//            <% if user_signed_in? %>
//              <span class="divider">&nbsp;|&nbsp;</span>
//              <%= link_to(comment_link_text(comment), "",
//                          class: "js-add-comment-link", data: {'id': dom_id(comment)}) %>
//
//              <%= render 'comments/actions', comment: comment %>
//
//              <%= render 'comments/form', {commentable: comment.commentable, parent_id: comment.id, toggeable: true} %>
//            <% end %>
//          </div>
