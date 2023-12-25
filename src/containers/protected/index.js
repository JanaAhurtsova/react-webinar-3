import {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useLocation, useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function Protected({children, redirect}) {

  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting
  }));
  const {t} = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!select.exists && !select.waiting) {
      navigate(redirect, {state: {back: location.pathname}});
    }
  }, [select.exists, select.waiting]);

  if (!select.exists || select.waiting) {
    return <div>{t("protected.wait")}</div>
  } else {
    return children;
  }
}

Protected.propTypes = {
  redirect: PropTypes.string,
  children: PropTypes.node,
}

export default memo(Protected);