import Cookie from 'js-cookie'



export const isAuth = () => {
  const credId = Cookie.get('user_id');
  const credRole = Cookie.get('role');
  return credId && credRole;
};