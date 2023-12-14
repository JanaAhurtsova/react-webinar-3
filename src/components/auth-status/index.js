import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';
import SideLayout from "../side-layout";

function AuthStatus({t, username, onLogout}) {
  const cn = bem("AuthStatus");

  return (
    <SideLayout padding={"small"} side={"end"}>
      {username ? (
        <>
          <Link to="/profile" className={cn("username")}>{username}</Link>
          <Link to="/">
            <button onClick={onLogout}>{t("login.logout")}</button>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <button>{t("login.title")}</button>
        </Link>
      )}
    </SideLayout>
  );
}

AuthStatus.propTypes = {
  t: PropTypes.func,
  username: PropTypes.string,
  onLogout: PropTypes.func
};

AuthStatus.defaultProps = {
  t: (text) => text,
};

export default memo(AuthStatus);