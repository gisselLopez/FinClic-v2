import React from "react";
import {
  BrowserRouter as Router,
  
  Routes,
  Route,

} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "bootstrap/dist/css/bootstrap.min.css";
import RegistroForm from "./componentes/Login/RegistroForm";
import InicioSesion from "./componentes/Login/InicioSesion";
import Cliente from "./componentes/Cliente/cliente";
import ListarCliente from "./componentes/Cliente/ListarClientes";
import RegistrarCredito from "./componentes/credito/RegistrarCredito"
import  ListarCreditosPorCliente from "./componentes/credito/ListarCreditosPorCliente";
import Dashboard from "./componentes/Estadisticas/Dashboard";
import ListarCredito from "./componentes/detalleCredito/listarCredito"
import DetalleCredito from "./componentes/detalleCredito/TablaAmortizacion";
import Pagos from "./componentes/pagos/pagos";
import Abonos from "./componentes/Abonos/abonos";
import Home from "./componentes/Home/Home";
import Layout from "./componentes/Sidebar/Layout";

import RecuperarContrasena from "./componentes/RecuperarContrasena/RecuperarContra"
import RestablecerContrasena from "./componentes/RecuperarContrasena/restablecerContra";
import ListarUsuarios from "./componentes/Login/listarUsuarios";
import ModificarUsuario from "./componentes/Login/modificarUsuario";
import ProtectedWrapper from "./componentes/Auth/Providers/ProtectedWrapper";
import {useAuth} from "./hooks/AuthContext"; 

const App = () => {

  const { handleLoginSuccess} = useAuth(); 

  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Rutas para la página de inicio de sesión y registro */}
          <Route
            path="/inicio-sesion"
            element={<InicioSesion onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/registro" element={<RegistroForm />} />
          <Route
            path="/recuperar-contrasena"
            element={<RecuperarContrasena />}
          />
          <Route
            path="/restablecer-contrasena"
            element={<RestablecerContrasena />}
          />

          {/* Rutas protegidas */}
          <Route path="/dashboard/*" element={<Layout />}>
            {/* Rutas secundarias dentro de /dashboard */}

            <Route path="home" element={<Home />} />
            <Route path="crear" element={<Cliente />} />
            <Route path="registrar-credito" element={<RegistrarCredito />} />
            <Route path="registrar-Pagos" element={<Pagos />} />
            <Route path="registrar-Abonos" element={<Abonos />} />
            <Route path="lista-creditos" element={<ListarCredito />} />
            <Route
              path="listarCreditoPorcliente"
              element={<ListarCreditosPorCliente />}
            />
            <Route path="listarcliente" element={<ListarCliente />} />
            <Route path="listarUsuario" element={<ListarUsuarios />} />
            <Route
              path="modificarUsuario/:idRegistro"
              element={<ModificarUsuario />}
            />

            <Route path="Dashboard/estadisticas" element={<Dashboard />} />

            {/* Ruta para el detalle del crédito */}
            <Route
              path="creditos/:id/:idCliente"
              element={<DetalleCredito />}
            />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;


