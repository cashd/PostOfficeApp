import { combineReducers } from 'redux'
import login from './login'
import home from './home'
import signup from './signup'
import customer from './customer'


export default combineReducers({
  login,
  home,
  signup,
  customer
})
