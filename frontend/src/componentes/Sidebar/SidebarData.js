import React from "react";
import {
  BsHouse,
  BsFillBellFill,
  BsFillChatDotsFill,
  BsGraphUp,
  BsCreditCard,

} from "react-icons/bs";
//import { FaBars } from "react-icons/fa";
//import { AiOutlineLogin } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/dashboard/home", 
    icon: <BsHouse />,
    cName: "sidebar-text",
  },
  {
    title: "Estadisticas",
    path: "/dashboard/estadisticas",
    icon: <BsGraphUp />,
    cName: "nav-text",
  },
  {
    title: "Credito",
    icon: <BsCreditCard />,
    cName: "nav-text",
    submenu: [
      {
        title: "Registrar",
        path: "/dashboard/registrar-credito",
        cName: "submenu-item",
      },
      {
        title: "Listar",
        path: "/dashboard/detallecredito",
        cName: "submenu-item",
      },
    ],
  },
  {
    title: "Clientes",
    icon: <FaRegAddressCard />,
    cName: "sidebar-text",
    path: "/dashboard/listarcliente",
  },
  {
    title: "Mensajes",
    path: "Mensajes",
    icon: <BsFillChatDotsFill />,
    cName: "sidebar-text",
  },
  {
    title: "Configuracion",
    path: "Configuracion",
    icon: <BsFillBellFill />,
    cName: "sidebar-text",
  },
];
