
export const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
        const $nodo = entry.target
        const $img = $nodo.querySelector('img')
        const url = $img.dataset.src

        $img.src = url

        observer.unobserve($nodo)
        

    })
}) 

