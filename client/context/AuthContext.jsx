"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  console.log(auth);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get("/auth/profile");
        setAuth(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext used outside of provider");
  return context;
}

export default AuthProvider;
