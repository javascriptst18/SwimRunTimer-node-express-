
let buttonWrapper = document.querySelector(".buttonWrapperLang");
let buttonWrapper2 = document.querySelector(".buttonWrapperMellan");
let raceClock1 = document.querySelector(".raceKlocka1");
let raceClock2 = document.querySelector(".raceKlocka2");
let raceClock3 = document.querySelector(".raceKlocka3");
let menyResultat = document.querySelector(".menyResultat");
let raceSelect = document.querySelector(".raceSelect");

let lopp = "stora"
let startgrupp = 1;



raceSelect.addEventListener("change", (e) =>{
    raceSelect = document.querySelector(".raceSelect");
    if(raceSelect.value=="stora"){
        lopp = "stora"; 
         document.querySelector(".mellan").classList.add("hidden");
         document.querySelector(".langa").classList.remove("hidden");
    }else if(raceSelect.value=="mellan"){
        lopp = "mellan";
        document.querySelector(".mellan").classList.remove("hidden");
         document.querySelector(".langa").classList.add("hidden");
        startgrupp = "ingen";
         
    }
})



raceClock1.addEventListener("click", () =>{
    const raceStartTime = new Date();
    let data ={};
    
    data.starttid = raceStartTime;
    let parent = raceClock1.parentElement;
    parent.removeChild(raceClock1);
    patchFetchData(`http://localhost:3000/starttid/${lopp}/1 `, data);

});
raceClock2.addEventListener("click", () =>{
    const raceStartTime = new Date();
    let data ={};
    
    data.starttid = raceStartTime;
    let parent = raceClock2.parentElement;
    parent.removeChild(raceClock2);
    patchFetchData(`http://localhost:3000/starttid/${lopp}/2 `, data);

});
raceClock3.addEventListener("click", () =>{
    const raceStartTime = new Date();
    let data ={};
    
    data.starttid = raceStartTime;
    let parent = raceClock3.parentElement;
    parent.removeChild(raceClock3);
    patchFetchData(`http://localhost:3000/starttid/mellan/ingen`, data);

});

(async function(){
const deltagare = await getFetchData("http://localhost:3000/deltagare/stora");
for(let lag of deltagare){
    let button = createTeamButton(lag.id);
    buttonWrapper.appendChild(button);
}
})();

(async function(){
    const deltagare = await getFetchData("http://localhost:3000/deltagare/mellan");
    for(let lag of deltagare){
        let button = createTeamButton(lag.id);
        buttonWrapper2.appendChild(button);
    }
    })();


buttonWrapper.addEventListener("click", (e) =>{
if(e.target.className == "teamButton"){
    const goalTime = new Date();
    const team = e.target.textContent;
    data = {};
    data.maltid = goalTime;
    patchFetchData("http://localhost:3000/deltagarelopp/" + lopp + "/" + team, data); //patch måltid
    
    (async function(){
        
    let teamData = await getFetchData("http://localhost:3000/deltagare" + "/"+ lopp + "/" + team) //get startgrupp
    startgrupp = teamData.startgrupp
    console.log(startgrupp);
    (async function(){
        let dataStart = await getFetchData("http://localhost:3000/starttid/" + lopp + "/" + startgrupp); //get starttid
        console.log(dataStart);
        let resultatLista = document.querySelector(".griditem3")
        let goalMilliSec = Date.parse(goalTime);
        let startTimeMilliSec = Date.parse(dataStart);
        let result = goalMilliSec - startTimeMilliSec;
        result = msecToSec(result)
        result = secToHHMMSS(result);
        let paragraph = document.createElement("p");
        paragraph.textContent = `Team ${team}: ${result}`;
        resultatLista.appendChild(paragraph);
        let data = {};
        data.officielltid = result;
        data.finished = true;
        patchFetchData("http://localhost:3000/deltagarelopp" + "/"+ lopp + "/" + team, data);    //skicka beräknad lopp tid och finished
             
    })();
    })();
      
}
});

buttonWrapper2.addEventListener("click", (e) =>{
    if(e.target.className == "teamButton"){
        const goalTime = new Date();
        const team = e.target.textContent;
        data = {};
        data.maltid = goalTime;
        patchFetchData("http://localhost:3000/deltagarelopp/" + lopp + "/" + team, data); //patch måltid
        
        (async function(){
            
        let teamData = await getFetchData("http://localhost:3000/deltagare" + "/"+ lopp + "/" + team) //get startgrupp
        startgrupp = teamData.startgrupp
        console.log(startgrupp);
        (async function(){
            let dataStart = await getFetchData("http://localhost:3000/starttid/" + lopp + "/" + startgrupp); //get starttid
            console.log(dataStart);
            let resultatLista = document.querySelector(".griditem3")
            let goalMilliSec = Date.parse(goalTime);
            let startTimeMilliSec = Date.parse(dataStart);
            let result = goalMilliSec - startTimeMilliSec;
            result = msecToSec(result)
            result = secToHHMMSS(result);
            let paragraph = document.createElement("p");
            paragraph.textContent = `Team ${team}: ${result}`;
            resultatLista.appendChild(paragraph);
            let data = {};
            data.officielltid = result;
            data.finished = true;
            patchFetchData("http://localhost:3000/deltagarelopp" + "/"+ lopp + "/" + team, data);    //skicka beräknad lopp tid och finished
                 
        })();
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
    console.log(url);
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

