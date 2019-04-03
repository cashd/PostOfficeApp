export const isDevelopment = true;

export const getJSONroute = (route) => {
  switch (route) {
    case '/auth':
      return '/api/routes/auth.json';
    case '/signup/customer':
      return '/api/routes/signupCustomer.json';
    case '/customer/packages':
      return 'api/routes/custPackages.json';
    case '/customer/newPackage':
      return 'api/routes/newPackage.json';
    case '/facility/state':
      return 'api/routes/stateFacilities.json';
    default:
      return '';
  }
};
