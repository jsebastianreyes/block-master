import { BASE_URL_IMG } from  './constant/constant.js'
import { changeColorScore, printImage } from './utils/utils.js'


export function templateTrendingMovies(img, average, id, name){
    return `
    <div class="movie-container" data-id="${id}" data-name="${name}">
      <span class="score ${changeColorScore(average)}">
       <i class="icon-1star"></i>
       ${average.toFixed(1)}
      </span>
      ${printImage(img, name)}
    </div> 
    `
}


export function templateListCategories({ name, id }){
   return `
   <div class="category-container">
     <h3 id="id${id}" class="category-title">${name}</h3>
   </div>
   `
}

export function templateMoviesVert(img, average, id, name){
  
  return `
       <div class="gMovie-container" data-id="${id}" data-name="${name}">
          <span class="score  ${changeColorScore(average)}">
            <i class="icon-1star"></i>
            ${average.toFixed(1)}
          </span>
          ${printImage(img, name)}
        </div>
  ` 
}

export function templateMovieDetail(movie){

  return`
    <div class="wrapper">
    <div class="detailMovie-top">
      <div>
        <h4 class="subtitle">${movie.title}</h4>
      </div>
      <div class="rating">
        <i class="icon-1star"></i>
        <p class="rating-number">${movie.vote_average.toFixed(1)}</p> 
      </div>
    </div>
    <div class="detailMovie-description">
       ${movie.overview}
    </div>
    <div class="categoryPreview" id="categoryPreview">

    <h4 class="subtitle"></h4>
    <article class="categoriesPreview-list" id="categoriesPreview-movieDetail">
     
       <div class="category-container">
         
       </div>
    
    </article>
 
    </div>

    <div class="trendingPreviewDetailMovie" id="trendingPreviewDetailMovie">
    
      <article class="trendingPreview-movieList">
       <!-- <div class="movie-container">
          <span class="score is-blue">
            <i class="icon-1star"></i>
            <p class="score-txt">4.5</p>
          </span>
          <img src="./images/The-Silencing.jpg" alt="">
        </div>  -->
    
      </article>
    
  </div>
  </div>



  `
}