import {createDOM} from './utils/utils.js'
import { templateMoviesVert } from "./templatesDOM.js"
import { getMoviesByCategories } from './services/the-movie.js'

export async function printCategoryByID(id){
    
    const movies = await getMoviesByCategories(id)

    const moviesHTML = []
 

    movies.forEach(movie => {
        const movieInfo = {
           img: movie.poster_path,
           average: movie.vote_average
         }
    
         const movieHTML = createDOM(templateMoviesVert(movieInfo))
         moviesHTML.push(movieHTML)


    });
    
    return moviesHTML

}

