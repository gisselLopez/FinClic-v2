// useAuth.js
import { useState, useEffect } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
  };

  useEffect(() => {
    console.log("useAuth - isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  return { isLoggedIn, userData, handleLoginSuccess };
};

export default useAuth;
