export const isDevelopment = false;

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
    case '/customer/incomingpackages':
      return 'api/routes/incomingPackages.json';
    case '/facility/employees':
      return 'api/routes/empFacility.json';
    case '/facility/packages':
      return 'api/routes/facilityPackages.json';
    default:
      return '';
  }
};
