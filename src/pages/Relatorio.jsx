import { useEffect, useState } from 'react';
import axios from 'axios';
import './Relatorio.css'; // Importando o CSS

const Relatorio = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [error, setError] = useState('');

  const fetchMovimentacoes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/produtos/movimentacoes`); // Usando variável de ambiente
      setMovimentacoes(response.data);
    } catch (err) {
      setError(`Erro ao buscar movimentações: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/movimentacoes/${id}`); // Usando variável de ambiente
      setMovimentacoes(movimentacoes.filter(mov => mov._id !== id));
    } catch (err) {
      setError(`Erro ao excluir movimentação: ${err.response ? err.response.data : err.message}`);
    }
  };

  useEffect(() => {
    fetchMovimentacoes();
  }, []);

  return (
    <div className="relatorio-container">
      <h1 className="titulo-relatorio">Relatórios de Movimentações</h1>

      {error && <div className="error-message">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID do Produto</th>
            <th>Nome do Produto</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.map((mov) => (
            <tr key={mov._id}>
              <td>{mov.produtoId ? mov.produtoId._id : 'N/A'}</td>
              <td>{mov.produtoId ? mov.produtoId.nome : 'N/A'}</td>
              <td>{mov.tipo}</td>
              <td>{mov.quantidade}</td>
              <td>{new Date(mov.data).toLocaleString()}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(mov._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Relatorio;

















// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Relatorio.css'; // Importando o CSS

// const Relatorio = () => {
//   const [movimentacoes, setMovimentacoes] = useState([]);
//   const [error, setError] = useState('');

//   const fetchMovimentacoes = async () => {
//     try {
//       const response = await axios.get('https://sistema-mp.vercel.app/produtos/movimentacoes');
//       setMovimentacoes(response.data);
//     } catch (err) {
//       setError(`Erro ao buscar movimentações: ${err.response ? err.response.data : err.message}`);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://sistema-mp.vercel.app/movimentacoes/${id}`);
//       setMovimentacoes(movimentacoes.filter(mov => mov._id !== id));
//     } catch (err) {
//       setError(`Erro ao excluir movimentação: ${err.response ? err.response.data : err.message}`);
//     }
//   };

//   useEffect(() => {
//     fetchMovimentacoes();
//   }, []);

//   return (
//     <div className="relatorio-container">
//       <h1 className="titulo-relatorio">Relatórios de Movimentações</h1>

//       {error && <div className="error-message">{error}</div>}
//       <table>
//         <thead>
//           <tr>
//             <th>ID do Produto</th>
//             <th>Nome do Produto</th>
//             <th>Tipo</th>
//             <th>Quantidade</th>
//             <th>Data</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {movimentacoes.map((mov) => (
//             <tr key={mov._id}>
//               <td>{mov.produtoId ? mov.produtoId._id : 'N/A'}</td>
//               <td>{mov.produtoId ? mov.produtoId.nome : 'N/A'}</td>
//               <td>{mov.tipo}</td>
//               <td>{mov.quantidade}</td>
//               <td>{new Date(mov.data).toLocaleString()}</td>
//               <td>
//                 <button className="delete-button" onClick={() => handleDelete(mov._id)}>Excluir</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Relatorio;







// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Relatorio.css';

// const Relatorio = () => {
//   const [transacoes, setTransacoes] = useState([]);

//   const fetchTransacoes = async () => {
//     const response = await axios.get('http://localhost:5000/api/transacoes');
//     setTransacoes(response.data);
//   };

//   useEffect(() => {
//     fetchTransacoes();
//   }, []);

//   return (
//     <div className="relatorio-container">
//       <h2>Relatório de Transações</h2>
//       <table className="relatorio-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Produto</th>
//             <th>Quantidade</th>
//             <th>Data</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transacoes.map((transacao) => (
//             <tr key={transacao._id}>
//               <td>{transacao.id}</td>
//               <td>{transacao.produtoNome}</td>
//               <td>{transacao.quantidade}</td>
//               <td>{new Date(transacao.data).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Relatorio;

