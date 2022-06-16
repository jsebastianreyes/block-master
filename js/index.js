import {getTrendingMovies, getCategoriesMovies} from './services/the-movie.js'
import { templateTrendingMovies, templateListCategories } from './templatesDOM.js'
import {createDOM} from './utils/utils.js'





function printTrendingMovies(movies){
  
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

function printCategoriesMovies(categories){

   const $container = document.querySelector('#categoriesPreview-list') 
   categories.forEach(category => {
      const categorieInfo = {
         name: category.name,
         id: category.id
      }

      const categorieHTML = createDOM(templateListCategories(categorieInfo))
      $container.append(categorieHTML)

   })
   
}



async function allPrint(){
    
    const trendingMovies = await getTrendingMovies()
    printTrendingMovies(trendingMovies)

    const categoriesMovies = await  getCategoriesMovies()
    printCategoriesMovies(categoriesMovies)

   



}

allPrint()




