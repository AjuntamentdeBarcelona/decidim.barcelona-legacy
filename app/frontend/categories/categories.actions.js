import axios            from 'axios';
import { API_BASE_URL } from '../proposals/proposals.actions';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function fetchCategories () {
  const request = axios.get(`${API_BASE_URL}/categories.json`);

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}
