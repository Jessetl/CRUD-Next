import React from "react";
import Link from "next/link";

import goBack from "public/icons/back.svg";

interface PageTitleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  backUrl?: string;
}

const PageTitle = ({ children, className, backUrl }: PageTitleProps) => {
  return (
    <div className="page-title text-uppercase">
      {backUrl && (
        <Link href={backUrl}>
          <img
            src={goBack}
            width="20"
            height="20"
            alt="Atras"
            className="pointer"
          />
        </Link>
      )}
      <span className="mx-3">{children}</span>
    </div>
  );
};

export { PageTitle };
