import { useState } from "react"
import { AiFillStar } from "react-icons/ai";


function App() {
  const [busqueda, setBusqueda] = useState('')
  const [peliculas, setPeliculas] = useState([])

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = '07b58050d7be8c571b0b6bcff9658931'

  const handleInputChange = (e) =>{
    setBusqueda(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPeliculas()
    setBusqueda('')
  }

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
      const data = await response.json()
      console.log(data.results)
      setPeliculas(data.results)
    } catch (error) {
      console.error('Ha ocurrido un error: ', error)
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center p-7 gap-5">
        <h1 className="text-2xl font-black">Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Busca una película"
            value={busqueda}
            onChange={handleInputChange} 
            className="py-2 text-black px-4"/>
            <button className="bg-purple-900 py-2 px-8 ml-5 rounded text-white">Buscar</button>
        </form>
      </div>

      <div className="grid grid-cols-3 gap-5 lg:grid-cols-5">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="flex flex-col items-center gap-3">
            <img 
            src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} 
            alt={pelicula.title}
            className="rounded hover:opacity-25" />
            <h2>{pelicula.title}</h2>
            <div className="flex justify-center items-center gap-2">
            <p>{pelicula.vote_average}</p>
            <AiFillStar/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
