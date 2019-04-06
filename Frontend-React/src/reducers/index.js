import { combineReducers } from 'redux'
import login from './login'
import home from './home'
import signup from './signup'
import customer from './customer'
import employeeHome from './employeeHome'
import empFacility from './empFacility'
import manager from './manager'


export default combineReducers({
  login,
  home,
  signup,
  customer,
  employeeHome,
  empFacility,
  manager
})
