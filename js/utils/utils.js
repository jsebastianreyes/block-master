
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
    .filter(movie => movie.poster_path)
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