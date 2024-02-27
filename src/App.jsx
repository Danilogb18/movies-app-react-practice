import { useRef, useState } from 'react'
import './App.css'
import { Movies } from './Components/Movies'
import { useMovies } from './hooks/useMovies'

function App () {
  const [query, setQuery] = useState('')
  const { searchResults, fetchMoviesAndSetResults, validationError } = useMovies({ query })

  function handleSubmit (event) {
    event.preventDefault()
    fetchMoviesAndSetResults({ query })
  }

  const timerId = useRef(null)
  const handleChange = (event) => {
    const newQuery = event.target.value
    setQuery(newQuery)
    clearTimeout(timerId.current)
    timerId.current = setTimeout(fetchMoviesAndSetResults, 400, { query: newQuery })
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <p>Busca información de tus películas favoritas.</p>
        <form action='submit' onSubmit={handleSubmit}>
          <input name='query' onChange={handleChange} value={query} />
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
