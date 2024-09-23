import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import CadastroProduto from './pages/CadastroProduto';
import Produtos from './pages/Produtos';
import SaidaProduto from './pages/SaidaProduto';
import EntradaProduto from './pages/EntradaProduto';
import Relatorio from './pages/Relatorio';
import Tabela from './pages/Tabela'; // Importando a nova página Tabela

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWithNavbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/produtos" element={<ProtectedRoute><Produtos /></ProtectedRoute>} />
          <Route path="/cadastro-produto" element={<ProtectedRoute><CadastroProduto /></ProtectedRoute>} />
          <Route path="/saida-produto" element={<ProtectedRoute><SaidaProduto /></ProtectedRoute>} />
          <Route path="/entrada" element={<ProtectedRoute><EntradaProduto /></ProtectedRoute>} />
          <Route path="/relatorio" element={<ProtectedRoute><Relatorio /></ProtectedRoute>} />
          <Route path="/tabela" element={<ProtectedRoute><Tabela /></ProtectedRoute>} /> {/* Nova rota para Tabela */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const LayoutWithNavbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && <Navbar />}
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;





// import PropTypes from 'prop-types';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import CadastroProduto from './pages/CadastroProduto';
// import Produtos from './pages/Produtos';
// import SaidaProduto from './pages/SaidaProduto';
// import Relatorio from './pages/Relatorio';
// import { AuthProvider, AuthContext } from './context/AuthContext';
// import { useContext } from 'react';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/produtos" element={<ProtectedRoute><Produtos /></ProtectedRoute>} />
//           <Route path="/cadastro-produto" element={<ProtectedRoute><CadastroProduto /></ProtectedRoute>} />
//           <Route path="/saida-produto" element={<ProtectedRoute><SaidaProduto /></ProtectedRoute>} />
//           <Route path="/relatorio" element={<ProtectedRoute><Relatorio /></ProtectedRoute>} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useContext(AuthContext);
//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// ProtectedRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default App;




