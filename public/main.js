let buttonWrapper = document.querySelector(".buttonWrapperLang");
let buttonWrapper2 = document.querySelector(".buttonWrapperMellan");
let raceClock1 = document.querySelector(".raceKlocka1");
let raceClock2 = document.querySelector(".raceKlocka2");
let raceClock3 = document.querySelector(".raceKlocka3");
let menyResultat = document.querySelector(".menyResultat");
let raceSelect = document.querySelector(".raceSelect");
let menyHem = document.querySelector(".menyHem");
let mellan = document.querySelector(".mellan");
let langa = document.querySelector(".langa");


let lopp = "stora";
let startgrupp = 1;

menyHem.addEventListener("click", () =>{


    lopp = "stora";
    document.querySelector(".mellan").classList.add("hidden");
    document.querySelector(".resultat").classList.add("hidden");
    document.querySelector(".langa").classList.remove("hidden");
});

menyResultat.addEventListener("click", (e) =>{
    e.preventDefault();
    mellan = document.querySelector(".mellan");
    langa = document.querySelector(".langa");
    let resultatDiv = document.querySelector(".resultat");
    if (mellan.classList.contains('hidden')) { 
      } else {
        mellan.classList.add('hidden');
      }
      if (langa.classList.contains('hidden')) {
    } else {   
      langa.classList.add('hidden');
    }
    while(resultatDiv.hasChildNodes()){
        let lastChild = resultatDiv.lastChild;
        resultatDiv.removeChild(lastChild); 
    }
    resultatDiv.classList.remove("hidden");

    (async function(){
    let rankedTimesLanga =  await getFetchData(`/rankadetider/stora`);
    let rankedTimesMellan = await getFetchData(`/rankadetider/mellan`);
          
    let headline1 = document.createElement("h3");
    headline1.textContent = "Långa Loppet Tider";
    resultatDiv.appendChild(headline1);

          rankedTimesLanga.map(function(team){
            let paragraph = document.createElement("p");
            paragraph.textContent = `Team ${team.id}: ${team.officielltid} deltagare ${team.deltagare1} och ${team.deltagare2}`;
            resultatDiv.appendChild(paragraph);
          })
          let headline2 = document.createElement("h3");
          headline2.textContent = "Mellan Loppet Tider";
    resultatDiv.appendChild(headline2);

          rankedTimesMellan.map(function(team){
            let paragraph = document.createElement("p");
            paragraph.textContent = `Team ${team.id}: ${team.officielltid} deltagare ${team.deltagare1} och ${team.deltagare2}`;
            resultatDiv.appendChild(paragraph);
          })
          raceSelect.value = "Långa";
        })();
});

raceSelect.addEventListener("change", e => {
  raceSelect = document.querySelector(".raceSelect");
  if (raceSelect.value == "stora") {
    lopp = "stora";
    document.querySelector(".mellan").classList.add("hidden");
    document.querySelector(".langa").classList.remove("hidden");
  } else if (raceSelect.value == "mellan") {
    lopp = "mellan";
    document.querySelector(".mellan").classList.remove("hidden");
    document.querySelector(".langa").classList.add("hidden");
    startgrupp = "ingen";
  }
});

raceClock1.addEventListener("click", () => {
  const raceStartTime = new Date();
  let data = {};

  data.starttid = raceStartTime;
  let parent = raceClock1.parentElement;
  parent.removeChild(raceClock1);
  patchFetchData(`/starttid/${lopp}/1 `, data);
});
raceClock2.addEventListener("click", () => {
  const raceStartTime = new Date();
  let data = {};

  data.starttid = raceStartTime;
  let parent = raceClock2.parentElement;
  parent.removeChild(raceClock2);
  patchFetchData(`/starttid/${lopp}/2 `, data);
});
raceClock3.addEventListener("click", () => {
  const raceStartTime = new Date();
  let data = {};

  data.starttid = raceStartTime;
  let parent = raceClock3.parentElement;
  parent.removeChild(raceClock3);
  patchFetchData(`/starttid/mellan/ingen`, data);
});

(async function() {
  const deltagare = await getFetchData("/deltagare/stora");
  for (let lag of deltagare) {
    let button = createTeamButton(lag.id);
    buttonWrapper.appendChild(button);
  }
})();

(async function() {
  const deltagare = await getFetchData("/deltagare/mellan");
  for (let lag of deltagare) {
    let button = createTeamButton(lag.id);
    buttonWrapper2.appendChild(button);
  }
})();

buttonWrapper.addEventListener("click", e => {
  if (e.target.className == "teamButton") {
    (async function() {
      const goalTime = new Date();
      const team = e.target.textContent;
      data = {};
      data.maltid = goalTime;
      await patchFetchData("/deltagarelopp/" + lopp + "/" + team, data); //patch måltid
      await (async function() {
        let teamData = await getFetchData("/deltagare/" + lopp + "/" + team); //get startgrupp
        if(lopp == "stora"){
        startgrupp = teamData.startgrupp;
        }else{
            startgrupp = "ingen"
        }
        await (async function() {
          let dataStart = await getFetchData("/starttid/" + lopp + "/" + startgrupp); //get starttid
          let resVar;
            if(lopp == "stora"){
                resVar = ".resLanga";
            }else{
                resVar = ".resMellan";
            }
          let resultatLista = document.querySelector(resVar);
          let result = Date.parse(goalTime) - Date.parse(dataStart);
          result = secToHHMMSS(msecToSec(result));
          let data = {};
          data.officielltid = result;
          data.finished = true;
          await patchFetchData("/deltagarelopp" + "/" + lopp + "/" + team, data);
          let rankedTimes = await getFetchData(`/rankadetider/${lopp}`);
          let div = document.createElement("div");

          rankedTimes.map(function(team){
            let para = document.createElement("p");
            para.textContent = `Team ${team.id}: ${team.officielltid}`;
            div.appendChild(para);
          })
          let last = resultatLista.lastChild;
          resultatLista.removeChild(last);
          resultatLista.appendChild(div);
        })();
      })();
    })();
  }
});

buttonWrapper2.addEventListener("click", e => {
    if (e.target.className == "teamButton") {
        (async function() {
          const goalTime = new Date();
          const team = e.target.textContent;
          data = {};
          data.maltid = goalTime;
          await patchFetchData("/deltagarelopp/" + lopp + "/" + team, data); //patch måltid
          await (async function() {
            let teamData = await getFetchData("/deltagare/" + lopp + "/" + team); //get startgrupp
            if(lopp == "stora"){
            startgrupp = teamData.startgrupp;
            }else{
                startgrupp = "ingen"
            }
            await (async function() {
              let dataStart = await getFetchData("/starttid/" + lopp + "/" + startgrupp); //get starttid
              let resVar;
                if(lopp == "stora"){
                    resVar = ".resLanga";
                }else{
                    resVar = ".resMellan";
                }
              let resultatLista = document.querySelector(resVar);
              let result = Date.parse(goalTime) - Date.parse(dataStart);
              result = secToHHMMSS(msecToSec(result));
              let data = {};
              data.officielltid = result;
              data.finished = true;
              await patchFetchData("/deltagarelopp" + "/" + lopp + "/" + team, data);
              let rankedTimes = await getFetchData(`/rankadetider/${lopp}`);
              let div = document.createElement("div");
    
              rankedTimes.map(function(team){
                let para = document.createElement("p");
                para.textContent = `Team ${team.id}: ${team.officielltid}`;
                div.appendChild(para);
              })
              let last = resultatLista.lastChild;
              resultatLista.removeChild(last);
              resultatLista.appendChild(div);
            })();
          })();
        })();
      }
    });
// FUNCTIONS

function msecToSec(msec) {
  return msec / 1000;
}

function createTeamButton(lagnummer) {
  let button = document.createElement("button");
  button.classList.add("teamButton");
  button.textContent = lagnummer;
  return button;
}

function secToHHMMSS(input) {
  let inputSec = parseInt(input);
  let hour = 0;
  let min = 0;

  while (inputSec > 59) {
    inputSec = inputSec - 60;
    min++;
  }
  while (min > 59) {
    min = min - 60;
    hour++;
  }

  hour = ("0" + hour).slice(-2);
  min = ("0" + min).slice(-2);
  inputSec = ("0" + inputSec).slice(-2);

  return `${hour}:${min}:${inputSec}`;
}

//FETCH functions

async function getFetchData(url) {
  console.log(url);
  let response = await fetch(url);
  console.log(response);
  let data = await response.json();
  return data;
}
async function postFetchData(url, post) {
  try {
    fetch(url, {
      method: "POST",

      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.log(error);
  }
}
async function patchFetchData(url, post) {
  try {
    await fetch(url, {
      method: "PATCH",

      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.log(error);
  }
}
