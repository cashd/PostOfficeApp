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
  if (isManager) {
    if (isManager === true){
      return true
    }
  }
  return false
};

export const existFacility = () => {
  return Cookie.get('facilityID') ? Cookie.get('facilityID') : false
};