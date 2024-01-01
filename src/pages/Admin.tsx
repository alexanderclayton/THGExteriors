//import//
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const navigate = useNavigate();

  return (
    <div>
      <SignedIn>
        <p>Signed in</p>
        <SignOutButton signOutCallback={() => navigate("/")} />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};
