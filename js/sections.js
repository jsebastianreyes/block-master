import { $generalVertical, $relatedMovies, $titleSearch, $notFound, $back, $subtitle, $header, $generalListContainer, $detailMovie, $generalList, $categories, $trendingPreview, $headerContent, BASE_URL_IMG } from "./constant/constant.js"
import { printHome, printCategoriesMovies, printTrendingMovies } from "./index.js"
import { printCategoryByID } from "./categoryMovies.js"
import { getMoviesBySearch, getTrendingMovies, getMovieDetail, getSimilarMovies } from "./services/the-movie.js"
import { workArray, printDOM, createDOM, handlerClicItems } from './utils/utils.js'
import { templateMoviesVert, templateMovieDetail } from "./templatesDOM.js"
import { observer, observerSection } from './observer.js'


const $intersector = document.querySelector('#intersector')
export function homePage(){

    //limpiar local storage 

   localStorage.clear()
   $generalVertical.classList.add('is-hidden')
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
    $generalList.classList.remove('is-hidden')
    $trendingPreview.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $generalListContainer.classList.remove('is-hidden')
    $back.classList.remove('is-hidden')
    $header.classList.remove('is-background')
    $headerContent.classList.remove('is-hidden')
    $header.style.background = ''
    $detailMovie.classList.add('is-hidden')
    $back.classList.remove('is-absolute')
    $subtitle.classList.remove('is-hidden')
    $notFound.classList.add('is-hidden')
    
    //busqueda por categoria
 
    $subtitle.innerHTML = ''
    const data = localStorage
    const id = data.getItem("ID");
    const nameEs = data.getItem("nameES");
    const movies = await printCategoryByID(id)
    movies.forEach($el => observer.observe($el))
    $generalList.innerHTML = ''
    $subtitle.innerHTML = nameEs
    $generalList.append(...movies)

    handlerClicItems($generalList, 'gMovie-container')

}

export async function searchPage(){
    $subtitle.innerHTML = ''
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

    const movie =  workArray(moviesAPI)
    const moviesHTML = printDOM(movie, templateMoviesVert)
    moviesHTML.forEach($el => observer.observe($el))
    
    $generalList.innerHTML = ''
    $subtitle.innerHTML = `Search results for: ${$movie[1]}`
    $generalList.append(...moviesHTML)



    handlerClicItems($generalList, 'gMovie-container')

    observerSection.observe($intersector)


}

let pageNumSearch = 1

export async function loadMoreSearch(){
  
    pageNumSearch ++
    const $movie = location.hash.split('=')
    const moviesAPI = await getMoviesBySearch($movie[1], pageNumSearch)
    
    const movie =  workArray(moviesAPI)
    const moviesHTML = printDOM(movie, templateMoviesVert)
    moviesHTML.forEach($el => observer.observe($el))
    $generalList.append(...moviesHTML)
    
}


export async function trendsPage(){   
    $subtitle.innerHTML = ''
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

    
    const trendingMovies = await getTrendingMovies(1)
    const movie =  workArray(trendingMovies)
    const moviesHTML = printDOM(movie, templateMoviesVert)
    moviesHTML.forEach($el => observer.observe($el))
    $generalList.innerHTML = ''
    $generalList.append(...moviesHTML)
    $subtitle.innerHTML = 'All trends'
    
    handlerClicItems($generalList, 'gMovie-container')
    


    observerSection.observe($intersector)

}




let pagenumTrends = 1

export async function loadMoreTrends(){
    pagenumTrends++
    const trendingMovies = await getTrendingMovies(pagenumTrends)
    const movie =  workArray(trendingMovies)
    const moviesHTML = printDOM(movie, templateMoviesVert)
    moviesHTML.forEach($el => observer.observe($el))
    $generalList.append(...moviesHTML)
}


export async function movieDetailPage(){
    $header.style.background = 'grey';
    $detailMovie.classList.remove('is-hidden')
    $trendingPreview.classList.add('is-hidden')
    $notFound.classList.add('is-hidden')
    $titleSearch.classList.add('is-hidden')
    $categories.classList.add('is-hidden')
    $header.classList.add('is-background')
    $headerContent.classList.add('is-hidden')
    $back.classList.remove('is-hidden')
    $back.classList.add('is-absolute')
    $generalList.classList.add('is-hidden')
    
    
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

    if(movieData.poster_path){
        $header.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(https://image.tmdb.org/t/p/w500/${movieData.poster_path})`;
    }
    else{

        $header.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(https://raw.githubusercontent.com/jsebastianreyes/block-master/main/images/default-img.png)`;
    }


    $detailMovie.innerHTML = ""
    $detailMovie.append(createDOM(templateMovieDetail(movieData)))
   
     printCategoriesMovies(movieData.genres, 'categoriesPreview-movieDetail')
     const $similarmovies = await getSimilarMovies(url)

    printTrendingMovies($similarmovies, '#trendingPreviewDetailMovie .trendingPreview-movieList') 


    
}