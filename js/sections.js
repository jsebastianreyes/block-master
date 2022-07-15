import { $relatedMovies, $titleSearch, $notFound, $back, $subtitle, $header, $generalListContainer, $detailMovie, $generalList, $categories, $trendingPreview, $headerContent, BASE_URL_IMG } from "./constant/constant.js"
import { printHome, printCategoriesMovies, printTrendingMovies } from "./index.js"
import { printCategoryByID } from "./categoryMovies.js"
import { getMoviesBySearch, getTrendingMovies, getMovieDetail, getSimilarMovies } from "./services/the-movie.js"
import { workArray, printDOM, createDOM, handlerClicItems } from './utils/utils.js'
import { templateMoviesVert, templateMovieDetail } from "./templatesDOM.js"

export function homePage(){

    //limpiar local storage 

   localStorage.clear()
   $header.classList.remove('is-background')
   $headerContent.classList.remove('is-hidden')
   $trendingPreview.classList.remove('is-hidden')
   $categories.classList.remove('is-hidden')
   
   $detailMovie.classList.add('is-hidden')
   $notFound.classList.add('is-hidden')
   $generalList.classList.add('is-hidden')
   $generalListContainer.classList.add('is-hidden')
   $back.classList.add('is-hidden')
   $header.style.background = ''
   printHome()

}

export async function categoryPage(){
    $trendingPreview.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $generalListContainer.classList.remove('is-hidden')
    $generalList.classList.remove('is-hidden')
    $back.classList.remove('is-hidden')
    $header.classList.remove('is-background')
    $headerContent.classList.remove('is-hidden')
    $header.style.background = ''
    $detailMovie.classList.add('is-hidden')
    $back.classList.remove('is-absolute')
    $subtitle.classList.remove('is-hidden')
    $notFound.classList.add('is-hidden')
    
    //busqueda por categoria
 
    $generalList.innerHTML = ''
    $subtitle.innerHTML = ''
    const data = localStorage
    const id = data.getItem("ID");
    const nameEs = data.getItem("nameES");
    const movies = await printCategoryByID(id)
    $subtitle.innerHTML = nameEs
    $generalList.append(...movies)

    handlerClicItems($generalList, 'gMovie-container')

}

export async function searchPage(){
    $notFound.classList.add('is-hidden')
    $back.classList.remove('is-hidden')
    $trendingPreview.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $generalListContainer.classList.remove('is-hidden')
    $generalList.classList.remove('is-hidden')
    $header.classList.remove('is-background')
    $headerContent.classList.remove('is-hidden')
    $header.style.background = ''
    $detailMovie.classList.add('is-hidden')
    $back.classList.remove('is-absolute')
    $subtitle.classList.remove('is-hidden')

    const $movie = location.hash.split('=')
    const moviesAPI = await getMoviesBySearch($movie[1])
    $generalList.innerHTML = ''
    $subtitle.innerHTML = ''

    const movie =  workArray(moviesAPI)
    const moviesHTML = printDOM(movie, templateMoviesVert)


    $subtitle.innerHTML = `Search results for: ${$movie[1]}`
    $generalList.append(...moviesHTML)

    /*$generalList.addEventListener('click', (e) => {
        //seleccionar elemento container
        //llamar atributos id y nombre de pelicula
       const $elemento = e.target.parentNode
       if($elemento.classList.contains("gMovie-container")){
           const $id = $elemento.dataset.id
           const url = convertURL($elemento.dataset.name)
           const saveData = localStorage
           saveData.setItem("movieID", $id);
           location.hash = `movie=${url}`
       }
    })*/

    handlerClicItems($generalList, 'gMovie-container')


}

export async function trendsPage(){
    $notFound.classList.add('is-hidden')
    
    $trendingPreview.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $generalListContainer.classList.remove('is-hidden')
    $generalList.classList.remove('is-hidden')
    $header.classList.remove('is-background')
    $headerContent.classList.remove('is-hidden')
    $header.style.background = ''
    $detailMovie.classList.add('is-hidden')
    $back.classList.remove('is-absolute')
    $subtitle.classList.remove('is-hidden')

    $back.classList.remove('is-hidden')

    $generalList.innerHTML = ''
    $subtitle.innerHTML = ''
    
    const trendingMovies = await getTrendingMovies()
    const movie =  workArray(trendingMovies)
    const moviesHTML = printDOM(movie, templateMoviesVert)
    $generalList.append(...moviesHTML)

    $subtitle.innerHTML = 'Todas las tendencias'
    
    handlerClicItems($generalList, 'gMovie-container')
  

}

export async function movieDetailPage(){
    $header.style.background = ''
    $trendingPreview.classList.add('is-hidden')
    $notFound.classList.add('is-hidden')
    $titleSearch.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $header.classList.add('is-background')
    $headerContent.classList.add('is-hidden')
    $back.classList.remove('is-hidden')
    $back.classList.add('is-absolute')
    $detailMovie.classList.remove('is-hidden')
    $generalList.classList.add('is-hidden')
    $detailMovie.innerHTML = ""
    
    

    
    //FUNCIONALIDAD
    
    //ERROR LO GENERA EL LOCAL STORAGE
    //MEJORAR CODIGO
    //LIMPIAR EL STORAGE CUANDO ESTEMOS EN EL HOME
    const data = localStorage
    const urlHash = location.hash.split('=')
    const url = data.getItem(urlHash[1])
 
    const movieData = await getMovieDetail(url) 
    .catch(function (error) {
        if (error.response ) {
            $header.classList.remove('is-background')
            
            $header.style.background = ''
            $notFound.classList.remove('is-hidden')
            $back.classList.remove('is-absolute')
        } 
      });


    $header.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(https://image.tmdb.org/t/p/w500/${movieData.poster_path})`;
    $detailMovie.append(createDOM(templateMovieDetail(movieData)))
   
     printCategoriesMovies(movieData.genres, 'categoriesPreview-movieDetail')
     const $similarmovies = await getSimilarMovies(url)

      printTrendingMovies($similarmovies, '#trendingPreviewDetailMovie .trendingPreview-movieList') 

   

    
}