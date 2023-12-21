import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentLogin({ isShowClose, onCancel, location }) {
  const cn = bem("CommentLogin");

  return (
    <div className={cn()}>
      <Link to="/login" state={{ back: location.pathname }} className={cn("link")}>
        Войдите
      </Link>
      , чтобы иметь возможность {isShowClose ? "ответить" : "комментировать"}.
      {isShowClose && (
        <button className={cn("button")} onClick={onCancel}>
          Отмена
        </button>
      )}
    </div>
  );
}

CommentLogin.propTypes = {
  isShowClose: PropTypes.bool,
  onCancel: PropTypes.func,
  location: PropTypes.object
};

CommentLogin.defaultProps = {
  onCancel: () => {},
  isShowClose: false
}

export default CommentLogin;