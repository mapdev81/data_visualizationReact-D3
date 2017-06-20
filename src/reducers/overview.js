import {
  GET_OVERVIEW_REQUEST, GET_OVERVIEW_SUCCESS, GET_OVERVIEW_FAILURE,
  INIT_APP_REQUEST, INIT_APP_SUCCESS, INIT_APP_FAILURE
} from '../actions/overview';

type InitState = {
  users: Object,
  buildings: Array<Object>,
  init: Object,
  isFectching: boolean,
  error: Object
};

const INITIAL_STATE: InitState = {
  users: null,
  buildings: [],
  init: null,
  isFetching: false,
  error: {}
};

export default function (state: Object = INITIAL_STATE, action: Object): Object {
  switch (action.type) {
    case INIT_APP_REQUEST:
    case GET_OVERVIEW_REQUEST:
      return Object.assign({}, state, {
        error: {},
        isFetching: true
      });

    case GET_OVERVIEW_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        buildings: action.response
      });

    case INIT_APP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        init: {
          knowledge: action.response.knowledge.reverse()
        }
      });

    case INIT_APP_FAILURE:
    case GET_OVERVIEW_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.response
      });

    default:
      return state;
  }
}
