export const isDevelopment = false;

export const getJSONroute = (route) => {
  switch (route) {
    case '/auth':
      return '/api/routes/auth.json';
    case '/signup/customer':
      return '/api/routes/signupCustomer.json';
    default:
      return '';
  }
};
