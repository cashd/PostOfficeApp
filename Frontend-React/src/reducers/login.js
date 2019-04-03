import { push } from 'connected-react-router'
import { apiPost } from '../utils/api'
import Cookie from 'js-cookie'

export const UPDATE_PASSWORD_FIELD = 'login/UPDATE_PASSWORD_FIELD';
export const UPDATE_EMAIL_FIELD = 'login/UPDATE_EMAIL_FIELD';
export const REQUEST_LOGIN = 'login/REQUEST_LOGIN';
export const LOGIN_FAILED = 'login/LOGIN_FAILED';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';

const initialState = {
    email: "",
    password: "",
    error: { is: false, msg: "" },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_FIELD:
      return {
        ...state,
        password: action.payload.password
      };
    case UPDATE_EMAIL_FIELD:
      return {
        ...state,
        email: action.payload.email
      };
    case REQUEST_LOGIN:
      return state;
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.payload.error
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
      };
    default:
      return state
  }
}

export const updatePasswordField = (password) => {
  return dispatch => {
    dispatch({ type: UPDATE_PASSWORD_FIELD, payload: { password:password } })
  }
};

export const updateEmailField = (email) => {
  return dispatch => {
    dispatch({ type: UPDATE_EMAIL_FIELD, payload: { email:email } })
  }
};

export const checkLoginCredentials = (email, password) => {
  return dispatch => {
    dispatch({ type: REQUEST_LOGIN });
    apiPost('/auth', { email: email, password: password })
      .then((respJSON) => {
        console.log(respJSON)
      if (respJSON["isAuth"]) {
        dispatch({ type: LOGIN_SUCCESS })
        Cookie.set('id', respJSON.id);
        Cookie.set('role', respJSON.role);
        console.log(Cookie.get('id'))
        console.log(Cookie.get('role'))
        dispatch(push('/'));
      } else {
         throw new Error('Invalid Credentials.')
      }
    })
      .catch((error) => {
        dispatch({ type: LOGIN_FAILED, payload: { error: { is: true, msg: error.message } } })
        })
  }
};
