export const initialState = {
  comments: [],
  waiting: false,
  count: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, comments: [], waiting: true };
    case "comments/add-comment-start":
      return { ...state, waiting: true };
    case "comments/load-success":
      return { ...state, comments: action.payload.comments, count: action.payload.count, waiting: false };
    case "comments/add-comment":
      return {
        ...state,
        comments: [...state.comments, action.payload.item],
        waiting: false,
      };
    case "comments/load-error":
      return { ...state, comments: [], waiting: false };

    default:
      return state;
  }
}

export default reducer;