// Header.js
import React from "react";
import useAuth from "../../hooks/useAuth";
//import "../../css/Navbar/NavbarMenu.css"
const Header = ({ onToggleSidebar }) => {
  const { isLoggedIn, handleLogout } = useAuth();

  // Función para manejar el clic en el botón de cierre de sesión
  const handleLogoutClick = () => {
    handleLogout(); // Cierra la sesión del usuario
    // Realiza cualquier otra acción necesaria después de cerrar sesión, como redirigir a la página de inicio, por ejemplo.
  };

  return (
    <header
    >
      <button
        style={{
          marginRight: "10px",
          padding: "5px 10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={onToggleSidebar} // Utilizamos la función recibida desde el Layout para cambiar el estado del sidebar
      >
        Abrir Sidebar
      </button>
      {isLoggedIn && (
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleLogoutClick}
        >
          Cerrar sesión
        </button>
      )}
    </header>
  );
};

export default Header;
