import { PostAction, PostState } from "../actions";
import { Reducer } from "redux";

export const post: Reducer<PostState, PostAction> = (state = [], action) => {
  switch (action.type) {
    case "Post/SET":
      return action.post;
    case "Post/REMOVE":
      return action.post;
    default:
      return state;
  }
};
