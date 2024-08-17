import { fetchData } from "../../fetche/fetch";
import { searchActions } from "../slices/sliceSearch";

export const fetchPostsOnsearch = (title, sort, categories) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchData.get(
        `api/post/search?title=${title}&sort=${sort}&categories=${categories}&desc=${title}`
      );
      dispatch(
        searchActions.setState({ title, sort, categories, posts: data })
      );
    } catch (error) {
      console.error(error);
    }
  };
};
