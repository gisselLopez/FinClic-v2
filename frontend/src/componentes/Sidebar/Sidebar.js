import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { Button, Dropdown } from "react-bootstrap"; 
import { BsCaretRightFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/Sidebar/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Redirige al inicio de sesión
    navigate("/inicio-sesion");
  };

  
  return (
    <>
      <div
        className={`Sidebar-menu ${isSidebarOpen ? "active" : ""}`}
        style={{
          width: isSidebarOpen ? "200px" : "60px",
          transition: "width 0.3s",
        }}
      >
        <Button
          variant="primary"
          className="Sidebar-toggle-btn "
          onClick={handleToggleSidebar}
        >
          <BsCaretRightFill />
        </Button>
        <ul className="SidebarList">
          {SidebarData.map((val, key) => (
            <li
              key={key}
              className={`row ${
                window.location.pathname === val.path ? "active" : ""
              }`}
            >
              {val.submenu ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id={`dropdown-${key}`}
                    className="submenu-toggle"
                  >
                    {val.icon}
                    <span>{val.title}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {val.submenu.map((submenu, submenuKey) => (
                      <Dropdown.Item
                        key={submenuKey}
                        href={submenu.path}
                        className={`submenu-item ${
                          window.location.pathname === submenu.path
                            ? "submenu-active"
                            : ""
                        }`}
                      >
                        {submenu.title}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Link
                    id="icon"
                    to={val.path}
                    style={{ flex: isSidebarOpen ? "30%" : "100%" }}
                  >
                    {val.icon}
                  </Link>
                  <NavLink
                    id="title"
                    to={val.path}
                    activeClassName="active"
                    style={{ display: isSidebarOpen ? "flex" : "none" }}
                  >
                    {val.title}
                  </NavLink>
                </>
              )}
            </li>
          ))}
          <li>
            {/* Botón "Cerrar sesión" con icono */}
            <li className="logout-button">
              <Button onClick={handleLogout}>
                <i class="bi bi-box-arrow-left"></i>
                <span className="span">salir</span>
              </Button>
            </li>{" "}
          </li>
        </ul>
      </div>
    </>
  );
}


export default Sidebar;
