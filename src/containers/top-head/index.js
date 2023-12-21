import {memo, useCallback} from 'react';
import PropTypes from "prop-types";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import SideLayout from '../../components/side-layout';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function TopHead({t}) {

  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists
  }));

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.actions.session.signOut();
    }, []),
  }

  return (
    <SideLayout side='end' padding='small'>
      {select.exists ? <Link to='/profile'>{select.user.profile.name}</Link> : ''}
      {select.exists
        ? <button onClick={callbacks.onSignOut}>{t('session.signOut')}</button>
        : <button onClick={callbacks.onSignIn}>{t('session.signIn')}</button>
      }
    </SideLayout>
  );
}

TopHead.propTypes = {
  t: PropTypes.func
}

export default memo(TopHead);
