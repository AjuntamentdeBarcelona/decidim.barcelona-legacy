import axios from 'axios';

export const API_BASE_URL         = '/api';
export const FETCH_COMMENTS       = 'FETCH_COMMENTS';
export const APPEND_COMMENTS_PAGE = 'APPEND_COMMENTS_PAGE';
export const ADD_NEW_COMMENT      = 'ADD_NEW_COMMENT';

export function fetchComments({ commentableId, commentableType }) {
  const request = 
    axios.get(baseCommentableUrl({ commentableId, commentableType }));

  return {
    type: FETCH_COMMENTS,
    payload: request
  };
}

export function appendCommentsPage({ commentableId, commentableType, page }) {
  const request = 
    axios.get(`${baseCommentableUrl({ commentableId, commentableType })}&page=${page}`);

  return {
    type: APPEND_COMMENTS_PAGE,
    payload: request
  };
}

export function addNewComment({ commentableId, commentableType, comment, body }) {
  const request = 
    axios.post(baseCommentableUrl({ commentableId, commentableType }), {
      comment: {
        body,
        parent_id: comment && comment.id
      }
    });

  return {
    type: ADD_NEW_COMMENT,
    payload: request
  };
}

function baseCommentableUrl({ commentableId, commentableType }) {
  return `${API_BASE_URL}/comments.json?commentable[id]=${commentableId}&commentable[type]=${commentableType}`
}
