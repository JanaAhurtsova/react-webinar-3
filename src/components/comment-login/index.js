import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentLogin({ isShowClose, onCancel, location, t }) {
  const cn = bem("CommentLogin");

  return (
    <div className={cn()}>
      <Link
        to="/login"
        state={{ back: location.pathname }}
        className={cn("link")}
      >
        {t("comment.login")}
      </Link>
      {isShowClose ? t("comment.able.reply") : t("comment.able.comment")}
      {isShowClose && (
        <button className={cn("button")} onClick={onCancel}>
          {t("comment.cancel")}
        </button>
      )}
    </div>
  );
}

CommentLogin.propTypes = {
  isShowClose: PropTypes.bool,
  onCancel: PropTypes.func,
  location: PropTypes.object,
  t: PropTypes.func
};

CommentLogin.defaultProps = {
  onCancel: () => {},
  isShowClose: false,
  t: (text) => {}
}

export default CommentLogin;