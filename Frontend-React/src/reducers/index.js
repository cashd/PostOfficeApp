import { combineReducers } from 'redux'
import login from './login'
import home from './home'
import signup from './signup'
import employeeHome from './employeeHome'
import empFacility from './empFacility'


export default combineReducers({
  login,
  home,
  signup,
  employeeHome,
  empFacility,
})
