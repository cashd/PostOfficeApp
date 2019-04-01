import { combineReducers } from 'redux'
import login from './login'
import home from './home'
import signup from './signup'


export default combineReducers({
  login,
  home,
  signup
})
