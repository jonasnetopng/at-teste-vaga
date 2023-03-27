import axios from 'axios';
import { Header } from './components/Header';
import { Table } from './components/Table';
import { useEffect, useState } from 'react';

function App() {
  const [contratos, setContratos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://compras.dados.gov.br/contratos/v1/contratos.json?uasg=153229')
      .then((res) => {
        setContratos(res.data._embedded.contratos);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  if (error) {
    return <h1>Ocorreu um erro ao carregar os dados.</h1>;
  }

  return (
    <div className="App bg-slate-900 ">
        <Header />
        <Table data={contratos} />
    </div>
  );
}

export default App;
