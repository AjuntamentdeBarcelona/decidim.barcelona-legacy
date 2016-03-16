const API_BASE_URL            = '/api';

export const FETCH_DISTRICTS  = 'FETCH_DISTRICTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function fetchDistricts () {
  const request = $.ajax(`${API_BASE_URL}/districts.json`);

  return {
    type: FETCH_DISTRICTS,
    payload: request
  };
}

export function fetchCategories () {
  const request = $.ajax(`${API_BASE_URL}/categories.json`);

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}
