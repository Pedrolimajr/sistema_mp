import { useEffect, useState } from 'react';
import axios from 'axios';
import './EntradaProduto.css';

const EntradaProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantidadeEntrada, setQuantidadeEntrada] = useState('');
  const [produtoEncontrado, setProdutoEncontrado] = useState(null);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/produtos`); // Usando variável de ambiente
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleProductChange = (e) => {
    const id = e.target.value;
    setSelectedProduct(id);
    
    const produto = produtos.find(produto => produto._id === id);
    if (produto) {
      setProdutoEncontrado(produto);
      setQuantidadeEntrada(''); // Resetar a quantidade ao selecionar um novo produto
    } else {
      setProdutoEncontrado(null);
    }
  };

  const handleEntrada = async () => {
    if (!quantidadeEntrada || quantidadeEntrada <= 0) {
      alert('Por favor, insira uma quantidade válida.');
      return;
    }

    try {
      // Atualiza a quantidade do produto no banco de dados
      await axios.put(`${process.env.REACT_APP_API_URL}/api/produtos/entrada/${selectedProduct}`, { 
        quantidade: Number(quantidadeEntrada)
      });

      // Registrar a transação de entrada
      await axios.post(`${process.env.REACT_APP_API_URL}/api/movimentacoes`, {
        tipo: 'entrada', // Certifique-se de que o tipo esteja correto
        data: new Date(),
        produtoId: selectedProduct, // Usar o ID do produto
        quantidade: Number(quantidadeEntrada),
        valor: produtoEncontrado.valor * quantidadeEntrada
      });

      alert('Entrada de produto realizada com sucesso!');

      // Atualiza a lista de produtos
      fetchProdutos();

      // Resetar estados
      setSelectedProduct('');
      setQuantidadeEntrada('');
      setProdutoEncontrado(null);
    } catch (error) {
      console.error('Erro ao realizar entrada de produto:', error.response ? error.response.data : error);
      alert('Erro ao realizar a entrada de produto. Tente novamente.'); // Alert de erro para o usuário
    }
  };

  return (
    <div className="entrada-container">
      <h2>Entrada de Produto</h2>

      <label>Selecionar Produto</label>
      <select
        value={selectedProduct}
        onChange={handleProductChange}
        className="product-select"
      >
        <option value="">Selecione um produto</option>
        {produtos.map((produto) => (
          <option key={produto._id} value={produto._id}>
            {produto.nome}
          </option>
        ))}
      </select>

      {produtoEncontrado && (
        <div>
          <p><strong>Produto encontrado:</strong> {produtoEncontrado.nome} - {produtoEncontrado.descricao}</p>
        </div>
      )}

      <label>Quantidade de Entrada</label>
      <input
        type="number"
        min="1"
        placeholder="Quantidade de Entrada"
        value={quantidadeEntrada}
        onChange={(e) => setQuantidadeEntrada(e.target.value)}
        className="quantity-input"
      />
      <button onClick={handleEntrada} className="submit-button">Registrar Entrada</button>
    </div>
  );
};

export default EntradaProduto;


















// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './EntradaProduto.css';

// const EntradaProduto = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [quantidadeEntrada, setQuantidadeEntrada] = useState('');
//   const [produtoEncontrado, setProdutoEncontrado] = useState(null);

//   const fetchProdutos = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/produtos');
//       setProdutos(response.data);
//     } catch (error) {
//       console.error('Erro ao buscar produtos:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   const handleProductChange = (e) => {
//     const id = e.target.value;
//     setSelectedProduct(id);
    
//     const produto = produtos.find(produto => produto._id === id);
//     if (produto) {
//       setProdutoEncontrado(produto);
//       setQuantidadeEntrada('');
//     } else {
//       setProdutoEncontrado(null);
//     }
//   };

// const handleEntrada = async () => {
//   if (!quantidadeEntrada || quantidadeEntrada <= 0) {
//     alert('Por favor, insira uma quantidade válida.');
//     return;
//   }

//   try {
//     // Atualiza a quantidade do produto no banco de dados
//     await axios.put(`https://sistema-mp.vercel.app/produtos/entrada/${selectedProduct}`, { 
//       quantidade: Number(quantidadeEntrada)
//     });

//     // Registrar a transação de entrada
//     await axios.post('https://sistema-mp.vercel.app/movimentacoes', {
//       tipo: 'entrada', // Certifique-se de que o tipo esteja correto
//       data: new Date(),
//       produtoId: selectedProduct, // Usar o ID do produto
//       quantidade: Number(quantidadeEntrada),
//       valor: produtoEncontrado.valor * quantidadeEntrada
//     });

//     alert('Entrada de produto realizada com sucesso!');

//     // Atualiza a lista de produtos
//     fetchProdutos();

//     // Resetar estados
//     setSelectedProduct('');
//     setQuantidadeEntrada('');
//     setProdutoEncontrado(null);
//   } catch (error) {
//     console.error('Erro ao realizar entrada de produto:', error.response ? error.response.data : error);
//     // alert('Erro ao realizar a entrada de produto. Tente novamente.');
//   }
// };


//   return (
//     <div className="entrada-container">
//       <h2>Entrada de Produto</h2>

//       <label>Selecionar Produto</label>
//       <select
//         value={selectedProduct}
//         onChange={handleProductChange}
//         className="product-select"
//       >
//         <option value="">Selecione um produto</option>
//         {produtos.map((produto) => (
//           <option key={produto._id} value={produto._id}>
//             {produto.nome}
//           </option>
//         ))}
//       </select>

//       {produtoEncontrado && (
//         <div>
//           <p><strong>Produto encontrado:</strong> {produtoEncontrado.nome} - {produtoEncontrado.descricao}</p>
//         </div>
//       )}

//       <label>Quantidade de Entrada</label>
//       <input
//         type="number"
//         min="1"
//         placeholder="Quantidade de Entrada"
//         value={quantidadeEntrada}
//         onChange={(e) => setQuantidadeEntrada(e.target.value)}
//         className="quantity-input"
//       />
//       <button onClick={handleEntrada} className="submit-button">Registrar Entrada</button>
//     </div>
//   );
// };

// export default EntradaProduto;












// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './EntradaProduto.css';

// const EntradaProduto = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState('');
//   const [quantidadeEntrada, setQuantidadeEntrada] = useState('');
//   const [idProduto, setIdProduto] = useState('');
//   const [produtoEncontrado, setProdutoEncontrado] = useState(null); // Estado para armazenar o produto encontrado

//   const fetchProdutos = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/produtos');
//       setProdutos(response.data);
//     } catch (error) {
//       console.error('Erro ao buscar produtos:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   const handleIdChange = (e) => {
//     const id = e.target.value;
//     setIdProduto(id);
    
//     // Busca o produto correspondente ao ID
//     const produto = produtos.find(produto => produto._id === id);
//     if (produto) {
//       setProdutoEncontrado(produto); // Atualiza o produto encontrado
//       setSelectedProduct(produto._id); // Atualiza o produto selecionado
//       setQuantidadeEntrada(''); // Limpa a quantidade ao mudar o ID
//     } else {
//       setProdutoEncontrado(null); // Limpa o produto encontrado se não achar
//       setSelectedProduct(''); // Limpa o produto selecionado se não encontrar
//     }
//   };

//   const handleEntrada = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/produtos/${selectedProduct}`, { quantidade: quantidadeEntrada });

//       await axios.post('http://localhost:5000/api/transacoes', {
//         tipo: 'Entrada',
//         data: new Date(),
//         produto: selectedProduct,
//         quantidade: quantidadeEntrada,
//         valor: produtoEncontrado.valor * quantidadeEntrada // Calcula o valor total da entrada
//       });

//       alert('Entrada de produto realizada com sucesso!');
//       fetchProdutos();
//       setSelectedProduct('');
//       setQuantidadeEntrada('');
//       setIdProduto('');
//       setProdutoEncontrado(null); // Limpa o produto encontrado
//     } catch (error) {
//       console.error('Erro ao realizar entrada de produto:', error);
//     }
//   };

//   return (
//     <div className="entrada-container">
//       <h2>Entrada de Produto</h2>
//       <label>ID do Produto</label>
//       <input
//         type="text"
//         placeholder="Digite o ID do produto"
//         value={idProduto}
//         onChange={handleIdChange}
//         className="product-select"
//       />
//       {produtoEncontrado && (
//         <div>
//           <p><strong>Produto encontrado:</strong> {produtoEncontrado.nome} - {produtoEncontrado.descricao}</p>
//         </div>
//       )}
//       <label>Selecionar Produto</label>
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
//       <label>Quantidade de Entrada</label>
//       <input
//         type="number"
//         placeholder="Quantidade de Entrada"
//         value={quantidadeEntrada}
//         onChange={(e) => setQuantidadeEntrada(e.target.value)}
//         className="quantity-input"
//       />
//       <button onClick={handleEntrada} className="submit-button">Registrar Entrada</button>
//     </div>
//   );
// };

// export default EntradaProduto;


