import { apiPost } from '../utils/api'
import { List, Map } from 'immutable'

export const PACKAGES_REQUEST = 'customer/PACKAGES_REQUEST';
export const PACKAGES_SUCCESS = 'customer/PACKAGES_SUCCESS';
export const PACKAGES_FAILED = 'customer/PACKAGES_FAILED';
export const CHANGE_NEW_PACKAGE_VIEW = 'customer/CHANGE_NEW_PACKAGE_VIEW';
export const NEW_PACKAGE_SUCCESS = 'customer/NEW_PACKAGE_SUCCESS';
export const ERROR = 'customer/ERROR';
export const UPDATE_NEW_PACKAGE_EMAIL = 'customer/UPDATE_NEW_PACKAGE_EMAIL';
export const UPDATE_NEW_PACKAGE_ADDRESS = 'customer/UPDATE_NEW_PACKAGE_ADDRESS';
export const UPDATE_NEW_PACKAGE_WEIGHT = 'customer/UPDATE_NEW_PACKAGE_WEIGHT';
export const UPDATE_NEW_PACKAGE_DROPOFF = 'customer/UPDATE_NEW_PACKAGE_DROPOFF';
export const GET_STATE_FACILITES = 'customer/GET_STATE_FACILITES';

const initialState = {
  packages: List([]),
  newPackageViewStatus: false,
  error: { is: false, msg: '' },
  newPackEmail: '',
  newPackAddress: '',
  newPackWeight: 0,
  newPackDropOff: {},
  stateFacilities: Map({})
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PACKAGES_SUCCESS:
      return {
        ...state,
        packages: action.payload.packages
      };
    case CHANGE_NEW_PACKAGE_VIEW:
      return {
        ...state,
        newPackageViewStatus: action.payload.status
      };
    case ERROR:
      return {
        ...state,
        error: action.payload.error
      };
    case UPDATE_NEW_PACKAGE_ADDRESS:
      return {
        ...state,
        newPackAddress: action.payload.address
      };
    case UPDATE_NEW_PACKAGE_EMAIL:
      return {
        ...state,
        newPackEmail: action.payload.email
      };
    case UPDATE_NEW_PACKAGE_WEIGHT:
      return {
        ...state,
        newPackWeight: action.payload.weight
      };
    case UPDATE_NEW_PACKAGE_DROPOFF:
      return {
        ...state,
        newPackDropOff: action.payload.dropoff
      };
    case GET_STATE_FACILITES:
      return {
        ...state,
        stateFacilities: action.payload.fac
      };
    default:
      return state
  }
}

export const getPackages = (id) => {
  return dispatch =>{
    console.log('asdfasdfasdf')
    dispatch({ type: PACKAGES_REQUEST })
    apiPost('/customer/packages', { id: id })
      .then((respJSON) => {
        dispatch({ type: PACKAGES_SUCCESS, payload: { packages: respJSON.packages } })
      })
  }
};

export const changeNewPackageView = (status) => {
  return dispatch => {
    dispatch({ type: CHANGE_NEW_PACKAGE_VIEW, payload: { status: !status } })
  }
};

export const newPackage = (info) => {
  return dispatch => {
    apiPost('/customer/newPackage', info)
      .then((respJSON) => {
        if (respJSON.success) {
          dispatch({ type: NEW_PACKAGE_SUCCESS })
          window.location.reload()
        } else {
          changeNewPackageView(true)
          throw new Error('Could not make new package')
        }
      })
      .catch((error) => {
        dispatch({ type: ERROR, payload: { error: { is: true, msg: error.message } } })
      })
  }
};

export const updateNewPackageEmail = (email) => {
  return dispatch => {
    dispatch({ type: UPDATE_NEW_PACKAGE_EMAIL, payload: { email: email } })
  }
};

export const updateNewPackageAddress = (address) => {
  return dispatch => {
    dispatch({ type: UPDATE_NEW_PACKAGE_ADDRESS, payload: { address: address } })
  }
};

export const updateNewPackageWeight= (weight) => {
  return dispatch => {
    dispatch({ type: UPDATE_NEW_PACKAGE_WEIGHT, payload: { weight: weight } })
  }
};

export const updateNewPackageDropOff = (dropoff) => {
  return dispatch => {
    dispatch({ type: UPDATE_NEW_PACKAGE_DROPOFF, payload: { dropoff: dropoff} })
  }
};

const transformFacilitiesToMap = (fac) => {
  let obj = {};
  fac.forEach((f) => {
    obj[f.address] = f.id;
  });
  console.log(obj);
  return Map(obj);
};

export const getStateFacilities = (id) => {
  return dispatch => {
      apiPost('/facility/state', { id: id})
        .then((resp) => {
          dispatch({ type: GET_STATE_FACILITES, payload: { fac: transformFacilitiesToMap(resp.facilities) } })
        })
    .catch((error) => {
        dispatch({ type: ERROR, payload: { error: { is: true, msg: error.message } } })
      })
  }
};
