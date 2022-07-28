import {getTrendingMovies, getCategoriesMovies, getCategoriesMoviesES} from './services/the-movie.js'
import { templateTrendingMovies, templateListCategories } from './templatesDOM.js'
import {createDOM, workArray, printDOM, convertURL, handlerClicItems} from './utils/utils.js'
import { $back, $allTrending } from './constant/constant.js'

import './navigation.js'
import './observer.js'
import { observer } from './observer.js'



const $form = document.querySelector('#search')
$form.addEventListener('submit', handleSubmit)

$allTrending.addEventListener('click', handlerAllTrendings)

function handlerAllTrendings(){
   location.hash = 'trends'
}

$back.addEventListener('click', handlerClicBack)


function handlerClicBack(){
   history.back();
   
}

function handleSubmit(e){
   e.preventDefault()
   const form = new FormData($form)
   const movie = form.get('movie')
   const $movie = movie.split(' ').join('-')
  
   location.hash = `search=${$movie}`
}


$allTrending.addEventListener('click', () =>{
   location.hash = '#trends'
})


export function printTrendingMovies(movies, $cont){
   const $container = document.querySelector(`${$cont}`) 
   
   $container.innerHTML = ''
   
   const movie =  workArray(movies)
   const moviesHTML = printDOM(movie, templateTrendingMovies)
   moviesHTML.forEach($el => observer.observe($el))
   $container.append(...moviesHTML)

   
   handlerClicItems($container, 'movie-container')
}

export function printCategoriesMovies(categoriesEn, $el){
  
   const saveData = localStorage
   const $container = document.querySelector(`#${$el}`) 
   const arrayCategories = []
   $container.innerHTML = ''
   
   
   categoriesEn.forEach((category, index) => {  
      const categorieInfo = {
         name: category.name,
         id: category.id
      }
      
      const categorieHTML = createDOM(templateListCategories(categorieInfo))
      arrayCategories.push(categorieHTML)
      $container.append(categorieHTML)
      categorieHTML.addEventListener('click', () => {
         location.hash = `#category=${categoriesEn[index].name.toLowerCase().split(' ').join('-')}`
         saveData.setItem("nameES", categorieInfo.name);
         saveData.setItem("ID", categorieInfo.id);
         
      })
 
   })


  

}

export async function printHome(){
    //imprime tendencias
    const trendingMovies = await getTrendingMovies()
    printTrendingMovies(trendingMovies, '#trendingPreview .trendingPreview-movieList')
   //imprime las categorias
    const categoriesMoviesEn  = await  getCategoriesMovies()
    printCategoriesMovies(categoriesMoviesEn, 'categoriesPreview-list')
    


}




