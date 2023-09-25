const apikey="f34b8f562132c78871a54a5e5d127e16"
const getTrandingMovies = async()=>{

    let traindingMoveis=await fetch(`https://api.themoviedb.org/3/movie/popular?&language=en-US&api_key=${apikey}`);
    traindingMoveis=await traindingMoveis.json();
    // console.log(traindingMoveis.results);

    for(let i=0;i<8;i++){
        // console.log(traindingMoveis.results[i])
        const imglink="https://image.tmdb.org/t/p/w342/"+traindingMoveis.results[i].poster_path;
        const div=document.createElement("a");
        // console.log(imglink);
        
        const child=`  <div class="maincard">
        <div class="image_container"><img src="${imglink}"></div>
        <h2>${traindingMoveis.results[i].original_title}</h2>
    </div>`
    div.classList.add("card");
    div.href=`./moreinfo.html?query=${traindingMoveis.results[i].id}`
    div.innerHTML=child;
    document.querySelector(".result_container").appendChild(div);
    }

}
// getTrandingMovies()
window.onload=getTrandingMovies();


const getMovei=async()=>{
   
    let input=document.getElementById("input").value;
    document.querySelector(".searchresult").innerHTML="";
    document.getElementById("searchedfor").innerText=`You are searching For :${input}`;
    let getmovie=await fetch(`https://api.themoviedb.org/3/search/multi?&language=en-US&query=${input}&api_key=${apikey}`);
    getmovie=await getmovie.json();
    const filteredmovies=getmovie.results.filter((el)=>{
        if(el.poster_path!=null){
            return el;
        }
    })
   


filteredmovies.forEach((el)=>{
        const imglink="https://image.tmdb.org/t/p/w342/"+el.poster_path;
        
        const div=document.createElement("a");
        // console.log(imglink);
        
        const child=`  <div class="maincard">
        <div class="image_container"><img src="${imglink}"></div>
        <h2>${el.original_title}</h2>
    </div>`
    div.classList.add("card");
    div.href=`./moreinfo.html?query=${el.id}`
    div.innerHTML=child;
    document.querySelector(".searchresult").appendChild(div);
    })

    document.getElementById("input").value = "";
}

document.getElementById("searchbtn").addEventListener("click",getMovei);