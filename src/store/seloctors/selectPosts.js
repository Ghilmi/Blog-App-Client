export const selectPosts = (state) => state.postReducer.posts;
export const selectPostsCount = (state) => state.postReducer.count;
export const selectOnePost = (state) => state.postReducer.post;
export const selectMessageFromPost = (state) => state.postReducer.message;
