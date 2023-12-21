export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        dispatch({
          type: "comments/load-success",
          payload: { comments: res.data.result.items, count: res.data.result.count },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  addComment: (text, commentId, articleId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/add-comment-start" });

      try{
        const token = localStorage.getItem("token");
        if(token) {
          const body = {
            text,
            parent: {
              _id: commentId ?? articleId,
              _type: commentId ? "comment" : "article",
            },
          };

          const res = await services.api.request({
            url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted&search[parent]=${articleId}`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Token": token,
            },
            body: JSON.stringify(body),
          });

          dispatch({
            type: "comments/add-comment",
            payload: { item: res.data.result },
          });
        }
      } catch(e) {
        dispatch({ type: "comments/load-error" });
      }
    }
  },
};