import axios from 'axios';

export const API_BASE_URL         = '/api';
export const FETCH_COMMENTS       = 'FETCH_COMMENTS';
export const APPEND_COMMENTS_PAGE = 'APPEND_COMMENTS_PAGE';
export const ADD_NEW_COMMENT      = 'ADD_NEW_COMMENT';
export const FLAG_COMMENT         = 'FLAG_COMMENT';
export const UNFLAG_COMMENT       = 'UNFLAG_COMMENT';
export const UPVOTE_COMMENT       = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT     = 'DOWNVOTE_COMMENT';

export function fetchComments({ id, type }, { order }) {
  const request = 
    axios.get(`${baseCommentableUrl({ id, type })}&order=${order}`);

  return {
    type: FETCH_COMMENTS,
    payload: request
  };
}

export function appendCommentsPage({ id, type }, { order, page }) {
  const request = 
    axios.get(`${baseCommentableUrl({ id, type })}&order=${order}&page=${page}`);

  return {
    type: APPEND_COMMENTS_PAGE,
    payload: request
  };
}

export function addNewComment({ id, type }, { parent, newComment }) {
  const request = 
    axios.post(baseCommentableUrl({ id, type }), {
      comment: {
        ...newComment,
        parent_id: parent && parent.id
      }
    });

  return {
    type: ADD_NEW_COMMENT,
    payload: request
  };
}

export function flagComment(commentId) {
  const request = axios.patch(`${API_BASE_URL}/comments/${commentId}/flag.json`);

  return {
    type: FLAG_COMMENT,
    payload: request
  };
}

export function unFlagComment(commentId) {
  const request = axios.patch(`${API_BASE_URL}/comments/${commentId}/unflag.json`);

  return {
    type: UNFLAG_COMMENT,
    payload: request
  };
}

export function upVoteComment(commentId) {
  const request = axios.patch(`${API_BASE_URL}/comments/${commentId}/upvote.json`);

  return {
    type: UPVOTE_COMMENT,
    payload: request
  };
}

export function downVoteComment(commentId) {
  const request = axios.patch(`${API_BASE_URL}/comments/${commentId}/downvote.json`);

  return {
    type: DOWNVOTE_COMMENT,
    payload: request
  };
}


function baseCommentableUrl({ id, type }) {
  return `${API_BASE_URL}/comments.json?commentable[id]=${id}&commentable[type]=${type}`
}
