import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/useAuthFirebase";
import { route } from "next/dist/next-server/server/router";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      router.push("/dashboard");
    }
  }, [auth]);

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .signin(email, password)
      .then(() => {
        console.log("user autenticado");
        router.push("/dashboard");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  }

  function handleClick(e) {
    auth
      .singinGoogle()
      .then((response) => {
        console.log("user autenticado", response);
        router.push("/dashboard");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  }

  function FormLogin() {
    return (
      <div className="bg-gray-300 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="label" htmlFor="email">
                  Correo
                </label>
                <input
                  className="input"
                  id="email"
                  type="email  "
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className="input"
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="6"
                  required
                />
              </div>
              <p className="text-red-500 text-xs italic mb-3">{error}</p>
              <div className="flex items-center justify-between">
                <button
                  className="btn btn-blue font-bold py-2 px-4"
                  type="submit"
                >
                  Sing In
                </button>
                <a href="#">Forgot Password?</a>
              </div>
            </form>
            <div className="mt-6">
              <p className=" mb-4 text-center">OR</p>
              <hr className="block w-full mb-4 border-0 border-t border-gray-300" />
              <button
                className="w-full btn btn-red"
                type="button"
                onClick={handleClick}
              >
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //Si esta autenticado: ir a la Pagina de Dashboard
  //Si NO esta autenticado: ir a Login

  // const handleRender = !auth.user ? (
  //   <FormLogin></FormLogin>
  // ) : (
  //   <h1>soy el dashboard</h1>
  // );

  return auth.user ? <h1>cargando</h1> : <FormLogin></FormLogin>;
};

export default login;
