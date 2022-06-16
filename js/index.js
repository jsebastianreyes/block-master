import {getTrendingMovies} from './services/the-movie.js'
import { templateTrendingMovies } from './templatesDOM.js'
import {createDOM} from './utils/utils.js'





async function printTrendingMovies(movies){
   console.log(movies)
   const $container = document.querySelector('#trendingPreview .trendingPreview-movieList') 
   const arrayHTML = []
   movies.forEach(movie => {
    const dataMovie = {
       img: movie.poster_path,
       average: movie.vote_average
     }
    
     const movieHTML = createDOM(templateTrendingMovies(dataMovie))

     arrayHTML.push(movieHTML)

   });

   $container.append(...arrayHTML)
}

async function allPrint(){
    
    const trendingMovies = await getTrendingMovies()
    printTrendingMovies(trendingMovies)

}

allPrint()




