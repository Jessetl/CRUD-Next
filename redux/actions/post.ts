import { Action } from "redux";

import { Post } from "models";

export interface SetPostAction extends Action<"Post/SET"> {
  post: Post[];
}

export interface RemovePostAction extends Action<"Post/REMOVE"> {
  post: Post[];
}

export type PostAction = SetPostAction | RemovePostAction;
export type PostState = Post[];

export const setPost = (post: Post[]): PostAction => ({
  type: "Post/SET",
  post,
});

export const removePost = (post: Post[]): PostAction => ({
  type: "Post/REMOVE",
  post,
});
