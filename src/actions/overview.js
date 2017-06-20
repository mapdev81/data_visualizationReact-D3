import { CALL_API } from './../middleware/api';

export const GET_OVERVIEW_REQUEST: string = 'GET_OVERVIEW_REQUEST';
export const GET_OVERVIEW_SUCCESS: string = 'GET_OVERVIEW_SUCCESS';
export const GET_OVERVIEW_FAILURE: string = 'GET_OVERVIEW_FAILURE';

export function fetchOverview(): Object {
  return {
    [CALL_API]: {
      types: [GET_OVERVIEW_REQUEST, GET_OVERVIEW_SUCCESS, GET_OVERVIEW_FAILURE],
      endpoint: '/buildings',
      method: 'get'
    }
  };
}

export const INIT_APP_REQUEST: string = 'INIT_APP_REQUEST';
export const INIT_APP_SUCCESS: string = 'INIT_APP_SUCCESS';
export const INIT_APP_FAILURE: string = 'INIT_APP_FAILURE';

export function initApp(): Object {
  return {
    [CALL_API]: {
      types: [INIT_APP_REQUEST, INIT_APP_SUCCESS, INIT_APP_FAILURE],
      endpoint: '/init',
      method: 'get'
    }
  };
}
