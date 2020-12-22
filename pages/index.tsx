import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import getConfig from "next/config";

import { Post } from "models";
import { TableCustom } from "components";
import { confirm, prop, showSuccess } from "shared/utils";
import { handlerError, handlerResponse } from "shared/utils";

import HomeLayout from "components/Layouts/HomeLayout";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

import searchSvg from "public/icons/search.svg";

function HomePage({ posts }: { posts: Post[] }) {
  const ref = useRef(null);

  const dispatch = useDispatch();
  const storePosts: Post[] = useSelector(prop("posts")) || []; // Accedo a la variable guardada en redux

  const [data, setData] = useState<Post[]>(storePosts); // Backup de la data que esta en redux
  const [queryName, setQueryName] = useState<string>(""); // Filtro por nombre
  const [querySortBy, setQuerySortBy] = useState<number>(1); // Filtro estatus

  useEffect(() => {
    if (!!storePosts && !storePosts.length) {
      dispatch({
        type: "Post/SET",
        post: posts.map((row) => ({
          ...row,
          completed: !Math.round(Math.random()),
        })),
      });
    }

    setData(storePosts);
  }, [storePosts]);

  const filterByName = (_: React.MouseEvent<HTMLImageElement>) => {
    if (!!queryName) {
      return setData(
        storePosts.filter(
          (row) =>
            row.title.toLowerCase().indexOf(queryName.toLowerCase()) != -1 &&
            row.completed === Boolean(!!querySortBy)
        )
      );
    }

    setData(storePosts);
  };

  const filterByStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setQuerySortBy(parseInt(value));

    if (parseInt(value) >= 0) {
      return setData(
        storePosts.filter((row) => row.completed === Boolean(!!parseInt(value)))
      );
    }

    setData(storePosts);
  };

  const onDeletePost = (postId: number) => {
    return async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const hasDelete = await confirm({
        text: "¿Desea eliminar esta entrada?",
      });

      if (!!hasDelete) {
        await fetch(`${API_URL}/posts/${postId}`, {
          method: "DELETE",
        })
          .then(handlerResponse)
          .then((_) =>
            dispatch({
              type: "Post/REMOVE",
              post: storePosts.filter(({ id }) => id !== postId),
            })
          )
          .catch(handlerError)
          .finally(() => showSuccess());
      }
    };
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div className="card rounded shadow my-5">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="float-right my-4">
                  <button className="btn btn-primary rounded text-uppercase">
                    <Link href="/post">Crear Nuevo</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <label htmlFor="name">Ordenar</label>
                <div className="form-group">
                  <select
                    name="sortBy"
                    className="form-control rounded"
                    defaultValue="1"
                    onChange={filterByStatus}
                  >
                    <option value="1">Completado</option>
                    <option value="0">Por Completar</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <label htmlFor="name">Título</label>
                <div className="form-group d-flex">
                  <input
                    type="text"
                    className="form-control rounded w-90 mr-3"
                    id="name"
                    name="name"
                    placeholder="Buscar por título"
                    onChange={({ target }) => setQueryName(target.value)}
                    onKeyPress={({ key }) =>
                      key === "Enter" && ref.current.click()
                    }
                  />
                  <img
                    ref={ref}
                    className="icon-specialties img-fluid pointer"
                    src={searchSvg}
                    width="35"
                    height="35"
                    alt="Búsqueda"
                    onClick={filterByName}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="table-responsive">
                  <TableCustom className="table-striped table-bordered">
                    <TableCustom.Head>
                      <th>Id de usuario</th>
                      <th>Título</th>
                      <th>Body</th>
                      <th>Acciones</th>
                    </TableCustom.Head>
                    <TableCustom.Body>
                      {!!data && (
                        <React.Fragment>
                          {data.map((row) => {
                            return (
                              <tr key={row.id.toString()}>
                                <td>{row.userId}</td>
                                <td>{row.title}</td>
                                <td>{row.body}</td>
                                <td className="text-center">
                                  <Link href={`/post/${row.id}/`}>
                                    <button
                                      className="btn btn-primary rounded btn-small m-1 px-4"
                                      title="Ver ó Editar"
                                    >
                                      Editar
                                    </button>
                                  </Link>

                                  <button
                                    className="btn btn-primary rounded btn-small m-1 px-4"
                                    title="Eliminar"
                                    onClick={onDeletePost(row.id)}
                                  >
                                    Eliminar
                                  </button>
                                </td>
                              </tr>
                            );
                          })}

                          {!data.length && (
                            <tr>
                              <td colSpan={4}>No se encontraron resultados</td>
                            </tr>
                          )}
                        </React.Fragment>
                      )}
                    </TableCustom.Body>
                  </TableCustom>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

HomePage.getInitialProps = async () => {
  const posts: Post[] = await fetch(`${API_URL}/posts`, {
    method: "GET",
  }).then((res) => res.json());

  return { posts };
};

HomePage.Layout = HomeLayout;

export default HomePage;
