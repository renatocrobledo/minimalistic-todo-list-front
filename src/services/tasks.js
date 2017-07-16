const URL = 'http://localhost:5000/tasks';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export default {
  returnResponse(response) {
    return response.json();
  },
  create(text) {
    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
           text,
           createdAt: Date.now(),
           status: 'new'
         }),
        headers: myHeaders
      })
      .then(this.returnResponse);
  },
  get() {
    return fetch(URL)
      .then(this.returnResponse)
  },
  getTodo(id) {
    return fetch(`${URL}/${id}`)
      .then(this.returnResponse)
  },
  update(id, data) {
    const updatedData = Object.assign({updatedAt: Date.now()}, data);
    return fetch(`${URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: myHeaders
    })
    .then(this.returnResponse)
  },
  delete(id) {
    return fetch(`${URL}/${id}`, {
      method: 'DELETE',
      headers: myHeaders
    })
    .then(this.returnResponse)
  }

};
