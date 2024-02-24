export function Movies ({ results }) {
  if (results.Response !== 'True') return <p>No se encontró la película</p>
  return (
    results.Search.map(movie =>
      <div className='movie' key={movie.imdbID}>
        <h3>{movie.Title}</h3>
        <h5>{movie.Year}</h5>
        {results.Search.Poster === 'N/A' ? <p>No hay póster disponible</p> : <img src={movie.Poster} alt={`Póster de ${movie.Title}`} />}
      </div>
    )
  )
}
