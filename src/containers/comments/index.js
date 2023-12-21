import { useState, memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import {
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from "react-redux";
import useSelector from "../../hooks/use-selector";
import commentsActions from "../../store-redux/comments/actions";
import Spinner from "../../components/spinner";
import CommentLogin from "../../components/comment-login";
import CommentsList from "../../components/comments-list";
import CommentForm from "../../components/comment-form";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import CommentsLayout from "../../components/comments-layout";
import { useLocation } from "react-router-dom";

function Comments({ articleId }) {
  const dispatch = useDispatchRedux();
  const location = useLocation();
  const isAuth = useSelector((state) => state.session.exists);
  const select = useSelectorRedux((state) => ({
    waiting: state.comments.waiting,
    comments: state.comments.comments,
    count: state.comments.count
  }));

  const [parent, setParent] = useState({
    _id: articleId,
    _type: articleId,
  });

  const callbacks = {
    onSubmit: (text, commentId) =>
      dispatch(commentsActions.addComment(text, commentId, articleId)),

    onSetParent: useCallback(
      (_id) => {
        setParent({ _id, _type: "comment" });
      },
      [setParent]
    ),

    onResetParent: () => {
      setParent({
        _id: articleId,
        _type: "article",
      });
    },
  };

  const commentsFormat = useMemo(() => treeToList(listToTree(select.comments), (comment, level) => ({
    _id: comment._id,
    author: comment.author,
    text: comment.text,
    dateCreate: comment.dateCreate,
    parent: comment.parent,
    isDeleted: comment.isDeleted,
    offset: level - 1,
  })).slice(1), [select.comments]);

  return (
    <CommentsLayout count={select.count}>
      <Spinner active={select.waiting}>
        <CommentsList
          comments={commentsFormat}
          isAuth={isAuth}
          onSubmit={callbacks.onSubmit}
          setParent={callbacks.onSetParent}
          parent={parent}
          location={location}
          resetParent={callbacks.onResetParent}
          articleId={articleId}
        />
      </Spinner>
      {!isAuth && parent._id === articleId && (
        <CommentLogin isShowClose={false} location={location} />
      )}
      {isAuth && parent._id === articleId && (
        <CommentForm cancelBtn={false} onSubmit={callbacks.onSubmit} />
      )}
    </CommentsLayout>
  );
}

Comments.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default memo(Comments);
