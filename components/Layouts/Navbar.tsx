import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";

// Wrapper
import imageLogo from "public/images/logo.png";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link href="/">
          <img
            className="navbar-brand img-fluid pointer"
            src={imageLogo}
            width="150"
            height="55"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto"></ul>
        </div>
      </div>
    </nav>
  );
}
