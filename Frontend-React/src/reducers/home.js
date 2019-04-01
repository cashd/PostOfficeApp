import { push } from 'connected-react-router'
import Cookie from 'js-cookie'

export const FETCH_ROLE_COOKIE = 'home/FETCH_ROLE_COOKIE';
export const SET_ROLE_COOKIE = 'home/SET_ROLE_COOKIE';
export const FAIL_ROLE_COOKIE = 'home/FAIL_ROLE_COOKIE';

const initialState = {
  role: "",
  errorMsg: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLE_COOKIE:
      return state;
    case SET_ROLE_COOKIE:
      return {
        ...state,
        role: action.payload.role
      };
    case FAIL_ROLE_COOKIE:
      return state;
    default:
      return state
  }
}

export const getRoleCookie = () => {
    console.log('here')
    return dispatch => {
        dispatch({ type: FETCH_ROLE_COOKIE })
        const roleCookie = Cookie.get('role')
        if (roleCookie) {
            dispatch({ type: SET_ROLE_COOKIE, payload: { role: roleCookie } })
        } else {
            dispatch({ type: FAIL_ROLE_COOKIE })
            dispatch(push('/login'))
        }
    }
};
