import { API_KEY } from '../constant/constant.js'

export async function getTrendingMovies(){
    const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    const data = await res.json()


    return data.results
}

//OBTENER CATEGORIAS

export async function getCategoriesMovies(){
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-ES`)
    const data = await res.json()
    return data.genres
}