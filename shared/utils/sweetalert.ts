import Swal from "sweetalert2";

export const showSuccess = (
  message: string = "Operación realizada exitosamente"
) => {
  Swal.fire({
    title: "",
    text: message,
    type: "success",
    showCancelButton: false,
    confirmButtonColor: "#0097ff",
    confirmButtonText: "Aceptar",
  });
};

export const showError = (message: string = "Ha ocurrido un error.") => {
  Swal.fire({
    title: "",
    text: message,
    type: "error",
    showCancelButton: false,
    confirmButtonColor: "#0097ff",
    confirmButtonText: "Aceptar",
  });
};

export const showWarning = (message: string = "Ha ocurrido un error.") => {
  Swal.fire({
    title: "",
    text: message,
    type: "warning",
    showCancelButton: false,
    confirmButtonColor: "#0097ff",
    confirmButtonText: "Aceptar",
  });
};
