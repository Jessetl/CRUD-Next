import { combineReducers } from "redux";
import { post } from "./post";

const rootReducer = combineReducers({
  posts: post,
});

export default rootReducer;
