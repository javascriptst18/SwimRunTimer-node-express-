
let buttonWrapper = document.querySelector(".griditem2");
let raceClock = document.querySelector(".raceKlocka");

raceClock.addEventListener("click", () =>{
    const raceStartTime = new Date();
    let data ={};
    
    data.starttid = raceStartTime;
    let parent = raceClock.parentElement;
    parent.removeChild(raceClock);
    patchFetchData("https://sosswimrun.herokuapp.com/starttid/","0", data);

});

(async function(){
const deltagare = await getFetchData("https://sosswimrun.herokuapp.com/deltagare");
for(let lag of deltagare){
    let lagnummmer = lag.id;
    let button = document.createElement("button");
    button.classList.add("teamButton");
    button.textContent = lagnummmer;
    buttonWrapper.appendChild(button);
}
})();

buttonWrapper.addEventListener("click", (e) =>{
if(e.target.className == "teamButton"){
    const goalTime = new Date();
    const team = e.target.textContent;
    console.log(e.target.textContent)
    data = {};
    data.maltid = goalTime;
    patchFetchData("https://sosswimrun.herokuapp.com/deltagare/", team, data);
    (async function(){
    let dataStart = await getFetchData("https://sosswimrun.herokuapp.com/starttid/0");
    let resultatLista = document.querySelector(".griditem3")
    let startTime = dataStart.starttid;
    let goalMilliSec = Date.parse(goalTime);
    let startTimeMilliSec = Date.parse(startTime);
    let result = goalMilliSec - startTimeMilliSec;
    result = result / 1000;
    let paragraph = document.createElement("p");
    paragraph.textContent = `Team ${team}: ${result}`;
    
    resultatLista.appendChild(paragraph);

})();  
}
});


// FUNCTIONS

async function getFetchData(url){
   let response = await fetch(url);
   let data = await response.json();
   return data;

}
async function postFetchData(url, post){
    try{
        fetch(url,{
            method: "POST",
                  
            body: JSON.stringify(post),
            headers: {
                "Content-Type": 'application/json'
                
                
            }
        });
    }
    catch(error){
        console.log(error);
    }
}
async function patchFetchData(url, id, post){
    try{
        fetch(url+id,{
            method: "PATCH",
                  
            body: JSON.stringify(post),
            headers: {
                "Content-Type": 'application/json'
                
                
            }
        });
    }
    catch(error){
        console.log(error);
    }
}