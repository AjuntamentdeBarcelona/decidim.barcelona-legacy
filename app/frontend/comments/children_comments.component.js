import { Component } from 'react';

import Comment from './comment.component';

export default class ChildrenComments extends Component {
  render() {
    const { 
      comment, 
      commentableId, 
      commentableType, 
      commentableAuthorId, 
      commentableArguable 
    } = this.props;

    if (comment.children) {
      return (
        <div className="comment-children">
          {
            comment.children.map(comment => (
              <Comment 
                key={comment.id} 
                comment={comment} 
                commentableId={commentableId}
                commentableType={commentableType}
                commentableArguable={commentableArguable}
                commentableAuthorId={commentableAuthorId} />
            ))
          }
        </div>
      );
    }

    return null;
  }
}
