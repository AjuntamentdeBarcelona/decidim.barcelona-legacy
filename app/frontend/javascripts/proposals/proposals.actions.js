export const FETCH_DISTRICTS = 'FETCH_DISTRICTS';

export function fetchDistricts () {
  const request = $.ajax('/api/districts.json');

  return {
    type: FETCH_DISTRICTS,
    payload: request
  };
}
