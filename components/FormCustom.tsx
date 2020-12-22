import React from "react";

interface PropsRow
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  classNameForm?: string;
}

const FormRow = ({ children, className }: PropsRow) => (
  <div className={`row ${className}`}>{children}</div>
);

const Column = ({ children, className, classNameForm }: PropsRow) => (
  <div className={className}>
    <div className={`form-group ${classNameForm}`}>{children}</div>
  </div>
);

const Submitted = ({ className }: PropsRow) => (
  <FormRow className={className}>
    <div className="col text-center">
      <div className="spinner-border text-orange" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </FormRow>
);

const Button = ({ className }: PropsRow) => (
  <FormRow className={className}>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <button type="submit" className="btn btn-primary btn-block">
        Enviar
      </button>
    </div>
  </FormRow>
);

FormRow.Column = Column;
FormRow.Submitted = Submitted;
FormRow.Button = Button;

export { FormRow };
