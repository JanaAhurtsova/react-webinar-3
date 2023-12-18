import { memo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthInfo from "../../containers/auth-info";
import useTranslate from "../../hooks/use-translate";
import Head from "../../components/head";
import LoginForm from "../../components/login-form";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";

function Login() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation()

  useInit(() => {
    store.actions.session.removeError();
  }, []);

  const select = useSelector((state) => ({
    error: state.session.error,
    user: state.session.username,
    waiting: state.session.waiting,
  }));

  useEffect(() => {
    const {state} = location;
    if (select.user && !select.waiting) {
      if (state?.from) {
        navigate(state?.from);
      } else {
        navigate("/profile");
      }
    }
  }, [select.user, select.waiting]);

  const callbacks = {
    onSubmit: (data) => {
      store.actions.session.loginUser(data);
    },
  };

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