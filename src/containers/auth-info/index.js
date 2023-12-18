import { memo } from "react";
import AuthStatus from "../../components/auth-status";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function AuthInfo() {
  const store = useStore();
  const { t } = useTranslate();

  const username = useSelector((state) => state.session.username);

  const callbacks = {
    onLogout: () => {
      store.actions.session.logoutUser();
      store.actions.profile.resetProfileInfo();
    },
    onRemoveError: () => store.actions.session.removeError()
  }

  return (
    <AuthStatus
      t={t}
      onLogout={callbacks.onLogout}
      username={username}
      onClick={callbacks.onRemoveError}
    />
  );
}

export default memo(AuthInfo);