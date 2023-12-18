import StoreModule from "../module";
import { deleteCookie, getCookie } from "../../utils";

class UserSessionState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: null,
      username: null,
      error: null,
      waiting: true,
    };
  }

  async loginUser(credentials) {
    this.setWaiting(true)
    this.removeError();
    const response = await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();

    if (response.ok) {
      const token = json.result.token;
      const username = json.result.user.profile.name;
      this.setState(
        {
          ...this.getState(),
          token,
          username,
          error: null,
        },
        "Пользователь авторизован"
      );
    } else {
      this.setState(
        {
          ...this.getState(),
          error: json.error.data.issues[0].message,
        },
        "Ошибка входа"
      );
    }
    this.setWaiting(false);
  }

  async logoutUser() {
    try {
      this.setWaiting(true)
      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": this.getState().token,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (json.result) {
        this.setState({
          ...this.initState(),
          waiting: false
        }, "Пользователь вышел");
        deleteCookie("token");
      }
    } catch (err) {
      console.error(err.message);
      this.setState({
        ...this.initState(),
      })
      this.setWaiting(false);
    }
  }

  async checkToken(token) {
    try {
      this.setWaiting(true);

      const response = await fetch(
        "/api/v1/users/self?fields=profile(name)",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Token": token,
          },
        }
      );
      const json = await response.json();
      if(json.result) {
        this.setState({
          ...this.getState(),
          token,
          username: json.result.profile.name,
        });
      } else {
        this.setState(
          {
            ...this.initState(),
          },
          "Невалидный токен"
        );
        deleteCookie("token");
      }
      this.setWaiting(false);
    } catch (err) {
      console.error(err);
    }
  }

  restoreSession() {
    const token = getCookie("token");

    if(token) {
      this.checkToken(token);
    } else {
      this.setWaiting(false);
    }
  }

  removeError() {
    this.setState({
      ...this.getState(),
      error: null,
    });
  }

  setWaiting(isWaiting) {
    this.setState({
      ...this.getState(),
      waiting: isWaiting
    })
  }
}

export default UserSessionState;