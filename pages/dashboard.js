import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/useAuthFirebase";

const dashboard = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleClick = () => {
    auth.signout().then(() => {
      console.log("deslogeado");
      router.push("/");
    });
  };

  return (
    <>
      {auth.user ? (
        <>
          <h1>Bienvenido {auth.user.email}</h1>
          <button
            type="button"
            className="bg-blue-500 m-2 p-2"
            onClick={handleClick}
          >
            Signout
          </button>
        </>
      ) : (
        <Link href="/login" passHref>
          <a className="bg-blue-500 m-2 p-2">Ir a Login</a>
        </Link>
      )}
    </>
  );
};

export default dashboard;
