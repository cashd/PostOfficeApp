import { push } from 'connected-react-router'
import Cookie from 'js-cookie'

export const GET_COOKIES = 'employeeHome/GET_COOKIES';
export const FAIL_COOKIE = 'employee/ERROR';

const initialState = {
  id: null,
  role: null,
  isManager: null,
  truckID: null,
  facilityID: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COOKIES:
      return {
        id: action.payload.id,
        role: action.payload.role,
        isManager: action.payload.isManager ? action.payload.isManager : null,
        truckID: action.payload.truckID ? action.payload.truckID : null,
        facilityID: action.payload.facilityID ? action.payload.facilityID : null,
      };
    case FAIL_COOKIE:
      return state;
    default:
      return state
  }
}

export const getRoleCookie = () => {
    return dispatch => {
        const role = Cookie.get('role');
        const id = Cookie.get('id');
        if (id && role) {
          const cookies = {
            isManager: Cookie.get('isManager'),
            truckID: Cookie.get('truckID'),
            facilityID: Cookie.get('facilityID'),
            id: id,
            role: role
          };
          dispatch({ type: GET_COOKIES, payload: cookies })
        } else {
          dispatch(push('/login'))
        }
    }
};
