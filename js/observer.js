
import { loadMoreSearch, loadMoreTrends } from "./sections.js"

export const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      
        const $nodo = entry.target
        const $img = $nodo.querySelector('img')
        if($img){

            const url = $img.dataset.src
            $img.src = url
        }
        
        observer.unobserve($nodo)

    })
})


export const observerSection = new IntersectionObserver(entries => { 
   entries.filter(entry => entry.isIntersecting).forEach(entry => {
    const $nodo = entry.target
    if (location.hash.startsWith('#trends')) {
        loadMoreTrends()
    }
    else if(location.hash.startsWith('#search=')){
        loadMoreSearch()
    }
    
   })

})

