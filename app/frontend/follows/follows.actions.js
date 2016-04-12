import axios from 'axios';

export const API_BASE_URL = '/api';
export const FETCH_FOLLOW = 'FETCH_FOLLOW';
export const FOLLOW       = 'FOLLOW';
export const UNFOLLOW     = 'UNFOLLOW';

export function fetchFollow({ followingId, followingType }) {
  const request = axios.get(`${API_BASE_URL}/follows.json?following[id]=${followingId}&following[type]=${followingType}`);

  return {
    type: FETCH_FOLLOW,
    payload: request
  };
}

export function follow({ followingId, followingType }) {
  const request = axios.post(`${API_BASE_URL}/follows.json`, { 
    following: {
      id: followingId, 
      type: followingType 
    }
  });

  return {
    type: FOLLOW,
    payload: request
  };
}

export function unFollow(followId) {
  const request = axios.delete(`${API_BASE_URL}/follows/${followId}.json`);

  return {
    type: UNFOLLOW,
    payload: request
  };
}
