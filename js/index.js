import {getTrendingMovies, getCategoriesMovies, getCategoriesMoviesES} from './services/the-movie.js'
import { templateTrendingMovies, templateListCategories } from './templatesDOM.js'
import {createDOM, workArray, printDOM, convertURL} from './utils/utils.js'
import { $back, $allTrending } from './constant/constant.js'

import './navigation.js'

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
   console.log($movie)
   location.hash = `search=${$movie}`
}


$allTrending.addEventListener('click', () =>{
   location.hash = '#trends'
})


function printTrendingMovies(movies){
  
   const $container = document.querySelector('#trendingPreview .trendingPreview-movieList') 
   $container.innerHTML = ''
   
   const movie =  workArray(movies)
   const moviesHTML = printDOM(movie, templateTrendingMovies)
   $container.append(...moviesHTML)
    
   $container.addEventListener('click', (e) => {
      //seleccionar elemento container
      //llamar atributos id y nombre de pelicula
     const $elemento = e.target.parentNode
     if($elemento.classList.contains("movie-container")){
         const $id = $elemento.dataset.id
         const url = convertURL($elemento.dataset.name)
         const saveData = localStorage
         saveData.setItem("movieID", $id);
         location.hash = `movie=${url}`
     }
  })
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
    //imprime tendencias
    const trendingMovies = await getTrendingMovies()
    printTrendingMovies(trendingMovies)
   //imprime las categorias
    const categoriesMoviesEn  = await  getCategoriesMovies()
    const categoriesMoviesEs  = await  getCategoriesMoviesES()
    printCategoriesMovies(categoriesMoviesEn, categoriesMoviesEs)
    


}




