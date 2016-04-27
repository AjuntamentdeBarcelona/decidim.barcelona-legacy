import { 
  FETCH_COMMENTS, 
  APPEND_COMMENTS_PAGE, 
  ADD_NEW_COMMENT,
  FLAG_COMMENT,
  UNFLAG_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT
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
          ...state
      ];
    case FLAG_COMMENT:
    case UNFLAG_COMMENT:
    case UPVOTE_COMMENT:
    case DOWNVOTE_COMMENT:
      return state.map(c => comment(c, action));
    default:
      return state;
  }
}

export const comment = function (state = {}, action) {
  switch (action.type) {
    case FLAG_COMMENT:
    case UNFLAG_COMMENT:
    case UPVOTE_COMMENT:
    case DOWNVOTE_COMMENT:
      let comment = action.payload.data.comment;

      if (comment.id === state.id) {
        return {
          ...state,
          flagged: comment.flagged,
          total_likes: comment.total_likes,
          total_dislikes: comment.total_dislikes,
          total_votes: comment.total_votes
        };
      }
      return state;
    default:
      return state;
  }
}
