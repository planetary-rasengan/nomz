var api = {

  fetchFeed(id) {
    const FEED_URL = `http://localhost:1337/api/users/${id}/feed`
    return fetch(FEED_URL).then( (res) => res.json())
  },

  login(creds) {
    const LOGIN_URL = 'http://localhost:1337/login';
    let config = {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
      body: JSON.stringify(creds)
    };
    return fetch(LOGIN_URL, config).then( (res) => {
      if (res.status !== 200) {
        console.log(res)
        // If no 200, then just throw an error to reject the promise
        let err = new Error(res);
        err.message = 'Bad Login'
        throw err
      } else {
        return res.json();
      }
    })
  },

  logout() {
    const LOGOUT_URL = 'http://localhost:1337/logout';
    return fetch(LOGOUT_URL).then( (res) => res )
  },

  fetchUser(id) {
    const USER_URL = `http://localhost:1337/api/users/${id}`;
    return fetch(USER_URL).then( (res) => {
      if (res.status !== 200) {
        throw new Error(res)
      } else {
        return res.json()
      }
    })
  }

}

module.exports = api;