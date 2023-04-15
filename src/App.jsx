import axios from 'axios'
import { useState } from 'react'
import './App.css'


 function App(){

  const [receitas, setReceitas] = useState([])
  const [input, setInput] = useState('')
  

  async function handleSubmit(event){
    event.preventDefault()
    await buscarReceitas(input)
  }

  function reticenciasNoFinalDoTexto (texto){
    if(texto.length >100){
      return texto.substring(0, 220) + ' ...'
    } 

    return texto;
  } 

  async function buscarReceitas(ingrediente) {
    const resposta = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingrediente}`)
    setReceitas(resposta.data.meals)   
  }
  
  return (
    <div className='container'>
      <h1 className='title'>Receitas</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input className='input' onChange={e => setInput(e.target.value)} />
        <button className='button' type='submit'>BUSCAR</button>
      </form>

      
      <div className="receipts">
        {receitas.map(function(receita) {
          return (
            < div className='receipt' key={receita.idMeal}
                  onClick={()=> window.location.replace(receita.strYoutube)}>
              <header className="header">
                <h4 className='title'>{receita.strMeal}</h4>
                <h4 className='origin'>{receita.strArea}</h4>
              </header>
              <div className="infos">
                <img src={receita.strMealThumb} alt={receita.strMeal} className='image' />
                <p className='text'>
                  {reticenciasNoFinalDoTexto(receita.strInstructions)}
                </p>
              </div>
              
            </ div>
          )
        })}
      </div>
    </div>
  ) 
}

export default App

