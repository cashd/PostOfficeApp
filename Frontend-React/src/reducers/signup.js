import { push } from 'connected-react-router'
import { apiPost } from '../utils/api';

export const UPDATE_PASSWORD_FIELD = 'signup/UPDATE_PASSWORD_FIELD';
export const UPDATE_EMAIL_FIELD = 'signup/UPDATE_EMAIL_FIELD';
export const UPDATE_ADDRESS_FIELD = 'signup/UPDATE_ADDRESS_FIELD';
export const UPDATE_ADDRESS2_FIELD = 'signup/UPDATE_ADDRESS2_FIELD';
export const UPDATE_STATE_FIELD = 'signup/UPDATE_STATE_FIELD';
export const UPDATE_ZIP_FIELD = 'signup/UPDATE_ZIP_FIELD';
export const UPDATE_CITY_FIELD = 'signup/UPDATE_CITY_FIELD';
export const UPDATE_FIRST_NAME_FIELD = 'signup/UPDATE_FIRST_NAME_FIELD';
export const UPDATE_LAST_NAME_FIELD = 'signup/UPDATE_LAST_NAME_FIELD';
export const SIGNUP_REQUEST = 'signup/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'signup/SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'signup/SIGNUP_FAILED';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  address: "",
  address2: "",
  city: "",
  stateUS: "Choose...",
  zip: "",
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
    case UPDATE_ADDRESS_FIELD:
        return {
          ...state,
          address: action.payload.address,
        };
    case UPDATE_ADDRESS2_FIELD:
      return {
        ...state,
        address2: action.payload.address2,
      };
    case UPDATE_STATE_FIELD:
      return {
        ...state,
        stateUS: action.payload.stateUS,
      };
    case UPDATE_CITY_FIELD:
      return {
        ...state,
        city: action.payload.city,
      };
    case UPDATE_ZIP_FIELD:
      return {
        ...state,
        zip: action.payload.zip,
      };
    case UPDATE_FIRST_NAME_FIELD:
      return {
        ...state,
        firstName: action.payload.firstName,
      };
    case UPDATE_LAST_NAME_FIELD:
      return {
        ...state,
        lastName: action.payload.lastName,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        error: action.payload.error
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
      };
    default:
      return state
  }
}

export const updatePasswordField = (password) => {
  return dispatch => {
    dispatch({ type: UPDATE_PASSWORD_FIELD, payload: { password: password } })
  }
};

export const updateEmailField = (email) => {
  return dispatch => {
    dispatch({ type: UPDATE_EMAIL_FIELD, payload: { email: email } })
  }
};

export const updateAddressField = (address) => {
  return dispatch => {
    dispatch({ type: UPDATE_ADDRESS_FIELD, payload: { address: address } })
  }
};

export const updateAddress2Field = (address2) => {
  return dispatch => {
    dispatch({ type: UPDATE_ADDRESS2_FIELD, payload: { address2: address2 } })
  }
};

export const updateStateField = (state) => {
  return dispatch => {
    dispatch({ type: UPDATE_STATE_FIELD, payload: { stateUS: state } })
  }
};

export const updateZipField = (zip) => {
  return dispatch => {
    dispatch({ type: UPDATE_ZIP_FIELD, payload: { zip: zip } })
  }
};

export const updateCityField = (city) => {
  return dispatch => {
    dispatch({ type: UPDATE_CITY_FIELD, payload: { city: city } })
  }
};

export const updateFirstNameField = (name) => {
  return dispatch => {
    dispatch({ type: UPDATE_FIRST_NAME_FIELD, payload: { firstName: name } })
  }
};

export const updateLastNameField = (name) => {
  return dispatch => {
    dispatch({ type: UPDATE_LAST_NAME_FIELD, payload: { lastName: name } })
  }
};

export const submit = (customer) => {
  return dispatch => {
    dispatch({ type: SIGNUP_REQUEST })
    apiPost('/signup/customer', customer)
      .then(respJSON => {
        console.log(respJSON)
        if (respJSON.success) {
          dispatch({ type: SIGNUP_SUCCESS })
          dispatch(push('/'))
        } else {
          throw new Error('Could not signup!')
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: SIGNUP_FAILED, payload: { is: true, msg: error.message } })
      })
  }
};
