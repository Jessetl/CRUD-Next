import { showError } from "./sweetalert";

export const INTERNAL_SERVER_ERROR = 500;
export const NOT_FOUND_ERROR = 404;
export const UNAUTHORIZED = 401;
export const UNPROCESSABLE_ENTITY = 422;
export const FORBIDDEN = 403;

export const handlerError = (error: Response) => {
  const { status } = error;

  switch (status) {
    case NOT_FOUND_ERROR:
      return showError("No hemos encontrado lo que buscaba.");
    case INTERNAL_SERVER_ERROR:
      return showError("Ha ocurrido un error interno.");
    case UNAUTHORIZED:
      return showError("Usuario no autorizado.");
    case UNPROCESSABLE_ENTITY:
    // return showError(response.data[0]);
    case FORBIDDEN:
      return showError("Usuario desactivado.");
  }

  // if (isNetworkError(message)) {
  //   return showError("Revise su conexión.");
  // }
};

const isNetworkError = (message: string): boolean =>
  message.indexOf("Network Error") > -1;
