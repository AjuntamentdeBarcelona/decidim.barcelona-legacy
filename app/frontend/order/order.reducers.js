import { SET_ORDER } from './order.actions';

export default function (state = getInitialOrderState(), action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
  }
  return state;
}

function getInitialOrderState() {
  let order = "random",
      matchData;

  matchData = location.search.match(/order=([^&]*)/)

  if (matchData) {
    order = matchData[1];
  }

  return order;
}

