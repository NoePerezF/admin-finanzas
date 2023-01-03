import { useState } from 'react';
import './App.css';
import AddGasto from './components/AddGasto';
import AddIngreso from './components/AddIngreso';
import AddTarjeta from './components/AddTarjeta';
import Menu from './components/Menu';
import Resumen from './components/Resumen';

function App() {
  const [page, setpage] = useState(1)
  return (
    <>
    <Menu setpage = {setpage} page={page}/>
    {
      page === 1 ? <Resumen/> :
      page === 2 ?
        <AddTarjeta/> :
      page === 3 ?
      <AddGasto/>:
      <AddIngreso/>
    }
    </>
  );
}

export default App;
