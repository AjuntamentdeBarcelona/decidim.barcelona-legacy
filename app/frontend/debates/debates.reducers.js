import { combineReducers } from 'redux';

import { FETCH_DEBATE }    from './debates.actions';
import { ADD_NEW_COMMENT } from '../comments/comments.actions';

import { comments }        from '../comments/comments.reducers';

export const debate = function (state = {}, action) {
  let debate, comment;

  switch (action.type) {
    case FETCH_DEBATE:
      debate = action.payload.data.debate;

      return {
        ...debate,
        comments: state.comments
      }
    case ADD_NEW_COMMENT:
      comment = action.payload.data.comment;

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
      return {
        ...state,
        ...combineReducers({ 
          comments 
        })({ 
          comments: state.comments 
        }, action)
      };
  }
}
