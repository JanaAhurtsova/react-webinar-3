import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useSelector from "../../hooks/use-selector";

function PrivateRoute({ redirectTo="/login" }) {
  const select = useSelector((state)=> ({
    user: state.session.username,
    waiting: state.session.waiting
  }));
  
  if(!select.user && !select.waiting) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

PrivateRoute.propTypes = {
  redirectTo: PropTypes.string
}
export default PrivateRoute;