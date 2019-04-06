import { List } from 'immutable'
import { apiPost } from '../utils/api';

export const SET_EMPLOYEE_INFO = 'manager/SET_EMPLOYEE_INFO';
export const GET_EMPLOYEES = 'manager/GET_EMPLOYEES';
export const ERROR = 'manager/ERROR';

const initialState = {
  id: null,
  isManager: null,
  facilityID: null,
  employees: List([]),
  newEmp: {},
  error: { is: false, message: '' }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEE_INFO:
      return {
        ...state,
        id: action.payload.id,
        isManager: action.payload.isManager,
        facilityID: action.payload.facilityID,
      };
    case ERROR:
      return {
        ...state,
        error: { is: true, message: action.payload.message }
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: List(action.payload.employees)
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

export const getEmployees = (payload) => {
  console.log('sssssssssssssss')
  return dispatch => {
    apiPost('/facility/employees', payload)
      .then((resp) => {
        console.log(resp)
        dispatch({ type: GET_EMPLOYEES, payload: { employees: resp.employees } })
      })
      .catch((error) => {
        updateError(error.message)
      })
  }
};

export const updateError = (message) => {
  return dispatch => {
    dispatch({ type: ERROR, payload: { message: message } })
  }
};

