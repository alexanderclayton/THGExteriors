import { useState } from "react";
import { handleChange } from "../helpers";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../context/AuthContext";
import { TCredentials } from "../types";

export const Signin = () => {
  const { user } = useAuth();

  const [credentials, setCredentials] = useState<TCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      console.log(`User ${credentials.email} signed in!`, userCredential);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Enter Credentials</legend>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              className="border border-black"
              onChange={(e) => handleChange(e, setCredentials)}
              value={credentials.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              className="border border-black"
              onChange={(e) => handleChange(e, setCredentials)}
              value={credentials.password}
            />
          </div>
        </fieldset>
        <input type="submit" value={"submit form!"} />
      </form>
      <button onClick={() => console.log("credentials", credentials)}>
        Check
      </button>
      <button onClick={() => console.log(user)}>User</button>
      <button onClick={() => signOut(auth)}>Signout</button>
      {user ? <p>User signed in!</p> : <p>User not signed in :/</p>}
    </>
  );
};
