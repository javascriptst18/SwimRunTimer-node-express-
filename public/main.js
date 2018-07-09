
let buttonWrapper = document.querySelector(".griditem2");
let raceClock = document.querySelector(".raceKlocka");
let menyResultat = document.querySelector(".menyResultat");
let raceSelect = document.querySelector(".raceSelect");

let lopp = "stora"



raceSelect.addEventListener("change", (e) =>{
    raceSelect = document.querySelector(".raceSelect");
    lopp = raceSelect.value;
})

menyResultat.addEventListener("click", () =>{
 buttonWrapper.classList.toggle("hidden");
})

raceClock.addEventListener("click", () =>{
    const raceStartTime = new Date();
    let data ={};
    
    data.starttid = raceStartTime;
    let parent = raceClock.parentElement;
    parent.removeChild(raceClock);
    patchFetchData("http://localhost:3000/starttid/" + lopp , data);

});

(async function(){
const deltagare = await getFetchData("http://localhost:3000/deltagare/" + lopp);
for(let lag of deltagare){
    let button = createTeamButton(lag.id);
    buttonWrapper.appendChild(button);
}
})();

buttonWrapper.addEventListener("click", (e) =>{
if(e.target.className == "teamButton"){
    const goalTime = new Date();
    const team = e.target.textContent;
    data = {};
    data.maltid = goalTime;
    let url = "http://localhost:3000/deltagarelopp" + lopp + "/" + team;
    
    patchFetchData(url, data);
    (async function(){
    
    let dataStart = await getFetchData("http://localhost:3000/starttid/" + lopp);
    let resultatLista = document.querySelector(".griditem3")
    let goalMilliSec = Date.parse(goalTime);
    let startTimeMilliSec = Date.parse(dataStart);
    let result = goalMilliSec - startTimeMilliSec;
    result = msecToSec(result)
    result = secToHHMMSS(result);
    let paragraph = document.createElement("p");
    paragraph.textContent = `Team ${team}: ${result}`;
    resultatLista.appendChild(paragraph);

})();  
}
});


// FUNCTIONS

function msecToSec (msec){
    return msec/1000;
}

function createTeamButton (lagnummer){
    let button = document.createElement("button");
    button.classList.add("teamButton");
    button.textContent = lagnummer;
    return button;
}

function secToHHMMSS(input){
    let inputSec = parseInt(input);
    let hour = 0;
    let min = 0;
   
    while(inputSec>60){
        inputSec = inputSec-60;
        min++;
    }
    while(min>60){
        min = min-60;
        hour++;
    }

   hour = ("0" + hour).slice(-2);
   min = ("0" + min).slice(-2);
   inputSec = ("0" + inputSec).slice(-2);


    return `${hour}:${min}:${inputSec}`;
}


//FETCH functions

async function getFetchData(url){
   let response = await fetch(url);
   console.log(response);
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
async function patchFetchData(url, post){
    try{
       await fetch(url,{
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

