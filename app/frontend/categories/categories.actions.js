import { Promise }      from 'es6-promise';
import axios            from 'axios';
import { API_BASE_URL } from '../proposals/proposals.actions';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function fetchCategories () {
  const promise =  new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/categories.json`).then(({ data }) => {
      let { categories } = data;

      axios.get(`${API_BASE_URL}/subcategories.json`).then(({ data }) => {
        let { subcategories } = data;

        categories = categories.map(category => ({
          ...category,
          subcategories: subcategories.filter(sc => sc.category_id === category.id)
        }));

        resolve({ categories });
      }, reject);
    }, reject);
  });

  return {
    type: FETCH_CATEGORIES,
    payload: promise
  };
}
