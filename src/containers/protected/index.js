import {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useLocation, useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function Protected({children, redirect, translate}) {

  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting
  }));
  const {t} = translate;
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
  t: PropTypes.func
}

export default memo(Protected);
