import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  // Se a rota atual for /, não renderiza a navegação (considerando que é a tela de login)
  if (location.pathname === '/') {
    return null;
  }

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className={`navbar ${isActive ? 'active' : ''}`}>
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="menu-hamburguer" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Login</Link></li>
        <li><Link to="/produtos">Produtos</Link></li>
        <li><Link to="/saida-produto">Saída de Produtos</Link></li>
        <li><Link to="/entrada">Entrada de Produtos</Link></li>
        <li><Link to="/cadastro-produto">Cadastro de Produtos</Link></li>
        <li><Link to="/relatorio">Relatório</Link></li>
        <li><Link to="/tabela">Tabela</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;






// import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   const location = useLocation();

//   // Se a rota atual for /, não renderiza a navegação (considerando que é a tela de login)
//   if (location.pathname === '/') {
//     return null;
//   }

//   return (
//     <nav className='navbar'>
//       <div className="navbar-logo">
//         <img src="/logo.png" alt="Logo" /> {/* Caminho relativo à pasta public */}
       
//       </div>
//       <ul className="navbar-menu">
//         <li><Link to="/">Login</Link></li>  {/* Login */}
//         <li><Link to="/produtos">Produtos</Link></li>
//         <li><Link to="/saida-produto">Saída de Produtos</Link></li>
//         <li><Link to="/entrada">Entrada de Produtos</Link></li>
//         <li><Link to="/cadastro-produto">Cadastro de Produtos</Link></li>
//         <li><Link to="/relatorio">Relatório</Link></li>
//         <li><Link to="/tabela">Tabela</Link></li> {/* Nova opção para a Tabela */}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

