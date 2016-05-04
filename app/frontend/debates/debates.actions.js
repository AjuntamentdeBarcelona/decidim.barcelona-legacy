import axios from 'axios';

export const API_BASE_URL = '/api';
export const FETCH_DEBATE = 'FETCH_DEBATE';

export function fetchDebate(debateId) {
  const request = axios.get(`${API_BASE_URL}/debates/${debateId}.json`);

  return {
    type: FETCH_DEBATE,
    payload: request
  };
}
