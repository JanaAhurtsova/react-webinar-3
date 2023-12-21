import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Comment from "../comment";
import CommentForm from "../comment-form";
import CommentLogin from "../comment-login";

function CommentsList(props) {
  const cn = bem("CommentsList");

  return (
    <>
      {props.comments.length > 0 && (
        <ul className={cn()}>
          {props.comments.map((comment) => (
            <li
              key={comment._id}
              style={{ paddingLeft: `${comment.offset * 30}px` }}
            >
              <Comment
                {...comment}
                currentUsername={props.currentUsername}
                isAuth={props.isAuth}
                onSubmit={props.onSubmit}
                onReply={props.setParent}
                t={props.t}
              />
              {props.parent._id === comment._id && props.isAuth && (
                <CommentForm
                  cancelBtn={true}
                  onSubmit={props.onSubmit}
                  onCancel={props.resetParent}
                  commentId={comment._id}
                  t={props.t}
                />
              )}
              {props.parent._id === comment._id && !props.isAuth && (
                <CommentLogin
                  isShowClose={true}
                  location={props.location}
                  onCancel={props.resetParent}
                  t={props.t}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dateCreate: PropTypes.string,
      text: PropTypes.string,
      author: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        profile: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
      offset: PropTypes.number,
    })
  ),
  parent: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _type: PropTypes.string
  }),
  currentUsername: PropTypes.string,
  isAuth: PropTypes.bool,
  onSubmit: PropTypes.func,
  setParent: PropTypes.func,
  resetParent: PropTypes.func,
  t: PropTypes.func
};

export default memo(CommentsList);