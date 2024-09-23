import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    document.body.classList.add('login-background');

    // Remove a classe quando o componente é desmontado
    return () => {
      document.body.classList.remove('login-background');
    };
  }, []);


  const handleLogin = () => {
    // Aqui você pode adicionar validação para email e senha
    login();
    navigate('/produtos');
  };

  return (
    
    <div className="login-container">
     
      <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <img src="/logo.png" alt="Logo" className="logo" /> {/* Logo acima do formulário */}
        <h1 className="form-title">Login</h1> {/* Título do formulário dentro do formulário */}
        
        <label htmlFor="email">Usuário:</label> {/* Rótulo para o campo de email */}
        <input
          id="email"
          type="email"
          placeholder="Digite seu usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        
        <label htmlFor="senha">Senha:</label> {/* Rótulo para o campo de senha */}
        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="login-input"
        />
        
        <button type="submit" className="login-button">Login</button>
      </form>
      <footer className="footer">
        <p className="company-name">MP_Lubrificantes  © {new Date().getFullYear()}</p> {/* Copyright */}
      </footer>
    </div>
  );
};

export default LoginPage;
