import { API_KEY } from '../constant/constant.js'

export async function getTrendingMovies(){
    const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    const data = await res.json()


    return data.results
}