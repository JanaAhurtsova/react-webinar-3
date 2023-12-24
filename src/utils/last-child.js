export const getLastChild = (comment) => {
  if (comment.children && comment.children.length > 0) {
    const lastChild = comment.children.at(-1);
    if (lastChild.children && lastChild.children.length > 0) {
      return getLastChild(lastChild);
    }
    return lastChild._id
  }
  return comment._id;
};