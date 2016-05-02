import { 
  FETCH_DEBATE
} from './debates.actions';

import { 
  FETCH_COMMENTS, 
  APPEND_COMMENTS_PAGE, 
  ADD_NEW_COMMENT,
  FLAG_COMMENT,
  UNFLAG_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  HIDE_COMMENT,
  HIDE_COMMENT_AUTHOR
} from '../comments/comments.actions';

import { comments } from  '../comments/comments.reducers';

export const debate = function (state = {}, action) {
  switch (action.type) {
    case FETCH_DEBATE:
      let debate = action.payload.data.debate;

      return {
        ...debate,
        comments: state.comments
      }
    case FETCH_COMMENTS:
    case APPEND_COMMENTS_PAGE:
    case FLAG_COMMENT:
    case UNFLAG_COMMENT:
    case UPVOTE_COMMENT:
    case DOWNVOTE_COMMENT:
    case HIDE_COMMENT:
    case HIDE_COMMENT_AUTHOR:
      return {
        ...state,
        comments: comments(state.comments, action)
      };
    case ADD_NEW_COMMENT:
      let comment = action.payload.data.comment;

      return {
        ...state,
        total_comments: state.total_comments + 1,
        total_positive_comments: comment.alignment > 0 ? 
          state.total_positive_comments + 1 : state.total_positive_comments,
        total_negative_comments: comment.alignment < 0 ? 
          state.total_negative_comments + 1 : state.total_negative_comments,
        total_neutral_comments: comment.alignment === 0 ? 
          state.total_neutral_comments + 1 : state.total_neutral_comments,
        comments: comments(state.comments, action)
      };
    default:
      return state;
  }
}
