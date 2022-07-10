import { $title, $back, $subtitle, $header, $generalListContainer, $detailMovie, $generalList, $categories, $trendingPreview, $headerContent, BASE_URL_IMG } from "./constant/constant.js"
import { printHome } from "./index.js"
import { printCategoryByID } from "./categoryMovies.js"
import { getMoviesBySearch, getTrendingMovies, getMovieDetail } from "./services/the-movie.js"
import { workArray, printDOM, createDOM } from './utils/utils.js'
import { templateMoviesVert, templateTrendingMovies, templateMovieDetail } from "./templatesDOM.js"

export function homePage(){
   $header.classList.remove('is-background')
   $headerContent.classList.remove('is-hidden')
   $trendingPreview.classList.remove('is-hidden')
   $categories.classList.remove('is-hidden')
   
   $detailMovie.classList.add('is-hidden')
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
    //busqueda por categoria
 
    $generalList.innerHTML = ''
    $subtitle.innerHTML = ''
    const data = localStorage
    const id = data.getItem("ID");
    const nameEs = data.getItem("nameES");
    const movies = await printCategoryByID(id)
    $subtitle.innerHTML = nameEs
    $generalList.append(...movies)

}

export async function searchPage(){
    $back.classList.remove('is-hidden')
    $trendingPreview.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $generalListContainer.classList.remove('is-hidden')
    $generalList.classList.remove('is-hidden')


    const $movie = location.hash.split('=')
    const moviesAPI = await getMoviesBySearch($movie[1])
    $generalList.innerHTML = ''
    $subtitle.innerHTML = ''

    const movie =  workArray(moviesAPI)
    const moviesHTML = printDOM(movie, templateMoviesVert)


    $subtitle.innerHTML = `Resultados de búsqueda para: ${$movie[1]}`
    $generalList.append(...moviesHTML)


}

export async function trendsPage(){
    
    $trendingPreview.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $generalListContainer.classList.remove('is-hidden')
    $generalList.classList.remove('is-hidden')

    $back.classList.remove('is-hidden')

    $generalList.innerHTML = ''
    $subtitle.innerHTML = ''
    
    const trendingMovies = await getTrendingMovies()
    const movie =  workArray(trendingMovies)
    const moviesHTML = printDOM(movie, templateMoviesVert)
    $generalList.append(...moviesHTML)

    $subtitle.innerHTML = 'Todas las tendencias'

  

}

export async function movieDetailPage(){

    $trendingPreview.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $header.classList.add('is-background')
    $headerContent.classList.add('is-hidden')
    $back.classList.remove('is-hidden')
    $back.classList.add('is-absolute')
    $detailMovie.classList.remove('is-hidden')
    $generalList.classList.add('is-hidden')
    $detailMovie.innerHTML = ""

    
    //FUNCIONALIDAD

    const data = localStorage
    const id = data.getItem("movieID");
    const movieData = await getMovieDetail(id)
    console.log(movieData)
    //linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(../images/banner-deadpool.jpeg)
    //$header.style.backgroundImage = "url('https://sebhastian.com/img/default.png')";
    $header.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(https://image.tmdb.org/t/p/w220_and_h330_face${movieData.backdrop_path})`;
    $detailMovie.append(createDOM(templateMovieDetail(movieData)))
   

   

    
}