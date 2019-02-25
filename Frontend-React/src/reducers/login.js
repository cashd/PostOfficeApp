export const UPDATE_PASSWORD_FIELD = 'login/UPDATE_PASSWORD_FIELD';
export const UPDATE_EMAIL_FIELD = 'login/UPDATE_EMAIL_FIELD';
export const REQUEST_LOGIN = 'login/REQUEST_LOGIN';
export const LOGIN_FAILED = 'login/LOGIN_FAILED';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';

const initialState = {
  email: "",
  password: "",
  errorMsg: "",
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
        errorMsg: action.payload.errorMsg
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

    // Check email and password not null
    // Check email regex
    fetch('http://api.team9postoffice.ga/auth', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    }).then(resp => resp.json()).then(resp => console.log(resp))
  }
};