import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { User } from "firebase/auth";
import { IAuthProviderProps, TAuthContext } from "../types";

const AuthContext = createContext<TAuthContext>({ user: null, loading: true });

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    console.log("auth state changed");
    return () => unsubscribe();
  }, []);
  const value = {
    user,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
