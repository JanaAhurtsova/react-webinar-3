import { memo } from "react";
import AuthStatus from "../../components/auth-status";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function AuthInfo() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    token: state.user.token,
    username: state.user.profile.name
  }))

  const callbacks = {
    onLogout: () => {
      store.actions.user.logoutUser(select.token);
      localStorage.removeItem("token");
    }
  }

  return (
    <AuthStatus
      t={t}
      onLogout={callbacks.onLogout}
      username={select.username}
    />
  );
}

export default memo(AuthInfo);