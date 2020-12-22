import Swal, { SweetAlertOptions } from "sweetalert2";

export const confirm = ({
  title = "",
  text,
  type = "warning",
}: SweetAlertOptions) => {
  return new Promise((resolve, _) => {
    Swal.fire({
      title,
      text,
      type,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#0097ff",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      focusConfirm: false,
      focusCancel: false,
    }).then(({ value }) => {
      resolve(!!value);
    });
  });
};
