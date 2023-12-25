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
import useTranslate from "../../hooks/use-translate";

function Comments({ articleId }) {
  const dispatch = useDispatchRedux();
  const location = useLocation();
  const { t } = useTranslate();

  const selectStore = useSelector((state) => ({
    isAuth: state.session.exists,
    currentUsername: state.session.user.profile?.name,
  }));

  const select = useSelectorRedux((state) => ({
    waiting: state.comments.waiting,
    comments: state.comments.comments,
    count: state.comments.count
  }));

  const [positionAfter, setPositionAfter] = useState({
    _id: articleId,
    _type: "article",
  });

  const callbacks = {
    onSubmit: (text, commentId) =>
      dispatch(commentsActions.addComment(text, commentId, articleId)),

    onSetPositionAfter: useCallback(
      (_id) => {
        setPositionAfter({ _id, _type: "comment" });
      },
      [setPositionAfter]
    ),

    onResetPosition: () => {
      setPositionAfter({
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
    children: comment.children,
    isDeleted: comment.isDeleted,
    offset: level - 1,
  })).slice(1), [select.comments]);

  return (
    <CommentsLayout count={select.count} t={t}>
      <Spinner active={select.waiting}>
        <CommentsList
          comments={commentsFormat}
          currentUsername={selectStore.currentUsername}
          isAuth={selectStore.isAuth}
          onSubmit={callbacks.onSubmit}
          setPositionAfter={callbacks.onSetPositionAfter}
          positionAfter={positionAfter}
          location={location}
          resetPosition={callbacks.onResetPosition}
          articleId={articleId}
          t={t}
        />
      </Spinner>
      {!selectStore.isAuth && positionAfter._id === articleId && (
        <CommentLogin isShowClose={false} location={location} t={t} />
      )}
      {selectStore.isAuth && positionAfter._id === articleId && (
        <CommentForm isReply={false} onSubmit={callbacks.onSubmit} t={t} />
      )}
    </CommentsLayout>
  );
}

Comments.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default memo(Comments);
