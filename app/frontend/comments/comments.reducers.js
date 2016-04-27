import { 
  FETCH_COMMENTS, 
  APPEND_COMMENTS_PAGE, 
  ADD_NEW_COMMENT,
  FLAG_COMMENT,
  UNFLAG_COMMENT
} from '../comments/comments.actions';

export const comments = function (state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload.data.comments;
    case APPEND_COMMENTS_PAGE:
      return [
        ...state,
        ...action.payload.data.comments
      ];
    case ADD_NEW_COMMENT:
      return [
          action.payload.data.comment,
          ...state.comments
      ];
    case FLAG_COMMENT:
    case UNFLAG_COMMENT:
      return state.map(c => comment(c, action));
    default:
      return state;
  }
}

export const comment = function (state = {}, action) {
  switch (action.type) {
    case FLAG_COMMENT:
    case UNFLAG_COMMENT:
      let comment = action.payload.data.comment;

      if (comment.id === state.id) {
        return {
          ...state,
          flagged: comment.flagged
        };
      }

      return state;
    default:
      return state;
  }
}
