import { BASE_URL_IMG } from  './constant/constant.js'
import { changeColorScore } from './utils/utils.js'


export function templateTrendingMovies(img, average){

  console.log(img,average)
    return `
    <div class="movie-container">
      <span class="score ${changeColorScore(average)}">
       <i class="icon-1star"></i>
       <p class="score-txt">${average.toFixed(1)}</p>
      </span>
      <img src="${BASE_URL_IMG}${img}" alt="">
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

export function templateMoviesVert(img, average){
  
  return `
       <div class="gMovie-container">
          <span class="score  ${changeColorScore(average)}">
            <i class="icon-1star"></i>
            <p class="score-txt">${average.toFixed(1)}</p>
          </span>
          <img src="${BASE_URL_IMG}${img}" alt="">
        </div>
  ` 
}