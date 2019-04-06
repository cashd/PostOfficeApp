import { List } from 'immutable'

export const SET_EMPLOYEE_INFO = 'manager/SET_EMPLOYEE_INFO';
export const GET_EMPLOYEES = 'manager/GET_EMPLOYEES';

const initialState = {
  id: null,
  isManager: null,
  facilityID: null,
  employees: List([]),
  newEmp: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEE_INFO:
      return {
        id: action.payload.id,
        isManager: action.payload.isManager,
        facilityID: action.payload.facilityID,
      };
    default:
      return state
  }
}

export const setEmployeeInfo = (info) => {
  return dispatch => {
    dispatch({ type: SET_EMPLOYEE_INFO, payload: info })
  }
};

