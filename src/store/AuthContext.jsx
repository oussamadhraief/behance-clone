import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "@/utils/api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser()
  }, []);


  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser(); 
      console.log(response);
      
      setUser(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    user,
    isAuthenticated: !!user,
    setUser,
    loading,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
