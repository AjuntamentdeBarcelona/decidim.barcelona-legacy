import axios from 'axios';

export const API_BASE_URL = '/api';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

export function fetchComments({ commentableId, commentableType }) {
  const request = axios.get(`${API_BASE_URL}/comments.json?commentable[id]=${commentableId}&commentable[type]=${commentableType}`);

  return {
    type: FETCH_COMMENTS,
    payload: request
  };
}
