import { Promise }      from 'es6-promise';
import axios            from 'axios';
import { API_BASE_URL } from '../proposals/proposals.actions';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export const fetchCategories = () => (dispatch, getState) => {
  const { participatoryProcessId } = getState();
  const promise =  new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/categories.json?participatory_process_id=${participatoryProcessId}`).then(({ data }) => {
      let { categories } = data;

      axios.get(`${API_BASE_URL}/subcategories.json?participatory_process_id=${participatoryProcessId}`).then(({ data }) => {
        let { subcategories } = data;

        categories = categories.map(category => ({
          ...category,
          subcategories: subcategories.filter(sc => sc.category_id === category.id)
        }));

        resolve({ categories });
      }, reject);
    }, reject);
  });

  dispatch({
    type: FETCH_CATEGORIES,
    payload: promise
  });

  return promise;
}
