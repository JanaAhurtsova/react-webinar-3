import { memo, useState } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function LoginForm({t, error, onSubmit}) {
  const cn = bem('LoginForm');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('')

  const callbacks = {
    onSubmit: (event) => {
      event.preventDefault();
      onSubmit({ login, password });
    },
    onChangeLogin: (event) => setLogin(event.target.value),
    onChangePassword: (event) => setPassword(event.target.value),
  };

  return (
    <form className={cn()} name="login-form" onSubmit={callbacks.onSubmit}>
      <h2>{t("login.title")}</h2>
      <div className={cn("field")}>
        <label htmlFor="login">{t("login.login")}</label>
        <input
          id="login"
          className={cn("input")}
          type="text"
          onChange={callbacks.onChangeLogin}
        />
      </div>
      <div className={cn("field")}>
        <label htmlFor="password">{t("login.password")}</label>
        <input
          id="password"
          className={cn("input")}
          type="password"
          onChange={callbacks.onChangePassword}
        />
      </div>
      {error && <div className={cn("error")}>{error}</div>}
      <button type="submit">{t("login.signin")}</button>
    </form>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func,
  error: PropTypes.string,
  onSubmit: PropTypes.func
};

LoginForm.defaultProps = {
  t: (text) => text,
};

export default memo(LoginForm);