import { getMoviesByCategories } from './services/the-movie.js'
import { workArray, printDOM } from './utils/utils.js'
import { templateMoviesVert} from "./templatesDOM.js"


export async function printCategoryByID(id, num){
    
    const movies = await getMoviesByCategories(id, num)
    
    const movie =  workArray(movies)
    const moviesHTML = printDOM(movie, templateMoviesVert)

    return moviesHTML

}

