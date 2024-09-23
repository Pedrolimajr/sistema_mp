
import { useEffect, useState } from 'react';
import './Tabela.css';

const Tabela = () => {
  const [tabelas, setTabelas] = useState(() => {
    const storedTabelas = localStorage.getItem('tabelas');
    return storedTabelas ? JSON.parse(storedTabelas) : [];
  });

  useEffect(() => {
    localStorage.setItem('tabelas', JSON.stringify(tabelas));
  }, [tabelas]);

  const handleChange = (index, field, value, tabelaIndex) => {
    const newTabelas = [...tabelas];
    newTabelas[tabelaIndex].dados[index][field] = value;
    setTabelas(newTabelas);
  };

  const addRow = (tabelaIndex) => {
    const newTabelas = [...tabelas];
    const newId = newTabelas[tabelaIndex].dados.length > 0 
      ? newTabelas[tabelaIndex].dados[newTabelas[tabelaIndex].dados.length - 1].id + 1 
      : 1;

    newTabelas[tabelaIndex].dados.push({
      id: newId,
      produto: '',
      precoCaixa: '',
      precoLitro: '',
      prazo: '',
      acima10: '',
    });
    setTabelas(newTabelas);
  };

  const deleteRow = (index, tabelaIndex) => {
    const newTabelas = [...tabelas];
    newTabelas[tabelaIndex].dados.splice(index, 1);
    if (newTabelas[tabelaIndex].dados.length === 0) {
      newTabelas.splice(tabelaIndex, 1); // Remove a tabela se não houver linhas
    }
    setTabelas(newTabelas);
  };

  const addTabela = () => {
    const newTabela = {
      nome: 'Tabela Nova',
      headerId: 'ID',
      headerProduto: 'PRODUTO',
      headerPrecoCaixa: 'PREÇO CAIXA',
      headerPrecoLitro: 'PREÇO LITRO',
      headerPrazo: 'PRAZO',
      headerAcima10: 'ACIMA/10BD’S',
      dados: [{ id: 1, produto: '', precoCaixa: '', precoLitro: '', prazo: '', acima10: '' }],
    };
    setTabelas([...tabelas, newTabela]);
  };

  const handleTitleChange = (value, tabelaIndex) => {
    const newTabelas = [...tabelas];
    newTabelas[tabelaIndex].nome = value;
    setTabelas(newTabelas);
  };

  const handleHeaderChange = (value, headerField, tabelaIndex) => {
    const newTabelas = [...tabelas];
    newTabelas[tabelaIndex][headerField] = value;
    setTabelas(newTabelas);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button className="btn-adicionar-tabela" onClick={addTabela}>Adicionar Tabela</button>
      </div>
      {tabelas.length === 0 ? (
        <p>Nenhuma tabela disponível. Adicione uma tabela.</p>
      ) : (
        tabelas.map((tabela, tabelaIndex) => (
          <div key={tabelaIndex} className="tabela-container">
            <input
              type="text"
              value={tabela.nome}
              onChange={(e) => handleTitleChange(e.target.value, tabelaIndex)}
              className="titulo-tabela"
            />
            {tabela.dados.length > 0 ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="text"
                          value={tabela.headerId}
                          onChange={(e) => handleHeaderChange(e.target.value, 'headerId', tabelaIndex)}
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          value={tabela.headerProduto}
                          onChange={(e) => handleHeaderChange(e.target.value, 'headerProduto', tabelaIndex)}
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          value={tabela.headerPrecoCaixa}
                          onChange={(e) => handleHeaderChange(e.target.value, 'headerPrecoCaixa', tabelaIndex)}
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          value={tabela.headerPrecoLitro}
                          onChange={(e) => handleHeaderChange(e.target.value, 'headerPrecoLitro', tabelaIndex)}
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          value={tabela.headerPrazo}
                          onChange={(e) => handleHeaderChange(e.target.value, 'headerPrazo', tabelaIndex)}
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          value={tabela.headerAcima10}
                          onChange={(e) => handleHeaderChange(e.target.value, 'headerAcima10', tabelaIndex)}
                        />
                      </th>
                      <th>AÇÕES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabela.dados.map((linha, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="number"
                            value={linha.id}
                            onChange={(e) => handleChange(index, 'id', e.target.value, tabelaIndex)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={linha.produto}
                            onChange={(e) => handleChange(index, 'produto', e.target.value, tabelaIndex)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={linha.precoCaixa}
                            onChange={(e) => handleChange(index, 'precoCaixa', e.target.value, tabelaIndex)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={linha.precoLitro}
                            onChange={(e) => handleChange(index, 'precoLitro', e.target.value, tabelaIndex)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={linha.prazo}
                            onChange={(e) => handleChange(index, 'prazo', e.target.value, tabelaIndex)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={linha.acima10}
                            onChange={(e) => handleChange(index, 'acima10', e.target.value, tabelaIndex)}
                          />
                        </td>
                        <td>
                          <button className="btn-excluir" onClick={() => deleteRow(index, tabelaIndex)}>Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="btn-adicionar-produto" onClick={() => addRow(tabelaIndex)}>Adicionar Produto</button>
              </>
            ) : (
              <p>Nenhuma linha disponível. Adicione um produto.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Tabela;





















// import { useState } from 'react';
// import './Tabela.css';

// const Tabela = () => {
//   const [tabelas, setTabelas] = useState([]);

//   const handleChange = (index, field, value, tabelaIndex) => {
//     const newTabelas = [...tabelas];
//     newTabelas[tabelaIndex].dados[index][field] = value;
//     setTabelas(newTabelas);
//   };

//   const addRow = (tabelaIndex) => {
//     const newTabelas = [...tabelas];
//     const newId = newTabelas[tabelaIndex].dados.length + 1;
//     newTabelas[tabelaIndex].dados.push({
//       id: newId,
//       produto: '',
//       precoCaixa: '',
//       precoLitro: '',
//       prazo: '',
//       acima10: '',
//     });
//     setTabelas(newTabelas);
//   };

//   const deleteRow = (index, tabelaIndex) => {
//     const newTabelas = [...tabelas];
//     newTabelas[tabelaIndex].dados.splice(index, 1);
//     if (newTabelas[tabelaIndex].dados.length === 0) {
//       newTabelas.splice(tabelaIndex, 1); // Remove a tabela se não houver linhas
//     }
//     setTabelas(newTabelas);
//   };

//   const addTabela = () => {
//     const newTabela = {
//       nome: 'Tabela Nova',
//       dados: [{ id: 1, produto: '', precoCaixa: '', precoLitro: '', prazo: '', acima10: '' }],
//     };
//     setTabelas([...tabelas, newTabela]);
//   };

//   const handleTitleChange = (value, tabelaIndex) => {
//     const newTabelas = [...tabelas];
//     newTabelas[tabelaIndex].nome = value;
//     setTabelas(newTabelas);
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
//         <button className="btn-adicionar-tabela" onClick={addTabela}>Adicionar Tabela</button>
//       </div>
//       {tabelas.length === 0 ? (
//         <p>Nenhuma tabela disponível. Adicione uma tabela.</p>
//       ) : (
//         tabelas.map((tabela, tabelaIndex) => (
//           <div key={tabelaIndex} className="tabela-container">
//             <input
//               type="text"
//               value={tabela.nome}
//               onChange={(e) => handleTitleChange(e.target.value, tabelaIndex)}
//               className="titulo-tabela"
//             />
//             {tabela.dados.length > 0 ? (
//               <>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>PRODUTO</th>
//                       <th>PREÇO CAIXA</th>
//                       {tabela.dados[0].precoLitro && <th>PREÇO LITRO</th>}
//                       <th>PRAZO</th>
//                       <th>ACIMA/10BD’S</th>
//                       <th>AÇÕES</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tabela.dados.map((linha, index) => (
//                       <tr key={index}>
//                         <td>
//                           <input
//                             type="number"
//                             style={{ width: '50%' }}
//                             value={linha.id}
//                             onChange={(e) => handleChange(index, 'id', e.target.value, tabelaIndex)}
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="text"
//                             value={linha.produto}
//                             onChange={(e) => handleChange(index, 'produto', e.target.value, tabelaIndex)}
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="text"
//                             value={linha.precoCaixa}
//                             onChange={(e) => handleChange(index, 'precoCaixa', e.target.value, tabelaIndex)}
//                           />
//                         </td>
//                         {linha.precoLitro && (
//                           <td>
//                             <input
//                               type="text"
//                               value={linha.precoLitro}
//                               onChange={(e) => handleChange(index, 'precoLitro', e.target.value, tabelaIndex)}
//                             />
//                           </td>
//                         )}
//                         <td>
//                           <input
//                             type="text"
//                             value={linha.prazo}
//                             onChange={(e) => handleChange(index, 'prazo', e.target.value, tabelaIndex)}
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="text"
//                             value={linha.acima10}
//                             onChange={(e) => handleChange(index, 'acima10', e.target.value, tabelaIndex)}
//                           />
//                         </td>
//                         <td>
//                           <button className="btn-excluir" onClick={() => deleteRow(index, tabelaIndex)}>Excluir</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <button className="btn-adicionar-produto" onClick={() => addRow(tabelaIndex)}>Adicionar Produto</button>
//               </>
//             ) : (
//               <p>Nenhuma linha disponível. Adicione um produto.</p>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Tabela;
