import { memo, useEffect } from "react";
import AuthInfo from "../../containers/auth-info";
import useTranslate from "../../hooks/use-translate";
import Head from "../../components/head";
import LoginForm from "../../components/login-form";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function Login() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    error: state.user.error,
    token: state.user.token
  }));

  const callbacks = {
    onSubmit: (data) => {
      store.actions.user.loginUser(data);
    },
  };

  useEffect(() => {
    store.actions.user.initAuthorization();
  }, []);

  useEffect(() => {
    if (select.token) {
      navigate("/profile");
    }
  }, [select.token]);

  return (
    <PageLayout>
      <AuthInfo />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm t={t} onSubmit={callbacks.onSubmit} error={select.error}/>
    </PageLayout>
  );
}

export default memo(Login);