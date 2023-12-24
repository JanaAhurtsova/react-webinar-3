import React, { memo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Comment from "../comment";
import CommentForm from "../comment-form";
import CommentLogin from "../comment-login";
import CommentOffset from "../comment-offset";

function CommentsList(props) {
  const formRef = useRef(null);
  const cn = bem("CommentsList");
  const maxNesting = 5;
  const [offsetForm, setOffsetForm] = useState(0);

  return (
    <>
      {props.comments.length > 0 && (
        <ul className={cn()}>
          {props.comments.map((comment) => {
            return (
              <React.Fragment key={comment._id}>
                <Comment
                  comment={comment}
                  currentUsername={props.currentUsername}
                  isAuth={props.isAuth}
                  onSubmit={props.onSubmit}
                  onReply={props.setPositionAfter}
                  t={props.t}
                  maxNesting={maxNesting}
                  setOffsetForm={setOffsetForm}
                />
                {props.positionAfter._id === comment._id && (
                  <CommentOffset
                    ref={formRef}
                    offset={offsetForm}
                    maxNesting={maxNesting}
                  >
                    {props.isAuth && (
                      <CommentForm
                        isReply={true}
                        onSubmit={props.onSubmit}
                        onCancel={props.resetPosition}
                        commentId={comment._id}
                        t={props.t}
                      />
                    )}
                    {!props.isAuth && (
                      <CommentLogin
                        isShowClose={true}
                        location={props.location}
                        onCancel={props.resetPosition}
                        t={props.t}
                      />
                    )}
                  </CommentOffset>
                )}
              </React.Fragment>
            );
          })}
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
  positionAfter: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _type: PropTypes.string
  }),
  currentUsername: PropTypes.string,
  isAuth: PropTypes.bool,
  onSubmit: PropTypes.func,
  setPositionAfter: PropTypes.func,
  resetPosition: PropTypes.func,
  t: PropTypes.func
};

export default memo(CommentsList);