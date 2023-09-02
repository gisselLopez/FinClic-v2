// ProtectedWrapper.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth"; // Importa el hook useAuth

const ProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Obtiene el estado de autenticación desde el contexto

  useEffect(() => {
    if (!isLoggedIn) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      navigate("/inicio-sesion");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};

export default ProtectedWrapper;
