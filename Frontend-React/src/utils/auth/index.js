import Cookie from 'js-cookie'

export const isAuth = () => {
  const credId = Cookie.get('id');
  const credRole = Cookie.get('role');
  return credId && credRole;
};

export const getRole = () => {
  return Cookie.get('role');
};

export const isManager = () => {
  // const isManager = Cookie.get('isManager') ? Cookie.get('isManager') : false;
  return Cookie.get('isManager') ? Cookie.get('isManager') : false;
};

export const existFacility = () => {
  return Cookie.get('facilityID') ? Cookie.get('facilityID') : false
};