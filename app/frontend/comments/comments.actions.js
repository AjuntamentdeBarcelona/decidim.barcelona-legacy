import axios from 'axios';

export const API_BASE_URL         = '/api';
export const FETCH_COMMENTS       = 'FETCH_COMMENTS';
export const APPEND_COMMENTS_PAGE = 'APPEND_COMMENTS_PAGE';
export const ADD_NEW_COMMENT      = 'ADD_NEW_COMMENT';

export function fetchComments({ id, type }) {
  const request = 
    axios.get(baseCommentableUrl({ id, type }));

  return {
    type: FETCH_COMMENTS,
    payload: request
  };
}

export function appendCommentsPage({ id, type }, { page }) {
  const request = 
    axios.get(`${baseCommentableUrl({ id, type })}&page=${page}`);

  return {
    type: APPEND_COMMENTS_PAGE,
    payload: request
  };
}

export function addNewComment({ id, type }, { parent, body }) {
  const request = 
    axios.post(baseCommentableUrl({ id, type }), {
      comment: {
        body,
        parent_id: parent && parent.id
      }
    });

  return {
    type: ADD_NEW_COMMENT,
    payload: request
  };
}

function baseCommentableUrl({ id, type }) {
  return `${API_BASE_URL}/comments.json?commentable[id]=${id}&commentable[type]=${type}`
}
