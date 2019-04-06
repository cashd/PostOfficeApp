import { push } from 'connected-react-router'

export const SET_EMPLOYEE_INFO = 'empFacility/SET_EMPLOYEE_INFO';

const initialState = {
  id: null,
  isManager: null,
  facilityID: null,
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

