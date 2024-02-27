import { useRef, useState } from 'react'
import { fetchMovies } from '../services/getMovies'

export function useMovies ({ query }) {
  const [searchResults, setSearchResults] = useState('')
  const [validationError, setValidationError] = useState(null)
  const previousQuery = useRef(query)

  const fetchMoviesAndSetResults = async ({ query }) => {
    if (previousQuery.current === query) return
    previousQuery.current = query
    const results = await fetchMovies({ query })
    if (!results) return // Esto sucede (fetchMovies retorna null) cuando fetchMovies evalua que se hizo la mismma búsqueda anterior
    if (typeof results === 'string') return setValidationError(results) // Cuando se devuelve un valor string, significa que hay un error en validación
    setValidationError(null)
    setSearchResults(results)
  }
  return { searchResults, fetchMoviesAndSetResults, validationError }
}
