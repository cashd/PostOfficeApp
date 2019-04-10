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
    case '/customer/incomingpackages':
      return 'api/routes/incomingPackages.json';
    case '/facility/employees':
      return 'api/routes/empFacility.json';
    case '/facility/packages':
      return 'api/routes/facilityPackages.json';
    case '/manager/addEmployee':
      return 'api/routes/newPackage.json';
    case '/facility/trucks':
      return 'api/routes/facilityTrucks.json';
    case '/facility/all':
      return 'api/routes/facilities.json';
    case '/truck/packages':
      return 'api/routes/facilityPackages.json';
    case '/truck/type':
      return 'api/routes/truckType.json';
    case '/truck/travel':
      return 'api/routes/truckTravel.json';
    case '/truck/deliver':
      return 'api/routes/truckDeliver.json';
    case '/facility/move':
      return 'api/routes/facilityMove.json';
    case '/facility/type':
      return 'api/routes/facilityType.json';
    case '/package/history':
      return 'api/routes/tracking.json';
    default:
      return '';
  }
};
