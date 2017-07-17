import { API_URL } from '../constants';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export default {
  returnResponse(response) {
    return response.json();
  },
  create(text) {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
           text
         }),
        headers: myHeaders
      })
      .then(this.returnResponse);
  },
  get() {
    return fetch(API_URL)
      .then(this.returnResponse)
  },
  getTodo(id) {
    return fetch(`${API_URL}/${id}`)
      .then(this.returnResponse)
  },
  update(id, data) {
    return fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: myHeaders
    })
    .then(this.returnResponse)
  },
  delete(id) {
    return fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: myHeaders
    })
    .then(this.returnResponse)
  }

};
