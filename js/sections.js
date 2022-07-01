import { $title, $subtitle, $header, $generalListContainer, $detailMovie, $generalList, $categories, $trendingPreview, $headerContent, $headerBtnBack } from "./constant/constant.js"
import { printHome } from "./index.js"
import { printCategoryByID } from "./categoryMovies.js"
import { getMoviesBySearch } from "./services/the-movie.js"
import { workArray, printDOM } from './utils/utils.js'
import { templateMoviesVert, templateTrendingMovies } from "./templatesDOM.js"

export function homePage(){
   $header.classList.remove('is-background')
   $headerContent.classList.remove('is-hidden')
   $trendingPreview.classList.remove('is-hidden')
   $categories.classList.remove('is-hidden')
   $headerBtnBack.classList.add('is-hidden')
   $detailMovie.classList.add('is-hidden')
   $generalList.classList.add('is-hidden')
   $generalListContainer.classList.add('is-hidden')
   printHome()

}

export async function categoryPage(){
    $trendingPreview.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $generalListContainer.classList.remove('is-hidden')
    $generalList.classList.remove('is-hidden')
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

export function trendsPage(){
    $trendingPreview.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $generalList.classList.remove('is-hidden')

}

export function movieDetailPage(){
    $trendingPreview.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $header.classList.add('is-background')
    $headerContent.classList.add('is-hidden')
    $headerBtnBack.classList.remove('is-hidden')
    $detailMovie.classList.remove('is-hidden')
    $generalList.classList.add('is-hidden')
}