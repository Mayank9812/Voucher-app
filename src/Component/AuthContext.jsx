import React, { createContext, useContext, useState } from 'react'


const AuthContext = createContext();

export default function AuthProvider({children}) {

    const [user , setUser ]=useState(null);

    function login(username, password) {
    if (username === "admin" && password === "admin123") {
      setUser({ username, role: "admin" });
      return true;
    }

    if (username === "staff" && password === "staff123") {
      setUser({ username, role: "staff" });
      return true;
    }

       return false;
  }

  function logout(){
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user , login , logout}}>
    {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext);
}