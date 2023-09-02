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
import Navbar from "./componentes/Navbar/Header";
import Cliente from "./componentes/Cliente/cliente";
import ListarCliente from "./componentes/Cliente/ListarClientes";
import RegistrarCredito from "./componentes/credito/RegistrarCredito"
import  ListarCreditosPorCliente from "./componentes/credito/ListarCreditosPorCliente";
import CreditosEstadisticas from "./componentes/Estadisticas/CreditosPorMes";
import Detallecredito from "./componentes/detalleCredito/detallecredito"
import Pagos from "./componentes/pagos/pagos";
import Home from "./componentes/Home/Home";
import Layout from "./componentes/Sidebar/Layout";
import useAuth from "./hooks/useAuth"; // Importa el hook useAuth
import ProtectedWrapper from "./componentes/Auth/Providers/ProtectedWrapper";

const App = () => {
  const { handleLoginSuccess, isLoggedIn } = useAuth(); // Utiliza el hook useAuth
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
          {/* Rutas protegidas */}
          <Route path="/dashboard/*" element={<Layout />}>
           
              {/* Rutas secundarias dentro de /dashboard */}
              <Route path="home" element={<Home />} />
              <Route path="crear" element={<Cliente />} />
              <Route path="registrar-credito" element={<RegistrarCredito />} />
              <Route path="registrar-Pagos" element={<Pagos />} />
              <Route path="detallecredito" element={<Detallecredito />} />
              <Route
                path="listarCreditoPorcliente"
                element={<ListarCreditosPorCliente />}
              />
              <Route path="listarcliente" element={<ListarCliente />} />
              <Route path="estadisticas" element={<CreditosEstadisticas />} />
            
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

















/*
 <Router>
          <Routes>
            {/* Rutas para la página de inicio de sesión y registro /}
            <Route
              path="/inicio-sesion"
              element={<InicioSesion onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/registro" element={<RegistroForm />} />
            <Route path="crear" element={<Cliente />} />

            {/* Rutas protegidas /}
            {isLoggedIn ? (
              <>
                {/* Rutas dentro del Layout /}
                <Route path="/dashboard/*" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="listarcliente" element={<ListarCliente />} />
                </Route>
              </>
            ) : (
              // Redirigir a /inicio-sesion si el usuario no está autenticado
              <Route
                path="*"
                element={<Navigate to="/inicio-sesion" replace />}
              />
            )}
          </Routes>
        </Router>
 
 */





/*
   
      {/* Proporciona el QueryClient en el QueryClientProvider /}
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Rutas para la página de inicio de sesión y registro /}
            <Route
              path="/inicio-sesion"
              element={<InicioSesion onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/registro" element={<RegistroForm />} />
            <Route path="/registrar-credito" element={<Credito />} />

            {/* Rutas protegidas /}
            {isLoggedIn ? (
              <>
                {/* Rutas dentro del Layout /}
                <Route path="/dashboard/*" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="crear" element={<Cliente />} />
                  <Route path="listarcliente" element={<ListarCliente />} />
                </Route>
              </>
            ) : (
              // Redirigir a /inicio-sesion si el usuario no está autenticado
              <Route
                path="*"
                element={<Navigate to="/inicio-sesion" replace />}
              />
            )}
          </Routes>
        </Router>
      </QueryClientProvider>
    
*/