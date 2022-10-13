import { createContext, useState } from "react";
import authAPI from "../api/authAPI";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await authAPI.login(inputs);
    setCurrentUser(res.data);
  };
  const logout = async () => {
    await authAPI.logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
