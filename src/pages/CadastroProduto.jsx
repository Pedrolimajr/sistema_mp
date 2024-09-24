import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './CadastroProduto.css';
import { useState } from 'react';

const CadastroProduto = () => {
  const [quantidade, setQuantidade] = useState(1); // Estado para controlar a quantidade
  const [unidade, setUnidade] = useState('un'); // Estado para controlar a unidade

  const validationSchema = Yup.object().shape({
    id: Yup.string().required('ID é obrigatório'),
    nome: Yup.string().required('Nome é obrigatório'),
    valor: Yup.number().required('Valor é obrigatório').positive(),
    dataEntrada: Yup.date().required('Data de entrada é obrigatória'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Cadastrar o produto
      await axios.post(`${process.env.REACT_APP_API_URL}/produtos`, { 
        ...values, 
        quantidade, 
        unidade 
      });

      // Registrar a transação no relatório
      await axios.post(`${process.env.REACT_APP_API_URL}/transacoes`, {
        tipo: 'Entrada',
        data: new Date(),
        produto: values.nome,
        quantidade: quantidade,
        valor: values.valor * quantidade // Cálculo do valor total da entrada
      });

      alert('Produto cadastrado com sucesso!');
      setQuantidade(1); // Resetar quantidade após o cadastro
      setUnidade('un'); // Resetar unidade após o cadastro

      // Resetar os campos do formulário
      resetForm(); // Resetar todos os campos do Formik
      setTimeout(() => {
        setQuantidade(1); // Resetar quantidade após o reset do formulário
        setUnidade('un'); // Resetar unidade após o reset do formulário
      }, 0);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastrar Produto:</h2>
      <Formik
        initialValues={{ id: '', nome: '', valor: '', dataEntrada: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="cadastro-form">
            <label htmlFor="id">ID:</label>
            <Field name="id" placeholder="ID" className="cadastro-input" />
            {errors.id && touched.id ? <div className="error">{errors.id}</div> : null}
            
            <label htmlFor="nome">Nome:</label>
            <Field name="nome" placeholder="Nome" className="cadastro-input" />
            {errors.nome && touched.nome ? <div className="error">{errors.nome}</div> : null}
            
            <label htmlFor="valor">Valor</label>
            <Field name="valor" placeholder="Valor" type="number" className="cadastro-input" />
            {errors.valor && touched.valor ? <div className="error">{errors.valor}</div> : null}

            {/* Container para quantidade e unidade */}
            <div className="quantidade-container">
              <label htmlFor="quantidade">Quantidade:</label>
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(parseInt(e.target.value))} // Garantir que o valor seja numérico
                className="cadastro-input quantidade-input"
                min="1" // Define o valor mínimo como 1
              />

              {/* Campo de seleção de unidade */}
              <select
                name="unidade"
                className="unidade-select"
                onChange={(e) => setUnidade(e.target.value)}
                value={unidade}
              >
                <option value="un">un.</option>
                <option value="cx">cx.</option>
                <option value="lt">lt.</option>
              </select>
            </div>

            <label htmlFor="dataEntrada">Data de Entrada:</label>
            <Field name="dataEntrada" placeholder="Data de Entrada" type="date" className="cadastro-input" />
            {errors.dataEntrada && touched.dataEntrada ? <div className="error">{errors.dataEntrada}</div> : null}

            <button type="submit" className="cadastro-button">Cadastrar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CadastroProduto;









// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import './CadastroProduto.css';
// import { useState } from 'react';

// const CadastroProduto = () => {
//   const [quantidade, setQuantidade] = useState(1); // Estado para controlar a quantidade
//   const [unidade, setUnidade] = useState('un'); // Estado para controlar a unidade

//   const validationSchema = Yup.object().shape({
//     id: Yup.string().required('ID é obrigatório'),
//     nome: Yup.string().required('Nome é obrigatório'),
//     valor: Yup.number().required('Valor é obrigatório').positive(),
//     dataEntrada: Yup.date().required('Data de entrada é obrigatória'),
//   });

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       // Cadastrar o produto
//       await axios.post('https://sistema-mp.vercel.app/produtos', { 
//         ...values, 
//         quantidade, 
//         unidade 
//       });

//       // Registrar a transação no relatório
//       await axios.post('https://sistema-mp.vercel.app/api/transacoes', {
//         tipo: 'Entrada',
//         data: new Date(),
//         produto: values.nome,
//         quantidade: quantidade,
//         valor: values.valor * quantidade // Cálculo do valor total da entrada
//       });

//       alert('Produto cadastrado com sucesso!');
//       setQuantidade(1); // Resetar quantidade após o cadastro
//       setUnidade('un'); // Resetar unidade após o cadastro

//    // Resetar os campos do formulário
//    resetForm(); // Resetar todos os campos do Formik
//    setTimeout(() => {
//      setQuantidade(1); // Resetar quantidade após o reset do formulário
//      setUnidade('un'); // Resetar unidade após o reset do formulário
//    }, 0);
//  } catch (error) {
//    console.error('Erro ao cadastrar produto:', error);
//  }
// };

//   return (
//     <div className="cadastro-container">
//       <h2>Cadastrar Produto:</h2>
//       <Formik
//         initialValues={{ id: '', nome: '', valor: '', dataEntrada: '' }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ errors, touched }) => (
//           <Form className="cadastro-form">
//             <label htmlFor="id">ID:</label>
//             <Field name="id" placeholder="ID" className="cadastro-input" />
//             {errors.id && touched.id ? <div className="error">{errors.id}</div> : null}
            
//             <label htmlFor="nome">Nome:</label>
//             <Field name="nome" placeholder="Nome" className="cadastro-input" />
//             {errors.nome && touched.nome ? <div className="error">{errors.nome}</div> : null}
            
//             <label htmlFor="valor">Valor</label>
//             <Field name="valor" placeholder="Valor" type="number" className="cadastro-input" />
//             {errors.valor && touched.valor ? <div className="error">{errors.valor}</div> : null}

//             {/* Container para quantidade e unidade */}
//             <div className="quantidade-container">
//               <label htmlFor="quantidade">Quantidade:</label>
//               <input
//                  type="number"
//                  value={quantidade}
//                  onChange={(e) => setQuantidade(parseInt(e.target.value))} // Garantir que o valor seja numérico
//                  className="cadastro-input quantidade-input"
//                  min="1"// Define o valor mínimo como 1
//               />

//               {/* Campo de seleção de unidade */}
//               <select
//                 name="unidade"
//                 className="unidade-select"
//                 onChange={(e) => setUnidade(e.target.value)}
//                 value={unidade}
//               >
//                 <option value="un">un.</option>
//                 <option value="cx">cx.</option>
//                 <option value="lt">lt.</option>
//               </select>
//             </div>

//             <label htmlFor="dataEntrada">Data de Entrada:</label>
//             <Field name="dataEntrada" placeholder="Data de Entrada" type="date" className="cadastro-input" />
//             {errors.dataEntrada && touched.dataEntrada ? <div className="error">{errors.dataEntrada}</div> : null}

//             <button type="submit" className="cadastro-button">Cadastrar</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default CadastroProduto;








