import { SET_FILTER_TEXT, SET_FILTER_GROUP } from './filters.actions';

export default function (state = getInitialFiltersState(), action) {
  switch(action.type) {
    case SET_FILTER_TEXT:
      return {
        ...state,
        text: action.text
      };
    case SET_FILTER_GROUP:
      let filter = state.filter;

      filter[action.name] = action.value;

      if (action.name === 'category_id') {
        filter["subcategory_id"] = []
      }

      return {
        ...state,
        filter
      };
  }
  return state;
}

function getInitialFiltersState() {
  let filters = {
        filter: {}
      },
      matchData;

  matchData = location.search.match(/filter=([^&]*)/)

  if (matchData) {
    let filterData = matchData[1].split(":");

    filterData.map(function (data) {
      let [name, values] = data.split("=");

      values = values.split(",");

      if (name !== "scope" && name !== "other" && name !== "source") {
        values = values.map((x) => parseInt(x, 10));
      }

      filters.filter[name] = values;
    });
  }

  matchData = location.search.match(/search=([^&]*)/)

  if (matchData) {
    filters.text = matchData[1];
  }

  return filters;
}
