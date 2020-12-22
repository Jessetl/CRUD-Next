import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

import getConfig from "next/config";

import { User, Post } from "models";
import { PageTitle, FormRow } from "components";
import { prop, showSuccess } from "shared/utils";
import { handlerError, handlerResponse } from "shared/utils";

import HomeLayout from "components/Layouts/HomeLayout";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

function PostCreate({ users }: { users: User[] }) {
  const dispatch = useDispatch();
  const storePosts: Post[] = useSelector(prop("posts"));

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [data] = useState<User[]>(users);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = handleSubmit(
    async (formData): Promise<void> => {
      if (!!!isSubmitted) {
        const lastId = storePosts.length + 1;

        await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            ...formData,
            id: lastId,
          }),
        })
          .then(handlerResponse)
          .then(async (res) => {
            const post = await res.json();

            dispatch({ type: "Post/SET", post: [...storePosts, post] });

            showSuccess();
            Router.push("/");
          })
          .catch(handlerError)
          .finally(() => setIsSubmitted(false));
      }
    }
  );

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <PageTitle backUrl="/">REGISTRO DE POST</PageTitle>
      </div>
      <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
        <div className="card rounded shadow my-5">
          <div className="card-body">
            <form onSubmit={onSubmit} autoComplete="off">
              <FormRow>
                <FormRow.Column className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <label htmlFor="title">Título</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    id="title"
                    name="title"
                    ref={register({
                      required: "Ingrese un nombre en el área de texto.",
                    })}
                  />
                  {errors.title && (
                    <span role="alert" className="invalid-feedback">
                      {errors.title.message}
                    </span>
                  )}
                </FormRow.Column>
              </FormRow>
              {!!data && (
                <FormRow>
                  <FormRow.Column className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <label htmlFor="userId">Usuario</label>
                    <select
                      id="userId"
                      name="userId"
                      className={`form-control ${
                        errors.userId ? "is-invalid" : ""
                      }`}
                      ref={register({
                        required: "Seleccioné un usuario.",
                      })}
                      defaultValue=""
                    >
                      <option value="">Seleccioné...</option>
                      {data.map(({ userId, name }) => {
                        return (
                          <option value={userId} key={userId.toString()}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    {errors.userId && (
                      <span role="alert" className="invalid-feedback">
                        {errors.userId.message}
                      </span>
                    )}
                  </FormRow.Column>
                </FormRow>
              )}

              <FormRow>
                <FormRow.Column className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <label htmlFor="body">Descripción</label>
                  <textarea
                    className={`form-control ${
                      errors.body ? "is-invalid" : ""
                    }`}
                    id="body"
                    name="body"
                    ref={register({
                      required: "Ingrese una descripción en el área de texto.",
                    })}
                  ></textarea>
                  {errors.body && (
                    <span role="alert" className="invalid-feedback">
                      {errors.body.message}
                    </span>
                  )}
                </FormRow.Column>
              </FormRow>

              {isSubmitted ? <FormRow.Submitted /> : <FormRow.Button />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

PostCreate.getInitialProps = async () => {
  const users = [
    {
      name: "First Name",
      userId: 1,
    },
    {
      name: "Last Name",
      userId: 2,
    },
  ];

  return { users };
};

PostCreate.Layout = HomeLayout;

export default PostCreate;
