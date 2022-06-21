import {getTrendingMovies, getCategoriesMovies, getCategoriesMoviesES} from './services/the-movie.js'
import { templateTrendingMovies, templateListCategories } from './templatesDOM.js'
import { $allTrending } from './constant/constant.js'
import {createDOM} from './utils/utils.js'
import './navigation.js'





$allTrending.addEventListener('click', () =>{
   location.hash = '#trends'
})


function printTrendingMovies(movies){
  
   const $container = document.querySelector('#trendingPreview .trendingPreview-movieList') 
   $container.innerHTML = ''
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

export function printCategoriesMovies(categoriesEn, categoriesEs){
  
   const saveData = localStorage
   const $container = document.querySelector('#categoriesPreview-list') 
   const arrayCategories = []
   $container.innerHTML = ''
 

   categoriesEs.forEach((category, index) => {  
      const categorieInfo = {
         name: category.name,
         id: category.id
      }

      const categorieHTML = createDOM(templateListCategories(categorieInfo))
      arrayCategories.push(categorieHTML)
      $container.append(categorieHTML)

      categorieHTML.addEventListener('click', (e) => {
         location.hash = `#category=${categoriesEn[index].name.toLowerCase().split(' ').join('-')}`
         saveData.setItem("nameES", categorieInfo.name);
         saveData.setItem("ID", categorieInfo.id);
         
      })
 
   })


  

}

export async function printHome(){
    
    const trendingMovies = await getTrendingMovies()
   printTrendingMovies(trendingMovies)

    const categoriesMoviesEn  = await  getCategoriesMovies()
    const categoriesMoviesEs  = await  getCategoriesMoviesES()
    printCategoriesMovies(categoriesMoviesEn, categoriesMoviesEs)
    


}




