import { useEffect, useState } from 'react';
import axios from 'axios';
import './Produtos.css';
import searchIcon from '../assets/search-icon.png'; 

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/produtos`);
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este produto?')) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <div className="produtos-container">
      <h2>Produtos</h2>
      <div className="pesquisa-container">
        <img src={searchIcon} alt="Pesquisar" className="search-icon" />
        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          className="pesquisa-input"
        />
      </div>
      {produtosFiltrados.length > 0 ? (
        <table className="produtos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Valor</th>
              <th>Quantidade</th>
              <th>Data de Entrada</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto) => (
              <tr key={produto._id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{formatCurrency(produto.valor)}</td>
                <td>{`${produto.quantidade} ${produto.unidade}`}</td>
                <td>{new Date(produto.dataEntrada).toLocaleDateString()}</td>
                <td>
                  <button className="remove-button" onClick={() => handleDelete(produto._id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  );
};

export default Produtos;












// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Produtos.css';
// import searchIcon from '../assets/search-icon.png'; // Ajuste o caminho conforme necessário

// const Produtos = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [termoPesquisa, setTermoPesquisa] = useState('');

//   const fetchProdutos = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/produtos`); // Usando variável de ambiente
//       setProdutos(response.data);
//     } catch (error) {
//       console.error('Erro ao buscar produtos:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_API_URL}/produtos/${id}`); // Usando variável de ambiente
//       fetchProdutos();
//     } catch (error) {
//       console.error('Erro ao remover produto:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//     }).format(value);
//   };

//   const produtosFiltrados = produtos.filter(produto =>
//     produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
//   );

//   return (
//     <div className="produtos-container">
//       <h2>Produtos</h2>
//       <div className="pesquisa-container">
//         <img src={searchIcon} alt="Pesquisar" className="search-icon" />
//         <input
//           type="text"
//           placeholder="Pesquisar produto..."
//           value={termoPesquisa}
//           onChange={(e) => setTermoPesquisa(e.target.value)}
//           className="pesquisa-input"
//         />
//       </div>
//       <table className="produtos-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nome</th>
//             <th>Valor</th>
//             <th>Quantidade</th>
//             <th>Data de Entrada</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {produtosFiltrados.map((produto) => (
//             <tr key={produto._id}>
//               <td>{produto.id}</td>
//               <td>{produto.nome}</td>
//               <td>{formatCurrency(produto.valor)}</td>
//               <td>{`${produto.quantidade} ${produto.unidade}`}</td>
//               <td>{new Date(produto.dataEntrada).toLocaleDateString()}</td>
//               <td>
//                 <button className="remove-button" onClick={() => handleDelete(produto._id)}>Remover</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Produtos;












// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Produtos.css';
// import searchIcon from '../assets/search-icon.png'; // Ajuste o caminho conforme necessário

// const Produtos = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [termoPesquisa, setTermoPesquisa] = useState('');

//   const fetchProdutos = async () => {
//     const response = await axios.get('https://sistema-mp.vercel.app/produtos');
//     setProdutos(response.data);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`https://sistema-mp.vercel.app/produtos/${id}`);
//     fetchProdutos();
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//     }).format(value);
//   };

//   const produtosFiltrados = produtos.filter(produto =>
//     produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
//   );

//   return (
//     <div className="produtos-container">
//       <h2>Produtos</h2>
//       <div className="pesquisa-container">
//         <img src={searchIcon} alt="Pesquisar" className="search-icon" />
//         <input
//           type="text"
//           placeholder="Pesquisar produto..."
//           value={termoPesquisa}
//           onChange={(e) => setTermoPesquisa(e.target.value)}
//           className="pesquisa-input"
//         />
//       </div>
//       <table className="produtos-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nome</th>
//             <th>Valor</th>
//             <th>Quantidade</th>
//             <th>Data de Entrada</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {produtosFiltrados.map((produto) => (
//             <tr key={produto._id}>
//               <td>{produto.id}</td>
//               <td>{produto.nome}</td>
//               <td>{formatCurrency(produto.valor)}</td>
//               <td>{`${produto.quantidade} ${produto.unidade}`}</td>
//               <td>{new Date(produto.dataEntrada).toLocaleDateString()}</td>
//               <td>
//                 <button className="remove-button" onClick={() => handleDelete(produto._id)}>Remover</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Produtos;







// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Produtos.css';

// const Produtos = () => {
//   const [produtos, setProdutos] = useState([]);

//   const fetchProdutos = async () => {
//     const response = await axios.get('http://localhost:5000/api/produtos');
//     setProdutos(response.data);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/produtos/${id}`);
//     fetchProdutos();
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//     }).format(value);
//   };

//   return (
//     <div className="produtos-container">
//       <h2>Produtos</h2>
//       <table className="produtos-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nome</th>
//             <th>Valor</th>
//             <th>Quantidade</th>
//             <th>Data de Entrada</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {produtos.map((produto) => (
//             <tr key={produto._id}>
//               <td>{produto.id}</td>
//               <td>{produto.nome}</td>
//               <td>{formatCurrency(produto.valor)}</td>
//               <td>{`${produto.quantidade} ${produto.unidade}`}</td> {/* Exibindo quantidade com unidade */}
//               <td>{new Date(produto.dataEntrada).toLocaleDateString()}</td>
//               <td>
//                 <button className="remove-button" onClick={() => handleDelete(produto._id)}>Remover</button>
//                 {/* Implementar edição aqui */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Produtos;












// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Produtos.css';

// const Produtos = () => {
//   const [produtos, setProdutos] = useState([]);

//   const fetchProdutos = async () => {
//     const response = await axios.get('http://localhost:5000/api/produtos');
//     setProdutos(response.data);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/produtos/${id}`);
//     fetchProdutos();
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);
//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//     }).format(value);
//   };

//   return (
//     <div className="produtos-container">
//       <h2>Produtos</h2>
//       <table className="produtos-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nome</th>
//             <th>Valor</th>
//             <th>Quantidade</th>
//             <th>Data de Entrada</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {produtos.map((produto) => (
//             <tr key={produto._id}>
//               <td>{produto.id}</td>
//               <td>{produto.nome}</td>
//               <td>{formatCurrency(produto.valor)}</td>
//               <td>{produto.quantidade}</td>
//               <td>{new Date(produto.dataEntrada).toLocaleDateString()}</td>
//               <td>
//                 <button className="remove-button" onClick={() => handleDelete(produto._id)}>Remover</button>
//                 {/* Implementar edição aqui */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Produtos;
