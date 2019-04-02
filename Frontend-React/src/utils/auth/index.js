import Cookie from 'js-cookie'
import { isDevelopment } from '../api/apiConfig';

export const isAuth = () => {
  if (isDevelopment) return true;
  const credId = Cookie.get('user_id');
  const credRole = Cookie.get('role');
  return credId && credRole;
};