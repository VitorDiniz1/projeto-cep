import { useState } from "react"

import { FiSearch } from "react-icons/fi"

import api from './services/api'

import './style.css'

function App() {

  const [input,setInput] = useState('')
  const [cep,setCep] = useState({})

  async function handleSearch(){
    if(input == ''){ 
      alert('Preencha o cep corretamente!')
    return
    }

    try{

      const response = await api.get(`${input}/json`) 
      setCep(response.data)
      setInput('')



    }catch{
      alert('Erro ao buscar')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscando CEP</h1>
      <div className="container-input">
        <input
         type="text"
         placeholder="Digite seu cep..."
         value={input}
         onChange={(e)=>setInput(e.target.value)}


        
        />
        <button className="btn" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 &&(
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.logradouro} </span>
          <span>Complemento: {cep.complemento}</span>
          
        </main>
      )}
    </div>
  );
}

export default App;
