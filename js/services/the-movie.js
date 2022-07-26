import { API_KEY } from '../constant/constant.js'
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
})


export async function getTrendingMovies(numPage){
    const { data }  = await api('trending/all/day',{
    params: {
       page: numPage
     }
    }
    )
    
    return data.results
}



//OBTENER CATEGORIAS

export async function getCategoriesMovies(){
    //const { data } = await api(`/genre/movie/list?language=es-ES`)
    const { data } = await api(`/genre/movie/list`)
    
    return  data.genres
}

export async function getCategoriesMoviesES(){
    const { data } = await api(`/genre/movie/list?language=es-ES`)
    
    
    return  data.genres
}

export async function getMoviesByCategories(id){
    //const { data } = await api(`/genre/movie/list?language=es-ES`)
    const { data } = await api(`/discover/movie`, {
        params: {
          with_genres: id
        }
    })

  

    return data.results
}

export async function getMoviesBySearch(movie, numPage){
    const { data } = await api('/search/movie', {
        params: {
            query: movie,
            page: numPage
        }
    })
  
    return data.results
}


export async function getMovieDetail(id){
    const { data } = await api(`/movie/${id}`)

    return data
}

export async function getSimilarMovies(id){
    const { data } = await api(`/movie/${id}/similar`)

    return data.results
}