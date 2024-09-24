import { useEffect, useState } from 'react';
import axios from 'axios';
import './SaidaProduto.css';

const SaidaProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantidadeSaida, setQuantidadeSaida] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(''); // Estado de erro

  const fetchProdutos = async () => {
    setLoading(true); // Começar o carregamento
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/produtos`); // Usando variável de ambiente
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Erro ao carregar produtos. Tente novamente.'); // Atualiza o estado de erro
    } finally {
      setLoading(false); // Terminar o carregamento
    }
  };

  const handleSaida = async () => {
    if (!selectedProduct || !quantidadeSaida) {
      alert('Por favor, selecione um produto e insira a quantidade.');
      return;
    }

    const quantidadeDisponivel = produtos.find(produto => produto._id === selectedProduct)?.quantidade;

    if (quantidadeSaida > quantidadeDisponivel) {
      alert('Quantidade solicitada excede o estoque disponível.');
      return;
    }

    try {
      // Registrar a saída do produto
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/produtos/saida/${selectedProduct}`, { quantidadeSaida }); // Usando variável de ambiente

      // Verifica se a saída foi bem-sucedida
      if (response.status === 200) {
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/transacoes`, {
            tipo: 'Saída',
            data: new Date(),
            produto: selectedProduct,
            quantidade: quantidadeSaida,
            valor: produtos.find(produto => produto._id === selectedProduct)?.valor * quantidadeSaida,
          }); // Usando variável de ambiente
        } catch (error) {
          console.error('Erro ao registrar a transação:', error);
        }

        alert('Saída de produto realizada com sucesso!');
        fetchProdutos(); // Atualiza a lista de produtos
        setSelectedProduct(''); // Limpa a seleção
        setQuantidadeSaida(''); // Limpa o input de quantidade
      }
    } catch (error) {
      console.error('Erro ao realizar saída de produto:', error);
      alert('Erro ao realizar a saída de produto. Verifique a quantidade e tente novamente.');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="saida-container">
      <h2>Saída de Produto</h2>
      {loading ? (
        <p>Carregando produtos...</p> // Mensagem de carregamento
      ) : (
        <>
          {error && <div className="error-message">{error}</div>} {/* Exibir mensagem de erro */}
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="product-select"
          >
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto._id} value={produto._id}>
                {produto.nome}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            placeholder="Quantidade de Saída"
            value={quantidadeSaida}
            onChange={(e) => setQuantidadeSaida(e.target.value)}
            className="quantity-input"
          />
          <button onClick={handleSaida} className="submit-button" disabled={loading}>
            Registrar Saída
          </button>
        </>
      )}
    </div>
  );
};

export default SaidaProduto;










// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './SaidaProduto.css';

// const SaidaProduto = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [quantidadeSaida, setQuantidadeSaida] = useState('');

//   const fetchProdutos = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/produtos`); // Usando variável de ambiente
//       setProdutos(response.data);
//     } catch (error) {
//       console.error('Erro ao buscar produtos:', error);
//       alert('Erro ao carregar produtos. Tente novamente.');
//     }
//   };

//   const handleSaida = async () => {
//     if (!selectedProduct || !quantidadeSaida) {
//       alert('Por favor, selecione um produto e insira a quantidade.');
//       return;
//     }

//     try {
//       // Registrar a saída do produto
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/produtos/saida/${selectedProduct}`, { quantidadeSaida }); // Usando variável de ambiente

//       // Verifica se a saída foi bem-sucedida
//       if (response.status === 200) {
//         // Verifica se a rota de transações existe antes de chamar
//         try {
//           await axios.post(`${process.env.REACT_APP_API_URL}/transacoes`, {
//             tipo: 'Saída',
//             data: new Date(),
//             produto: selectedProduct,
//             quantidade: quantidadeSaida,
//             valor: produtos.find(produto => produto._id === selectedProduct)?.valor * quantidadeSaida,
//           }); // Usando variável de ambiente
//         } catch (error) {
//           console.error('Erro ao registrar a transação:', error);
//         }

//         alert('Saída de produto realizada com sucesso!');
//         fetchProdutos(); // Atualiza a lista de produtos
//         setSelectedProduct(''); // Limpa a seleção
//         setQuantidadeSaida(''); // Limpa o input de quantidade
//       }
//     } catch (error) {
//       console.error('Erro ao realizar saída de produto:', error);
//       alert('Erro ao realizar a saída de produto. Verifique a quantidade e tente novamente.');
//     }
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   return (
//     <div className="saida-container">
//       <h2>Saída de Produto</h2>
//       <select
//         value={selectedProduct}
//         onChange={(e) => setSelectedProduct(e.target.value)}
//         className="product-select"
//       >
//         <option value="">Selecione um produto</option>
//         {produtos.map((produto) => (
//           <option key={produto._id} value={produto._id}>
//             {produto.nome}
//           </option>
//         ))}
//       </select>
//       <input
//         type="number"
//         min="1"
//         placeholder="Quantidade de Saída"
//         value={quantidadeSaida}
//         onChange={(e) => setQuantidadeSaida(e.target.value)}
//         className="quantity-input"
//       />
//       <button onClick={handleSaida} className="submit-button">Registrar Saída</button>
//     </div>
//   );
// };

// export default SaidaProduto;







// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './SaidaProduto.css';

// const SaidaProduto = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [quantidadeSaida, setQuantidadeSaida] = useState('');

//   const fetchProdutos = async () => {
//     try {
//       const response = await axios.get('https://sistema-mp.vercel.app/produtos');
//       setProdutos(response.data);
//     } catch (error) {
//       console.error('Erro ao buscar produtos:', error);
//       alert('Erro ao carregar produtos. Tente novamente.');
//     }
//   };

//   const handleSaida = async () => {
//     if (!selectedProduct || !quantidadeSaida) {
//       alert('Por favor, selecione um produto e insira a quantidade.');
//       return;
//     }

//     try {
//       // Registrar a saída do produto
//       const response = await axios.post(`https://sistema-mp.vercel.app/produtos/saida/${selectedProduct}`, { quantidadeSaida });

//       // Verifica se a saída foi bem-sucedida
//       if (response.status === 200) {
//         // Verifica se a rota de transações existe antes de chamar
//         try {
//           await axios.post('https://sistema-mp.vercel.app/transacoes', {
//             tipo: 'Saída',
//             data: new Date(),
//             produto: selectedProduct,
//             quantidade: quantidadeSaida,
//             valor: produtos.find(produto => produto._id === selectedProduct)?.valor * quantidadeSaida,
//           });
//         } catch (error) {
//           console.error('Erro ao registrar a transação:', error);
//         }

//         alert('Saída de produto realizada com sucesso!');
//         fetchProdutos(); // Atualiza a lista de produtos
//         setSelectedProduct(''); // Limpa a seleção
//         setQuantidadeSaida(''); // Limpa o input de quantidade
//       }
//     } catch (error) {
//       console.error('Erro ao realizar saída de produto:', error);
//       alert('Erro ao realizar a saída de produto. Verifique a quantidade e tente novamente.');
//     }
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   return (
//     <div className="saida-container">
//       <h2>Saída de Produto</h2>
//       <select
//         value={selectedProduct}
//         onChange={(e) => setSelectedProduct(e.target.value)}
//         className="product-select"
//       >
//         <option value="">Selecione um produto</option>
//         {produtos.map((produto) => (
//           <option key={produto._id} value={produto._id}>
//             {produto.nome}
//           </option>
//         ))}
//       </select>
//       <input
//         type="number"
//         min="1"
//         placeholder="Quantidade de Saída"
//         value={quantidadeSaida}
//         onChange={(e) => setQuantidadeSaida(e.target.value)}
//         className="quantity-input"
//       />
//       <button onClick={handleSaida} className="submit-button">Registrar Saída</button>
//     </div>
//   );
// };

// export default SaidaProduto;





// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './SaidaProduto.css';

// const SaidaProduto = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [quantidadeSaida, setQuantidadeSaida] = useState('');

//   const fetchProdutos = async () => {
//     const response = await axios.get('http://localhost:5000/api/produtos');
//     setProdutos(response.data);
//   };

//   const handleSaida = async () => {
//     try {
//       // Registrar a saída do produto
//       await axios.post(`http://localhost:5000/api/produtos/saida/${selectedProduct}`, { quantidadeSaida });

//       // Registrar a transação no relatório
//       await axios.post('http://localhost:5000/api/transacoes', {
//         tipo: 'Saída',
//         data: new Date(),
//         produto: selectedProduct, // Aqui você pode substituir pelo nome do produto se necessário
//         quantidade: quantidadeSaida,
//         valor: produtos.find(produto => produto._id === selectedProduct)?.valor * quantidadeSaida // Calcula o valor total da saída
//       });

//       alert('Saída de produto realizada com sucesso!');
//       fetchProdutos(); // Atualiza a lista de produtos
//       setSelectedProduct(''); // Limpa a seleção
//       setQuantidadeSaida(''); // Limpa o input de quantidade
//     } catch (error) {
//       console.error('Erro ao realizar saída de produto:', error);
//       alert('Erro ao realizar a saída de produto. Verifique a quantidade e tente novamente.');
//     }
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   return (
//     <div className="saida-container">
//       <h2>Saída de Produto</h2>
//       <select
//         value={selectedProduct}
//         onChange={(e) => setSelectedProduct(e.target.value)}
//         className="product-select"
//       >
//         <option value="">Selecione um produto</option>
//         {produtos.map((produto) => (
//           <option key={produto._id} value={produto._id}>
//             {produto.nome}
//           </option>
//         ))}
//       </select>
//       <input
//         type="number"
//         min="1"
//         placeholder="Quantidade de Saída"
//         value={quantidadeSaida}
//         onChange={(e) => setQuantidadeSaida(e.target.value)}
//         className="quantity-input"
//       />
//       <button onClick={handleSaida} className="submit-button">Registrar Saída</button>
//     </div>
//   );
// };

// export default SaidaProduto;











// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './SaidaProduto.css';

// const SaidaProduto = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [quantidadeSaida, setQuantidadeSaida] = useState('');

//   const fetchProdutos = async () => {
//     const response = await axios.get('http://localhost:5000/api/produtos');
//     setProdutos(response.data);
//   };

//   const handleSaida = async () => {
//     try {
//       await axios.post(`http://localhost:5000/api/produtos/saida/${selectedProduct}`, { quantidadeSaida: quantidadeSaida });
//       alert('Saída de produto realizada com sucesso!');
//       fetchProdutos(); // Atualiza a lista de produtos
//       setSelectedProduct(''); // Limpa a seleção
//       setQuantidadeSaida(''); // Limpa o input de quantidade
//     } catch (error) {
//       console.error('Erro ao realizar saída de produto:', error);
//       alert('Erro ao realizar a saída de produto. Verifique a quantidade e tente novamente.');
//     }
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   return (
//     <div className="saida-container">
//       <h2>Saída de Produto</h2>
//       <select
//         value={selectedProduct}
//         onChange={(e) => setSelectedProduct(e.target.value)}
//         className="product-select"
//       >
//         <option value="">Selecione um produto</option>
//         {produtos.map((produto) => (
//           <option key={produto._id} value={produto._id}>
//             {produto.nome}
//           </option>
//         ))}
//       </select>
//       <input
//         type="number"
//         min="1"
//         placeholder="Quantidade de Saída"
//         value={quantidadeSaida}
//         onChange={(e) => setQuantidadeSaida(e.target.value)}
//         className="quantity-input"
//       />
//       <button onClick={handleSaida} className="submit-button">Registrar Saída</button>
//     </div>
//   );
// };

// export default SaidaProduto;










/***********************************/


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './SaidaProduto.css';

// const SaidaProduto = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [quantidadeSaida, setQuantidadeSaida] = useState('');

//   const fetchProdutos = async () => {
//     const response = await axios.get('http://localhost:5000/api/produtos');
//     setProdutos(response.data);
//   };

//   const handleSaida = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/produtos/${selectedProduct}`, { quantidade: quantidadeSaida });
//       alert('Saída de produto realizada com sucesso!');
//       fetchProdutos(); // Atualiza a lista de produtos
//     } catch (error) {
//       console.error('Erro ao realizar saída de produto:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   return (
//     <div className="saida-container">
//       <h2>Saída de Produto</h2>
//       <select
//         value={selectedProduct}
//         onChange={(e) => setSelectedProduct(e.target.value)}
//         className="product-select"
//       >
//         <option value="">Selecione um produto</option>
//         {produtos.map((produto) => (
//           <option key={produto._id} value={produto._id}>
//             {produto.nome}
//           </option>
//         ))}
//       </select>
//       <input
//         type="number"
//         placeholder="Quantidade de Saída"
//         value={quantidadeSaida}
//         onChange={(e) => setQuantidadeSaida(e.target.value)}
//         className="quantity-input"
//       />
//       <button onClick={handleSaida} className="submit-button">Registrar Saída</button>
//     </div>
//   );
// };

// export default SaidaProduto;
