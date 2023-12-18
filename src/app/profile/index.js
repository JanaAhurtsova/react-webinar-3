import { memo, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import UserCard from "../../components/user-card";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import AuthInfo from "../../containers/auth-info";
import useInit from "../../hooks/use-init";

function Profile() {
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector((state) => ({
    profile: state.profile.profile,
    waiting: state.profile.waiting,
    token: state.session.token
  }));

  useInit(() => {
    store.actions.profile.getProfileInfo(select.token);
  }, [select.token]);

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