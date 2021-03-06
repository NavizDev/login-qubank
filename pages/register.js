import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/useAuthFirebase";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    auth.signup(email, password).then(() => {
      console.log("registrado");
      router.push("/login");
    });
  };

  return (
    <div className="bg-gray-300 w-screen h-screen ">
      <div className="px-8 py-12 max-w-sm mx-auto sm:max-w-md lg:max-w-xl">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="label" htmlFor="email">
              Correo
            </label>
            <input
              className="input"
              id="email"
              type="email "
              value={email}
              placeholder="Email"
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
              required
              minLength="6"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="btn btn-blue font-bold py-2 px-4" type="submit">
              Create Account
            </button>
            <a href="#">Already a member?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default register;
