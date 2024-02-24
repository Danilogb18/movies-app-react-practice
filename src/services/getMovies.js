export const fetchMovies = ({ query, previousQuery }) => {
  if (previousQuery === query) return null // Primero que nada se verifica que no sea la misma búsqueda anterior
  if (validateSearch(query)) return validateSearch(query)
  return fetch(`https://www.omdbapi.com/?s=${query}&apikey=69b03ed9`) // Dos return porque hay que retornar el fetch que retorna la data
    .then(response => response.json())
    .then(data => {
      return data
    })
}

function validateSearch (query) {
  let errorMessage = ''
  if (query.length < 3) errorMessage = 'La búsqueda debe tener más de 3 carácteres.'
  if (query.length > 50) errorMessage = 'La búsqueda debe tener menos de 50 carácteres.'
  return errorMessage
}
