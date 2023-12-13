import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function UserCard({user, t}) {
  const cn = bem("UserCard");
  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{t("user.profile")}</h2>
      <ul className={cn("info")}>
        <li key={"name"}>
          <span>{t("user.name")}</span>
          <b> {user.name}</b>
        </li>
        <li key={"phone"}>
          <span>{t("user.phone")}</span>
          <b> {user.phone}</b>
        </li>
        <li key={"email"}>
          <span>email:</span>
          <b> {user.email}</b>
        </li>
      </ul>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string
    })
  }),
  t: PropTypes.func
};

UserCard.defaultProps = {
  t: (text) => text
}

export default memo(UserCard);