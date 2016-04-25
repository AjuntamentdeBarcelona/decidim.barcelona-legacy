import { Component } from 'react';

import AuthorAvatar  from '../application/author_avatar.component';

export default class Comment extends Component {
  render() {
    const { comment } = this.props;

    return (
      <div className="row">
        <div id={`comment_${comment.id}`} className="comment small-12 column">
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
          </div>
        </div>
        {this.renderChildren()}
      </div>
    );
  }

  renderChildren() {
    const { comment } = this.props;

    if (comment.children) {
      return (
        <div className="comment-children">
          {
            comment.children.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))
          }
        </div>
      );
    }

    return null;
  }
}
