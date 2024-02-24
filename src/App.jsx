import { useState } from 'react'
import './App.css'
import { Movies } from './Components/Movies'
import { fetchMovies } from './services/getMovies'

function App () {
  const [searchResults, setSearchResults] = useState('')
  const [previousQuery, setPreviousQuery] = useState('')
  const [validationError, setValidationError] = useState(null)

  async function validateAndSetResults (query) {
    setPreviousQuery(query)
    const result = await fetchMovies({ query, previousQuery })
    if (!result) return
    if (typeof result === 'string') return setValidationError(result)
    setValidationError(null)
    setSearchResults(result)
  }

  async function handleSubmit (event) {
    event.preventDefault()
    const fields = new window.FormData(event.target)
    const query = fields.get('query')
    validateAndSetResults(query)
  }

  let timerRef = null
  function handleChange (event) {
    const timer = 500
    clearTimeout(timerRef)
    timerRef = setTimeout(searchOnChange, timer, event)
  }

  async function searchOnChange (event) {
    console.log('se busco')
    const query = event.target.value
    validateAndSetResults(query)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <p>Busca información de tus películas favoritas.</p>
        <form action='submit' onSubmit={handleSubmit}>
          <input onChange={handleChange} name='query' type='text' />
          <button type='submit'>Buscar</button>
        </form>
        {validationError && <p>{validationError}</p>}
      </header>
      <main>
        <Movies results={searchResults} />
      </main>
    </div>
  )
}

export default App
