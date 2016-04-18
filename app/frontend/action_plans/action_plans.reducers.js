import { 
  FETCH_ACTION_PLANS, 
  APPEND_ACTION_PLANS_PAGE, 
} from './action_plans.actions';

export const actionPlans = function (state = [], action) {
  switch (action.type) {
    case FETCH_ACTION_PLANS:
      return action.payload.data.action_plans
    case APPEND_ACTION_PLANS_PAGE:
      return [
        ...state,
        ...action.payload.data.action_plans
      ];
  }
  return state;
}
