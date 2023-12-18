import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';

function AuthStatus({t, username, onLogout, onClick}) {
  const cn = bem("AuthStatus");

  return (
    <div className={cn()}>
      {username ? (
        <>
          <Link to="/profile" className={cn("username")}>{username}</Link>
          <Link to="/login">
            <button onClick={onLogout}>{t("login.logout")}</button>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <button onClick={onClick}>{t("login.title")}</button>
        </Link>
      )}
    </div>
  );
}

AuthStatus.propTypes = {
  t: PropTypes.func,
  username: PropTypes.string,
  onLogout: PropTypes.func,
  onClick: PropTypes.func,
};

AuthStatus.defaultProps = {
  t: (text) => text,
};

export default memo(AuthStatus);