import StoreModule from "../module";

class UserState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: '',
      profile: {},
      error: '',
      waiting: true,
    }
  }

  async loginUser(credentials) {
      this.setState({
        ...this.getState(),
        error: ''
      })
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      if(response.ok) {
      this.setState({
        ...this.getState(),
        token: json.result.token,
      }, "Пользователь авторизован")
      localStorage.setItem('token', json.result.token);
    } else {
      this.setState({
        ...this.getState(),
        error: json.error.message
      }, "Ошибка входа")
    }
  }

  async logoutUser(token) {
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (json.result) {
        this.setState({
          ...this.initState()
        });
      }
    } catch(err) {
      console.error(err.message);
    }
  }

  async getProfile(token) {
    try{
      this.setState({
        ...this.getState(),
        profile: {},
        waiting: true
      });

      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      this.setState({
        ...this.getState(),
        token,
        profile: {
          email: json.result.email,
          name: json.result.profile.name,
          phone: json.result.profile.phone,
        },
        waiting: false,
      });
    } catch(err) {
      console.error(err.message);
    }
  }

  async initAuthorization(request = false) {
    try {
      if (!request && this.getState().token) {
        return;
      }

      const token = localStorage.getItem('token');
      if(token) {
        await this.getProfile(token);
      }
    } catch(err) {
      console.error(err);
    }
  }
}

export default UserState;