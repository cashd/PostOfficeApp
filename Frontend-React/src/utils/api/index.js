import { isDevelopment, getJSONroute } from './apiConfig';

export const apiPost = (route, payload) => {
  if (isDevelopment) {
    return fetch(getJSONroute(route)).then(resp => resp.json())
  }
  console.log(payload)
  return fetch(
    'https://api.team9postoffice.ga' + route,
    {
      method: 'post',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json'
     },
      body: JSON.stringify(payload)
    }).then((resp) => {
      console.log('fuck it');
      console.log(resp)
      if (resp.ok) {
        return resp.json()
      } else {
        throw new Error('Server Error. Please try again')
      }
    })
};
