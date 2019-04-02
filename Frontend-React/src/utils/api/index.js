import { isDevelopment, getJSONroute } from './apiConfig';

export const apiPost = (route, payload) => {
  if (isDevelopment) {
    return fetch(getJSONroute(route)).then(resp => resp.json())
  }
  return fetch(
    'https://api.team9postoffice.ga' + route,
    {
      method: 'post',
      'credentials': 'include',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).then((resp) => {
      if (resp.ok) {
        return resp.json()
      } else {
        throw new Error('Server Error. Please try again')
      }
    })
};