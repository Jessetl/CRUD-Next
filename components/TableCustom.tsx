import React from "react";

interface TableProps {
  className?: string;
  children?: React.ReactNode;
}

const TableCustom = ({ className, children }: TableProps) => {
  return (
    <table className={`table ${className ? className : ""}`}>{children}</table>
  );
};

const TableCustomHead = ({ className, children }: TableProps) => {
  return (
    <thead className={`table-custom-head ${className ? className : ""}`}>
      <tr>{children}</tr>
    </thead>
  );
};

const TableCustomBody = ({ className, children }: TableProps) => {
  return (
    <tbody className={`table-custom-body ${className ? className : ""}`}>
      {children}
    </tbody>
  );
};

TableCustom.Head = TableCustomHead;
TableCustom.Body = TableCustomBody;

export { TableCustom };
