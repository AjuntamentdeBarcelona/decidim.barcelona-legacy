import { SET_ORDER } from './order.actions';

export default function (state = '', action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
  }
  return state;
}

export function getOrderByUrl() {
  let order = "",
      matchData;

  matchData = location.search.match(/order=([^&]*)/)

  if (matchData) {
    order = matchData[1];
  }

  return order;
}

