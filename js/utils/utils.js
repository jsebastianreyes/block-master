
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
           img: movie.poster_path,
           average: movie.vote_average
         }
    
         moviesHTML.push(movieInfo)

   })

   
   return moviesHTML
}

export function printDOM(array, template){
    const arrayHTML = []
   array.forEach(movie => {
    const movieHTML = createDOM(template(movie.img, movie.average))
    arrayHTML.push(movieHTML)
   })
   return arrayHTML

}