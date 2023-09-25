console.log(window.location.href);
const movie_id=window.location.href.split("=")[1];

const getMoveiInfo =async ()=>{
    let moviInfo=await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US&api_key=f34b8f562132c78871a54a5e5d127e16`);
    moviInfo=await moviInfo.json();
    const posterimaglink="https://image.tmdb.org/t/p/w500"+moviInfo.poster_path;
   const div=document.createElement("div");
   const child=`  <div class="moreinfo_maincontainer">
   <div class="imgcontainer">

       <img src="${posterimaglink}" alt="Posterimg">

   </div>
   <div class="info">
       <h1>${moviInfo.original_title}</h1>
       <h3 class="starring">Starring:</h3>
       <div class="starcast">
        
     </div>
       <h3 class="storyline">StoryLine:</h3>
       <p>${moviInfo.overview}</p>
   </div>
</div>`

div.classList.add("moreinfo_maincontainer");
div.innerHTML=child;
document.querySelector(".moreinfo").appendChild(div);

}
// window.onload=getMoveiInfo();

const getCast=async()=>{

    let castsdata=await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US&api_key=f34b8f562132c78871a54a5e5d127e16`)
    castsdata=await castsdata.json();
    // console.log(castsdata.cast);
   for(let i=0;i<5;i++){
    // console.log(castsdata.cast[i]);
    const imglink="https://image.tmdb.org/t/p/w185/"+castsdata.cast[i].profile_path;
    const div=document.createElement("div");
    const child=` <img src="${imglink}" alt=""> 
                <h4>${castsdata.cast[i].name}</h4>`
             
             div.innerHTML=child;
             div.classList.add("castcard");
             document.querySelector(".starcast").appendChild(div);   

   }

}
// window.onload=getCast();


const getReleventMoveis=async()=>{
    let movies=await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?&api_key=f34b8f562132c78871a54a5e5d127e16`);
    movies=await movies.json();
    console.log(movies.results);
let count=0;
    movies.results.forEach((el)=>{
       
        if(count<8){
            const imglink="https://image.tmdb.org/t/p/w154/"+el.poster_path;
           const anch=document.createElement("a");
           const child=`
           <div class="moremovei_maincontainer">

           <img src="${imglink}" alt="">
           <h5>${el.original_title}</h5>

        </div>`
        anch.innerHTML=child;
        anch.classList.add("moremoveicard");
        anch.href=`./moreinfo.html?query=${el.id}`
        document.querySelector(".more_movies").appendChild(anch);
            count++;
        }
      

    })
}

// window.onload=getReleventMoveis();
window.onload = () => {
    getMoveiInfo(); // Call the first function
    getCast();      // Call the second function
    getReleventMoveis(); // Call the third function
  };
 
  
  
  
  
  