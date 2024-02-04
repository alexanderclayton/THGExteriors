import { useState } from "react";
import { handleChange, handleSignin } from "../helpers";
import { TCredentials } from "../types";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<TCredentials>({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={(e) =>
          handleSignin(
            e,
            credentials.email,
            credentials.password,
            navigate,
            setErr,
          )
        }
        className="w-full max-w-md rounded-md bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-gray-600">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            onChange={(e) => handleChange(e, setCredentials)}
            value={credentials.email}
          />
          <div className="h-4">
            {err === "Firebase: Error (auth/invalid-email)." && (
              <p className="text-red-500">Must enter valid email</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mb-1 block text-gray-600">
            Password:
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            onChange={(e) => handleChange(e, setCredentials)}
            value={credentials.password}
          />
          <div className="h-4">
            {err === "Firebase: Error (auth/missing-password)." && (
              <p className="text-red-500">Must enter a password</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-600"
        >
          Sign In
        </button>
        <div className="h-4">
          {err === "Firebase: Error (auth/invalid-credential)." && (
            <p className="text-red-500">Incorrect email and/or password</p>
          )}
        </div>
      </form>
    </div>
  );
};
