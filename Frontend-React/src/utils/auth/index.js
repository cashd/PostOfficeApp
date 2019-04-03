import Cookie from 'js-cookie'
import { isDevelopment } from '../api/apiConfig';

const prodDomain = '.team9postoffice.ga'
const testDomain = '.127.0.0.1:3000'

export const getDomain = () => {
  if (isDevelopment) {
    return testDomain
  } else {
    return prodDomain
  }
};
export const isAuth = () => {
  const credId = Cookie.get('id');
  const credRole = Cookie.get('role');
  return credId && credRole;
};