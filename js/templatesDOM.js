import { BASE_URL_IMG } from  './constant/constant.js'

export function templateTrendingMovies({ img, average }){
    return `
    <div class="movie-container">
      <span class="score is-blue">
       <i class="icon-1star"></i>
       <p class="score-txt">${average}</p>
      </span>
      <img src="${BASE_URL_IMG}${img}" alt="">
    </div> 
    `
}