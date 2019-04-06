// import { List } from 'immutable'
// import { apiPost } from '../utils/api';
//
// export const SET_EMPLOYEE_INFO = 'manager/SET_EMPLOYEE_INFO';
// export const GET_EMPLOYEES = 'manager/GET_EMPLOYEES';
// export const ERROR = 'manager/ERROR';
// export const SHOW_NEW_EMP = 'manager/SHOW_NEW_EMP';
// export const UPDATE_NEW_EMP_FIRST_NAME = 'manager/UPDATE_NEW_EMP';
// export const UPDATE_NEW_EMP_LAST_NAME = 'manager/UPDATE_NEW_EMP_LAST_NAME';
// export const UPDATE_NEW_EMP_WORK_EMAIL = 'manager/UPDATE_NEW_EMP_WORK_EMAIL';
// export const UPDATE_NEW_EMP_PASSWORD = 'manager/UPDATE_NEW_EMP_PASSWORD';
// export const UPDATE_NEW_EMP_POSITION = 'manager/UPDATE_NEW_EMP_POSITION';
// export const UPDATE_NEW_EMP_SALARY= 'manager/UPDATE_NEW_EMP_SALARY';
// export const UPDATE_NEW_EMP_WORK_PHONE= 'manager/UPDATE_NEW_EMP_WORK_PHONE';
//
// const initialState = {
//   id: null,
//   isManager: null,
//   facilityID: null,
//   employees: List([]),
//   newEmp: {
//     firstName: '',
//     lastName: '',
//     workEmail: '',
//     password: '',
//     position: '',
//     salary: 0,
//     workPhone: '',
//   },
//   showNewEmp: false,
//   error: { is: false, message: '' }
// };
//
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case SET_EMPLOYEE_INFO:
//       return {
//         ...state,
//         id: action.payload.id,
//         isManager: action.payload.isManager,
//         facilityID: action.payload.facilityID,
//       };
//     case ERROR:
//       return {
//         ...state,
//         error: { is: true, message: action.payload.message }
//       };
//     case GET_EMPLOYEES:
//       return {
//         ...state,
//         employees: List(action.payload.employees)
//       };
//     case UPDATE_NEW_EMP_FIRST_NAME:
//       return {
//         ...state,
//         newEmp: action.payload.newEmp
//       };
//     case SHOW_NEW_EMP:
//       return {
//         ...state,
//         showNewEmp: action.payload.status
//       };
//     default:
//       return state
//   }
// }
//
// export const setEmployeeInfo = (info) => {
//   return dispatch => {
//     dispatch({ type: SET_EMPLOYEE_INFO, payload: info })
//   }
// };
//
// export const getEmployees = (payload) => {
//   return dispatch => {
//     apiPost('/facility/employees', payload)
//       .then((resp) => {
//         console.log(resp)
//         if (resp.message) {
//           updateError(resp.message)
//         }
//         dispatch({ type: GET_EMPLOYEES, payload: { employees: resp.employees } })
//       })
//       .catch((error) => {
//         updateError(error.message)
//       })
//   }
// };
//
// export const updateError = (message) => {
//   return dispatch => {
//     dispatch({ type: ERROR, payload: { message: message } })
//   }
// };
//
// export const updateEmpFirstName = (value) => {
//   return dispatch => {
//     dispatch({ type: UPDATE_NEW_EMP, payload: { newEmp: emp  } })
//   }
// };
//
// export const changeNewEmpView= (status) => {
//   return dispatch => {
//     dispatch({ type: SHOW_NEW_EMP, payload: { status: !status } })
//   }
// };
//
