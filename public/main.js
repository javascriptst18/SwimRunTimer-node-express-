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
let uppdatera = document.querySelector(".uppdatera");

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let lopp = "stora";
let startgrupp = 1;
let raceStartTime1;
let raceStartTime2;
let raceStartTime3;

menyHem.addEventListener("click", () => {
  lopp = "stora";
  document.querySelector(".mellan").classList.add("hidden");
  document.querySelector(".resultat").classList.add("hidden");
  document.querySelector(".langa").classList.remove("hidden");
});

menyResultat.addEventListener("click", e => {
  e.preventDefault();
  mellan = document.querySelector(".mellan");
  langa = document.querySelector(".langa");
  let resultatDiv = document.querySelector(".resultat");
  if(document.querySelector(".resWrapper")){
    let resWrapper = document.querySelector(".resWrapper");
    resultatDiv.removeChild(resWrapper);
  }
  let resWrapper = document.querySelector(".resWrapper");
  if (mellan.classList.contains("hidden")) {
  } else {
    mellan.classList.add("hidden");
  }
  if (langa.classList.contains("hidden")) {
  } else {
    langa.classList.add("hidden");
  }
  
  resultatDiv.classList.remove("hidden");

  (async function() {
    let rankedTimesLanga = await getFetchData(`/rankadetider/stora`);
        let rankedTimesMellan = await getFetchData(`/rankadetider/mellan`);
        let div = document.createElement("div");
        div.classList.add("resWrapper");
        let divStora = document.createElement("div");
        let divMellan = document.createElement("div");
        
       

            //STORA

        let headline1 = document.createElement("h3");
        let divStoraTotal = document.createElement("div");
        headline1.textContent = "Långa Loppet Tider";
        divStoraTotal.appendChild(headline1);

        rankedTimesLanga.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divStoraTotal.appendChild(paragraph);
        });

        divStora.appendChild(divStoraTotal);

        //STORA HERR

        let headline2 = document.createElement("h3");
        let divStoraHerr = document.createElement("div");
        headline2.textContent = "Långa Loppet Tider Klass: Herr";
        divStoraHerr.appendChild(headline2);

        let filterStoraHerr = rankedTimesLanga.filter(function(team){
            return team.klass == "Herr";
        })

        filterStoraHerr.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divStoraHerr.appendChild(paragraph);
        });
        divStora.appendChild(divStoraHerr);

        //STORA DAM

        let headline3 = document.createElement("h3");
        let divStoraDam = document.createElement("div");
        headline3.textContent = "Långa Loppet Tider Klass: Dam";
        divStoraDam.appendChild(headline3);

        let filterStoraDam = rankedTimesLanga.filter(function(team){
            return team.klass == "Dam";
        })

        filterStoraDam.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divStoraDam.appendChild(paragraph);
        });
        divStora.appendChild(divStoraDam);

        //STORA MIX

        let headline4 = document.createElement("h3");
        let divStoraMix = document.createElement("div");
        headline4.textContent = "Långa Loppet Tider Klass: Mix";
        divStoraMix.appendChild(headline4);

        let filterStoraMix = rankedTimesLanga.filter(function(team){
            return team.klass == "Mixed";
        })

        filterStoraMix.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divStoraMix.appendChild(paragraph);
        });
        divStora.appendChild(divStoraMix);



        //MELLAN

        let headline5 = document.createElement("h3");
        let divMellanTotal = document.createElement("div");
        headline5.textContent = "Mellan Loppet Tider";
        divMellanTotal.appendChild(headline5);
        
        rankedTimesMellan.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divMellanTotal.appendChild(paragraph);
        });
        divMellan.appendChild(divMellanTotal);

            //MELLAN HERR

        let headline6 = document.createElement("h3");
        let divMellanHerr = document.createElement("div");
        headline6.textContent = "Mellan Loppet Tider Klass: Herr";
        divMellanHerr.appendChild(headline6);
        
        let filterMellanHerr = rankedTimesMellan.filter(function(team){
            return team.klass == "Herr";
        })

        filterMellanHerr.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divMellanHerr.appendChild(paragraph);
        });
        divMellan.appendChild(divMellanHerr);
        
            //MELLAN DAM

        let headline7 = document.createElement("h3");
        let divMellanDam = document.createElement("div");
        headline7.textContent = "Mellan Loppet Tider Klass: Dam";
        divMellanDam.appendChild(headline7);

        let filterMellanDam = rankedTimesMellan.filter(function(team){
            return team.klass == "Dam";
        })
        
        filterMellanDam.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divMellanDam.appendChild(paragraph);
        });
        divMellan.appendChild(divMellanDam);


        //MELLAN MIX

        let headline8 = document.createElement("h3");
        let divMellanMix = document.createElement("div");
        headline8.textContent = "Mellan Loppet Tider Klass: Mix";
        divMellanMix.appendChild(headline8);

        let filterMellanMix = rankedTimesMellan.filter(function(team){
            return team.klass == "Mixed";
        })
        
        filterMellanMix.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divMellanMix.appendChild(paragraph);
        });
        divMellan.appendChild(divMellanMix);

//APPEND

        div.appendChild(divStora);
        div.appendChild(divMellan);
        resultatDiv.appendChild(div);
        raceSelect.value = "Långa";
      })();
    });

uppdatera.addEventListener("click", e => {
    let resultatDiv = document.querySelector(".resultat");
    if(document.querySelector(".resWrapper")){
        let resWrapper = document.querySelector(".resWrapper");
        resultatDiv.removeChild(resWrapper);
      }
      (async function() {
        let rankedTimesLanga = await getFetchData(`/rankadetider/stora`);
        let rankedTimesMellan = await getFetchData(`/rankadetider/mellan`);
        let div = document.createElement("div");
        div.classList.add("resWrapper");
        let divStora = document.createElement("div");
        let divMellan = document.createElement("div");
        
       

            //STORA

        let headline1 = document.createElement("h3");
        let divStoraTotal = document.createElement("div");
        headline1.textContent = "Långa Loppet Tider";
        divStoraTotal.appendChild(headline1);

        rankedTimesLanga.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divStoraTotal.appendChild(paragraph);
        });

        divStora.appendChild(divStoraTotal);

        //STORA HERR

        let headline2 = document.createElement("h3");
        let divStoraHerr = document.createElement("div");
        headline2.textContent = "Långa Loppet Tider Klass: Herr";
        divStoraHerr.appendChild(headline2);

        let filterStoraHerr = rankedTimesLanga.filter(function(team){
            return team.klass == "Herr";
        })

        filterStoraHerr.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divStoraHerr.appendChild(paragraph);
        });
        divStora.appendChild(divStoraHerr);

        //STORA DAM

        let headline3 = document.createElement("h3");
        let divStoraDam = document.createElement("div");
        headline3.textContent = "Långa Loppet Tider Klass: Dam";
        divStoraDam.appendChild(headline3);

        let filterStoraDam = rankedTimesLanga.filter(function(team){
            return team.klass == "Dam";
        })

        filterStoraDam.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divStoraDam.appendChild(paragraph);
        });
        divStora.appendChild(divStoraDam);

        //STORA MIX

        let headline4 = document.createElement("h3");
        let divStoraMix = document.createElement("div");
        headline4.textContent = "Långa Loppet Tider Klass: Mix";
        divStoraMix.appendChild(headline4);

        let filterStoraMix = rankedTimesLanga.filter(function(team){
            return team.klass == "Mixed";
        })

        filterStoraMix.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divStoraMix.appendChild(paragraph);
        });
        divStora.appendChild(divStoraMix);



        //MELLAN

        let headline5 = document.createElement("h3");
        let divMellanTotal = document.createElement("div");
        headline5.textContent = "Mellan Loppet Tider";
        divMellanTotal.appendChild(headline5);
        
        rankedTimesMellan.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divMellanTotal.appendChild(paragraph);
        });
        divMellan.appendChild(divMellanTotal);

            //MELLAN HERR

        let headline6 = document.createElement("h3");
        let divMellanHerr = document.createElement("div");
        headline6.textContent = "Mellan Loppet Tider Klass: Herr";
        divMellanHerr.appendChild(headline6);
        
        let filterMellanHerr = rankedTimesMellan.filter(function(team){
            return team.klass == "Herr";
        })

        filterMellanHerr.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divMellanHerr.appendChild(paragraph);
        });
        divMellan.appendChild(divMellanHerr);
        
            //MELLAN DAM

        let headline7 = document.createElement("h3");
        let divMellanDam = document.createElement("div");
        headline7.textContent = "Mellan Loppet Tider Klass: Dam";
        divMellanDam.appendChild(headline7);

        let filterMellanDam = rankedTimesMellan.filter(function(team){
            return team.klass == "Dam";
        })
        
        filterMellanDam.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divMellanDam.appendChild(paragraph);
        });
        divMellan.appendChild(divMellanDam);


        //MELLAN MIX

        let headline8 = document.createElement("h3");
        let divMellanMix = document.createElement("div");
        headline8.textContent = "Mellan Loppet Tider Klass: Mix";
        divMellanMix.appendChild(headline8);

        let filterMellanMix = rankedTimesMellan.filter(function(team){
            return team.klass == "Mixed";
        })
        
        filterMellanMix.map(function(team) {
          let paragraph = document.createElement("p");
          paragraph.textContent = `Team ${team.id}: ${
            team.officielltid
          } deltagare ${team.deltagare1} och ${team.deltagare2}`;
          divMellanMix.appendChild(paragraph);
        });
        divMellan.appendChild(divMellanMix);

//APPEND

        div.appendChild(divStora);
        div.appendChild(divMellan);
        resultatDiv.appendChild(div);
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
  raceStartTime1 = new Date();
  let data = {};

  data.starttid = raceStartTime1;
  let div = document.createElement("div");
  div.classList.add("clock1");
  raceClock1.insertAdjacentElement("afterend",div);
  let parent = raceClock1.parentElement;
  parent.removeChild(raceClock1);
  patchFetchData(`/starttid/${lopp}/1 `, data);
  startWatch1();
});
raceClock2.addEventListener("click", () => {
  raceStartTime2 = new Date();
  let data = {};
  let div = document.createElement("div");
  div.classList.add("clock2");
  raceClock2.insertAdjacentElement("afterend",div);
  data.starttid = raceStartTime2;
  let parent = raceClock2.parentElement;
  parent.removeChild(raceClock2);
  patchFetchData(`/starttid/${lopp}/2 `, data);
  startWatch2();
});
raceClock3.addEventListener("click", () => {
  raceStartTime3 = new Date();
  let data = {};
  let div = document.createElement("div");
  div.classList.add("clock3");
  raceClock3.insertAdjacentElement("afterend",div);
  data.starttid = raceStartTime3;
  let parent = raceClock3.parentElement;
  parent.removeChild(raceClock3);
  patchFetchData(`/starttid/mellan/ingen`, data);
  startWatch3();
});

(async function() {
  const deltagare = await getFetchData("/deltagare/stora");
  let fragment = document.createDocumentFragment();
  for (let lag of deltagare) {
    let button = createTeamButton(lag.id);
    if(lag.finished == true){
        button.classList.add("pressed");
    }
    fragment.appendChild(button);
  }
  buttonWrapper.appendChild(fragment);
})();

(async function() {
  const deltagare = await getFetchData("/deltagare/mellan");
  let fragment = document.createDocumentFragment();
  for (let lag of deltagare) {
    let button = createTeamButton(lag.id);
    if(lag.finished == true){
        button.classList.add("pressed");
    }
    fragment.appendChild(button);
  }
  buttonWrapper2.appendChild(fragment);
})();

buttonWrapper.addEventListener("click", e => {
  if (e.target.className == "teamButton") {
     
    (async function() {
    
        e.target.classList.add("pressed");
      const goalTime = new Date();
      const team = e.target.textContent;
      //e.target.style.backgroundColor = "#94d7e0";
      let startgrupp;
      data = {};
      data.maltid = goalTime;
      await patchFetchData("/deltagarelopp/" + lopp + "/" + team, data); //patch måltid
      await (async function() {
        let teamData = await getFetchData("/deltagare/" + lopp + "/" + team); //get startgrupp
        if (lopp == "stora") {
          startgrupp = teamData.startgrupp;
        } else {
          startgrupp = "ingen";
        }
        await (async function() {
          let dataStart = await getFetchData(
            "/starttid/" + lopp + "/" + startgrupp
          ); //get starttid

          let resVar;
          if (lopp == "stora") {
            resVar = ".resLanga";
          } else {
            resVar = ".resMellan";
          }
          let resultatLista = document.querySelector(resVar);
          let result = Date.parse(goalTime) - Date.parse(dataStart);
          result = secToHHMMSS(msecToSec(result));
          let data = {};
          data.officielltid = result;
          data.finished = true;
          await patchFetchData(
            "/deltagarelopp" + "/" + lopp + "/" + team,
            data
          );

          let rankedTimes = await getFetchData(`/rankadetider/${lopp}`);
          let div = document.createElement("div");

          rankedTimes.map(function(team) {
            let para = document.createElement("p");
            para.textContent = `Team ${team.id}: ${team.officielltid}`;
            div.appendChild(para);
          });

          let last = resultatLista.lastChild;
          resultatLista.removeChild(last);
          resultatLista.appendChild(div);
        })();
      })();
    })();
  }
  else if(e.target.className == "teamButton pressed"){
    
      let confirmed = confirm("Är du säker, detta kommer radera tid från team " + e.target.textContent);
      if(confirmed == true){
    
        //e.target.style.backgroundColor = "white"
        const team = e.target.textContent;
        let data = {};
        data.maltid = "";
        data.officielltid = "";
        data.finished = false;
        data.delete = true;
        (async function (){
        await patchFetchData("/deltagarelopp/" + lopp + "/" + team, data);
        (async function (){
            let rankedTimes = await getFetchData(`/rankadetider/${lopp}`);
  
        let resVar;
          if (lopp == "stora") {
            resVar = ".resLanga";
          } else {
            resVar = ".resMellan";
          }
        let resultatLista = document.querySelector(resVar);
          let div = document.createElement("div");

          rankedTimes.map(function(team) {
            let para = document.createElement("p");
            para.textContent = `Team ${team.id}: ${team.officielltid}`;
            div.appendChild(para);
          });

          let last = resultatLista.lastChild;
          resultatLista.removeChild(last);
          resultatLista.appendChild(div);
        })();     
    })();
        
      
      e.target.classList.remove("pressed");
    }
  }
});

buttonWrapper2.addEventListener("click", e => {
    if (e.target.className == "teamButton") {
        console.log("1"); 
      (async function() {
          console.log("4");
          e.target.classList.add("pressed");
        const goalTime = new Date();
        const team = e.target.textContent;
        e.target.style.backgroundColor = "#94d7e0";
        let startgrupp;
        data = {};
        data.maltid = goalTime;
        await patchFetchData("/deltagarelopp/" + lopp + "/" + team, data); //patch måltid
        await (async function() {
          let teamData = await getFetchData("/deltagare/" + lopp + "/" + team); //get startgrupp
          if (lopp == "stora") {
            startgrupp = teamData.startgrupp;
          } else {
            startgrupp = "ingen";
          }
          await (async function() {
            let dataStart = await getFetchData(
              "/starttid/" + lopp + "/" + startgrupp
            ); //get starttid
  
            let resVar;
            if (lopp == "stora") {
              resVar = ".resLanga";
            } else {
              resVar = ".resMellan";
            }
            let resultatLista = document.querySelector(resVar);
            let result = Date.parse(goalTime) - Date.parse(dataStart);
            result = secToHHMMSS(msecToSec(result));
            let data = {};
            data.officielltid = result;
            data.finished = true;
            await patchFetchData(
              "/deltagarelopp" + "/" + lopp + "/" + team,
              data
            );
  
            let rankedTimes = await getFetchData(`/rankadetider/${lopp}`);
            let div = document.createElement("div");
  
            rankedTimes.map(function(team) {
              let para = document.createElement("p");
              para.textContent = `Team ${team.id}: ${team.officielltid}`;
              div.appendChild(para);
            });
  
            let last = resultatLista.lastChild;
            resultatLista.removeChild(last);
            resultatLista.appendChild(div);
          })();
        })();
      })();
    }
    else if(e.target.className == "teamButton pressed"){
      console.log("2");
        let confirmed = confirm("Är du säker, detta kommer radera tid från team " + e.target.textContent);
        if(confirmed == true){
          console.log("3");
          e.target.style.backgroundColor = "white"
          const team = e.target.textContent;
          let data = {};
          data.maltid = "";
          data.officielltid = "";
          data.finished = false;
          data.delete = true;
          (async function (){
          await patchFetchData("/deltagarelopp/" + lopp + "/" + team, data);
          (async function (){
              let rankedTimes = await getFetchData(`/rankadetider/${lopp}`);
          console.log(rankedTimes);
          let resVar;
            if (lopp == "stora") {
              resVar = ".resLanga";
            } else {
              resVar = ".resMellan";
            }
          let resultatLista = document.querySelector(resVar);
            let div = document.createElement("div");
  
            rankedTimes.map(function(team) {
              let para = document.createElement("p");
              para.textContent = `Team ${team.id}: ${team.officielltid}`;
              div.appendChild(para);
            });
  
            let last = resultatLista.lastChild;
            resultatLista.removeChild(last);
            resultatLista.appendChild(div);
          })();     
      })();
          
        
        e.target.classList.remove("pressed");
      }
    }
  });
// FUNCTIONS

function displayTime1() {

  let time = secToHHMMSS((Date.parse(new Date()) - Date.parse(raceStartTime1))/1000)
  document.querySelector(".clock1").innerHTML = time;

}

function startWatch1() {
  runClock1 = setInterval(displayTime1, 1000);
}

function stopWatch1() {
  clearInterval(runClock1);
}
function displayTime2() {

    let time = secToHHMMSS((Date.parse(new Date()) - Date.parse(raceStartTime2))/1000)
    document.querySelector(".clock2").innerHTML = time;
  }
  
  function startWatch2() {
    runClock2 = setInterval(displayTime2, 1000);
  }
  
  function stopWatch2() {
    clearInterval(runClock2);
  }
  function displayTime3() {

    let time = secToHHMMSS((Date.parse(new Date()) - Date.parse(raceStartTime3))/1000)
    document.querySelector(".clock3").innerHTML = time;
  }
  
  function startWatch3() {
    runClock3 = setInterval(displayTime3, 1000);
  }
  
  function stopWatch3() {
    clearInterval(runClock3);
  }

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
  
  let response = await fetch(url);
  
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
