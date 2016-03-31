import axios from 'axios';

import { API_BASE_URL } from '../proposals/proposals.actions';

export const FETCH_DISTRICTS  = 'FETCH_DISTRICTS';

export function fetchDistricts () {
  const request = axios.get(`${API_BASE_URL}/districts.json`);

  return {
    type: FETCH_DISTRICTS,
    payload: request
  };
}

