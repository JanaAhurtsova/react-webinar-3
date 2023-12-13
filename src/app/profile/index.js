import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import UserCard from "../../components/user-card";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import AuthInfo from "../../containers/auth-info";

function Profile() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    profile: state.user.profile,
    waiting: state.user.waiting,
    token: state.user.token
  }));

  const token = select.token || localStorage.getItem("token");

  useInit(() => {
    store.actions.user.getProfile(token);
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <PageLayout>
      <AuthInfo />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <UserCard t={t} user={select.profile} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile)