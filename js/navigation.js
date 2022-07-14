import {homePage, trendsPage, searchPage, categoryPage, movieDetailPage} from './sections.js'
window.addEventListener("hashchange", navigation, false);
window.addEventListener("DOMContentLoaded", navigation);

function navigation(){
    if (location.hash.startsWith('#trends')) {
        trendsPage()
    }
    else if(location.hash.startsWith('#search=')){
        searchPage()
    }
    else if(location.hash.startsWith('#category=')){
        categoryPage()
    }   
    else if(location.hash.startsWith('#movie=')){
        
        movieDetailPage()
    }
    else{
        homePage()
    }
}

