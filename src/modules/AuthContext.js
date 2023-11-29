import { createContext, useState, useContext } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const updateUser = (userInfo) => {
    setUser(userInfo);

    let data = JSON.stringify(userInfo);

    localStorage.setItem("user", data);
  };

  const isAuth = () => {
    let userData = localStorage.getItem("user");

    if (userData) {
      let userInfo = JSON.parse(userData);

      if (userInfo != null) {
        updateUser(userInfo);
      }

      return userInfo;
    }

    return null;
  };

  const signOut = async () => {
    setUser({});

    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, isAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
