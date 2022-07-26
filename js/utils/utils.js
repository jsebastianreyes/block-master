import { BASE_URL_IMG } from "../constant/constant.js"

export function createDOM(string){
    const parser = new DOMParser()
    const HTML = parser.parseFromString(string,'text/html')
    return  HTML.body.firstChild
}

export function changeColorScore(score){
    if(score >= 7){
        return 'is-yellow'
    }

    return 'is-blue'
}

export function workArray(array){
    const moviesHTML = []
    array
    //.filter(movie => movie.poster_path)
    .forEach(movie => {
     
        const movieInfo = {
           id: movie.id,
           img: movie.poster_path,
           average: movie.vote_average,
           name: movie.name || movie.title
         }
         moviesHTML.push(movieInfo)

   })

   
   return moviesHTML
}

export function printDOM(array, template){

    const arrayHTML = []
   array.forEach(movie => {
    const movieHTML = createDOM(template(movie.img, movie.average, movie.id, movie.name))
    arrayHTML.push(movieHTML)
   })
   return arrayHTML

}

export function convertURL(name){
  
    return name.split('').map(el => el.replace(' ','-')).filter(item => item !== ':' && item !== '.' && item !== ',' ).join('').toLowerCase()


}

export function handlerClicItems($container, $child){
    $container.addEventListener('click', (e) => {
        //seleccionar elemento container
        //llamar atributos id y nombre de pelicula
       const $elemento = e.target.parentNode
       if($elemento.classList.contains(`${$child}`)){
           
           const $id = $elemento.dataset.id
           const url = convertURL($elemento.dataset.name)
           const saveData = localStorage
           saveData.setItem(url, $id);
           location.hash = `movie=${url}`
           
       }
    })
}

export function printImage(img, title){
    if(img){
        return `<img data-src="${BASE_URL_IMG}${img}" alt="${title}">`
    }
   
    return `
    <img data-src="https://raw.githubusercontent.com/jsebastianreyes/block-master/main/images/default-img.png" alt="${title}">
    <span class="titleOptional">${title}</span>
    `
}