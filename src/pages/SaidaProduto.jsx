import { useEffect, useState } from 'react';
import axios from 'axios';
import './SaidaProduto.css';

const SaidaProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantidadeSaida, setQuantidadeSaida] = useState('');

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      alert('Erro ao carregar produtos. Tente novamente.');
    }
  };

  const handleSaida = async () => {
    if (!selectedProduct || !quantidadeSaida) {
      alert('Por favor, selecione um produto e insira a quantidade.');
      return;
    }

    try {
      // Registrar a saída do produto
      const response = await axios.post(`http://localhost:5000/api/produtos/saida/${selectedProduct}`, { quantidadeSaida });

      // Verifica se a saída foi bem-sucedida
      if (response.status === 200) {
        // Verifica se a rota de transações existe antes de chamar
        try {
          await axios.post('http://localhost:5000/api/transacoes', {
            tipo: 'Saída',
            data: new Date(),
            produto: selectedProduct,
            quantidade: quantidadeSaida,
            valor: produtos.find(produto => produto._id === selectedProduct)?.valor * quantidadeSaida,
          });
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
      <button onClick={handleSaida} className="submit-button">Registrar Saída</button>
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
