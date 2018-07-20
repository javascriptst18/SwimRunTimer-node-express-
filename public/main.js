let buttonWrapper = document.querySelector(".buttonWrapperLang");
let buttonWrapper2 = document.querySelector(".buttonWrapperMellan");
let raceClock1 = document.querySelector(".raceKlocka1");
let raceClock2 = document.querySelector(".raceKlocka2");
let raceClock4 = document.querySelector(".raceKlocka4");
let raceClock3 = document.querySelector(".raceKlocka3");
let menyResultat = document.querySelector(".menyResultat");
let raceSelect = document.querySelector(".raceSelect");
let menyHem = document.querySelector(".menyHem");
let mellan = document.querySelector(".mellan");
let langa = document.querySelector(".langa");
let uppdatera = document.querySelector(".uppdatera");
let radioRaceSelect = document.querySelector(".radioRaceSelect");
let radioKlassSelect = document.querySelector(".radioKlassSelect");

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let lopp = "langa";
let startgrupp = 1;
let raceStartTime1;
let raceStartTime2;
let raceStartTime4;
let raceStartTime3;

(async function() {
  let dataStart = await getFetchData("/starttid/langa/1");
  if (dataStart) {
    let div = document.createElement("div");
    div.classList.add("clock1");
    raceClock1.insertAdjacentElement("afterend", div);
    let parent = raceClock1.parentElement;
    parent.removeChild(raceClock1);
    raceStartTime1 = dataStart;
    startWatch1();
  }
})();
(async function() {
  let dataStart = await getFetchData("/starttid/langa/2");
  if (dataStart) {
    let div = document.createElement("div");
    div.classList.add("clock2");
    raceClock2.insertAdjacentElement("afterend", div);
    let parent = raceClock2.parentElement;
    parent.removeChild(raceClock2);
    raceStartTime2 = dataStart;
    startWatch2();
  }
})();

(async function() {
  let dataStart = await getFetchData("/starttid/langa/3");
  if (dataStart) {
    let div = document.createElement("div");
    div.classList.add("clock4");
    raceClock4.insertAdjacentElement("afterend", div);
    let parent = raceClock4.parentElement;
    parent.removeChild(raceClock4);
    raceStartTime4 = dataStart;
    startWatch4();
  }
})();


(async function() {
  let dataStart = await getFetchData("/starttid/mellan/ingen");
  if (dataStart) {
    let div = document.createElement("div");
    div.classList.add("clock3");
    raceClock3.insertAdjacentElement("afterend", div);
    let parent = raceClock3.parentElement;
    parent.removeChild(raceClock3);
    raceStartTime3 = dataStart;
    startWatch3();
  }
})();



(async function() {
  let rankedTimes = await getFetchData(`/rankadetider/langa`);
  let div = document.createElement("div");
  let resultatLista = document.querySelector(".resLanga");
  rankedTimes.map(function(team) {
    let para = document.createElement("p");
    para.textContent = `Team ${team.id}: ${team.officielltid}`;
    div.appendChild(para);
  });

  let last = resultatLista.lastChild;
  resultatLista.removeChild(last);
  resultatLista.appendChild(div);
})();

(async function() {
  let rankedTimes = await getFetchData(`/rankadetider/mellan`);
  let div = document.createElement("div");
  let resultatLista = document.querySelector(".resMellan");
  rankedTimes.map(function(team) {
    let para = document.createElement("p");
    para.textContent = `Team ${team.id}: ${team.officielltid}`;
    div.appendChild(para);
  });

  let last = resultatLista.lastChild;
  resultatLista.removeChild(last);
  resultatLista.appendChild(div);
})();



(async function() {
  const deltagare = await getFetchData("/deltagare/langa");
  let fragment = document.createDocumentFragment();
  for (let lag of deltagare) {
    let button = createTeamButton(lag.id);
    if (lag.finished == true) {
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
    if (lag.finished == true) {
      button.classList.add("pressed");
    }
    fragment.appendChild(button);
  }
  buttonWrapper2.appendChild(fragment);
})();

menyHem.addEventListener("click", () => {
  lopp = "langa";
  document.querySelector(".mellan").classList.add("hidden");
  document.querySelector(".resultat").classList.add("hidden");
  document.querySelector(".langa").classList.remove("hidden");
});

radioRaceSelect.addEventListener("change", e => {
  e.preventDefault();
  if (e.target.id == "storaRaceRadio") {
    document.querySelector(".storaResultat").classList.remove("hidden");
    document.querySelector(".mellanResultat").classList.add("hidden");
  } else if (e.target.id == "mellanRaceRadio") {
    document.querySelector(".mellanResultat").classList.remove("hidden");
    document.querySelector(".storaResultat").classList.add("hidden");
  }
});

radioKlassSelect.addEventListener("change", e => {
  e.preventDefault();
  if (e.target.id == "Total") {
    hideRes();
    document.querySelector(".storaResultatTotal").classList.remove("hidden");
    document.querySelector(".mellanResultatTotal").classList.remove("hidden");
  } else if (e.target.id == "Herr") {
    hideRes();
    document.querySelector(".mellanResultatHerr").classList.remove("hidden");
    document.querySelector(".storaResultatHerr").classList.remove("hidden");
  } else if (e.target.id == "Dam") {
    hideRes();
    document.querySelector(".mellanResultatDam").classList.remove("hidden");
    document.querySelector(".storaResultatDam").classList.remove("hidden");
  } else if (e.target.id == "Mix") {
    hideRes();
    document.querySelector(".mellanResultatMix").classList.remove("hidden");
    document.querySelector(".storaResultatMix").classList.remove("hidden");
  }
});

menyResultat.addEventListener("click", e => {
  e.preventDefault();
  mellan = document.querySelector(".mellan");
  langa = document.querySelector(".langa");
  document.querySelector("#storaRaceRadio").checked = true;
  document.querySelector("#Total").checked = true;

  let resultatDiv = document.querySelector(".resultat");
  if (document.querySelector(".resWrapper")) {
    let resWrapper = document.querySelector(".resWrapper");
    resultatDiv.removeChild(resWrapper);
  }
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
    let rankedTimesLanga = await getFetchData(`/rankadetider/langa`);
    let rankedTimesMellan = await getFetchData(`/rankadetider/mellan`);
    let div = document.createElement("div");
    div.classList.add("resWrapper");
    let divStora = document.createElement("div");
    divStora.classList.add("storaResultat");
    let divMellan = document.createElement("div");
    divMellan.classList.add("mellanResultat", "hidden");

    //LÅNGA

    let headline1 = document.createElement("h3");
    let divStoraTotal = document.createElement("div");
    divStoraTotal.classList.add("storaResultatTotal");
    headline1.textContent = "Långa Loppet Tider";
    divStoraTotal.appendChild(headline1);

    rankedTimesLanga.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divStoraTotal.appendChild(paragraph);
    });

    divStora.appendChild(divStoraTotal);

    //LÅNGA HERR

    let headline2 = document.createElement("h3");
    let divStoraHerr = document.createElement("div");
    divStoraHerr.classList.add("storaResultatHerr", "hidden");

    headline2.textContent = "Långa Loppet Tider Klass: Herr";
    divStoraHerr.appendChild(headline2);

    let filterStoraHerr = rankedTimesLanga.filter(function(team) {
      return team.klass == "Herr";
    });

    filterStoraHerr.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divStoraHerr.appendChild(paragraph);
    });
    divStora.appendChild(divStoraHerr);

    //LÅNGA DAM

    let headline3 = document.createElement("h3");
    let divStoraDam = document.createElement("div");
    divStoraDam.classList.add("storaResultatDam", "hidden");

    headline3.textContent = "Långa Loppet Tider Klass: Dam";
    divStoraDam.appendChild(headline3);

    let filterStoraDam = rankedTimesLanga.filter(function(team) {
      return team.klass == "Dam";
    });

    filterStoraDam.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divStoraDam.appendChild(paragraph);
    });
    divStora.appendChild(divStoraDam);

    //LÅNGA MIX

    let headline4 = document.createElement("h3");
    let divStoraMix = document.createElement("div");
    divStoraMix.classList.add("storaResultatMix", "hidden");

    headline4.textContent = "Långa Loppet Tider Klass: Mix";
    divStoraMix.appendChild(headline4);

    let filterStoraMix = rankedTimesLanga.filter(function(team) {
      return team.klass == "Mixed";
    });

    filterStoraMix.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divStoraMix.appendChild(paragraph);
    });
    divStora.appendChild(divStoraMix);

    //MELLAN

    let headline5 = document.createElement("h3");
    let divMellanTotal = document.createElement("div");
    divMellanTotal.classList.add("mellanResultatTotal");

    headline5.textContent = "Mellan Loppet Tider";
    divMellanTotal.appendChild(headline5);

    rankedTimesMellan.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divMellanTotal.appendChild(paragraph);
    });
    divMellan.appendChild(divMellanTotal);

    //MELLAN HERR

    let headline6 = document.createElement("h3");
    let divMellanHerr = document.createElement("div");
    divMellanHerr.classList.add("mellanResultatHerr", "hidden");
    headline6.textContent = "Mellan Loppet Tider Klass: Herr";
    divMellanHerr.appendChild(headline6);

    let filterMellanHerr = rankedTimesMellan.filter(function(team) {
      return team.klass == "Herr";
    });

    filterMellanHerr.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divMellanHerr.appendChild(paragraph);
    });
    divMellan.appendChild(divMellanHerr);

    //MELLAN DAM

    let headline7 = document.createElement("h3");
    let divMellanDam = document.createElement("div");
    divMellanDam.classList.add("mellanResultatDam", "hidden");
    headline7.textContent = "Mellan Loppet Tider Klass: Dam";
    divMellanDam.appendChild(headline7);

    let filterMellanDam = rankedTimesMellan.filter(function(team) {
      return team.klass == "Dam";
    });

    filterMellanDam.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divMellanDam.appendChild(paragraph);
    });
    divMellan.appendChild(divMellanDam);

    //MELLAN MIX

    let headline8 = document.createElement("h3");
    let divMellanMix = document.createElement("div");
    divMellanMix.classList.add("mellanResultatMix", "hidden");
    headline8.textContent = "Mellan Loppet Tider Klass: Mix";
    divMellanMix.appendChild(headline8);

    let filterMellanMix = rankedTimesMellan.filter(function(team) {
      return team.klass == "Mixed";
    });

    filterMellanMix.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divMellanMix.appendChild(paragraph);
    });
    divMellan.appendChild(divMellanMix);

    //APPEND

    div.appendChild(divStora);
    div.appendChild(divMellan);
    resultatDiv.appendChild(div);
    raceSelect.value = "langa";
  })();
});

uppdatera.addEventListener("click", e => {
  let resultatDiv = document.querySelector(".resultat");
  if (document.querySelector(".resWrapper")) {
    let resWrapper = document.querySelector(".resWrapper");
    resultatDiv.removeChild(resWrapper);
  }
  (async function() {
    let rankedTimesLanga = await getFetchData(`/rankadetider/langa`);
    let rankedTimesMellan = await getFetchData(`/rankadetider/mellan`);
    let div = document.createElement("div");
    div.classList.add("resWrapper");
    let divStora = document.createElement("div");
    divStora.classList.add("storaResultat");
    let divMellan = document.createElement("div");
    divMellan.classList.add("mellanResultat");
    if (document.querySelector("#storaRaceRadio").checked) {
      divMellan.classList.add("hidden");
    } else if (document.querySelector("#mellanRaceRadio").checked) {
      divStora.classList.add("hidden");
    } else {
      divMellan.classList.add("hidden");
    }

    //LÅNGA

    let headline1 = document.createElement("h3");
    let divStoraTotal = document.createElement("div");
    divStoraTotal.classList.add("storaResultatTotal");
    if (document.querySelector("#Total").checked == false) {
      divStoraTotal.classList.add("hidden");
    }
    headline1.textContent = "Långa Loppet Tider";
    divStoraTotal.appendChild(headline1);

    rankedTimesLanga.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divStoraTotal.appendChild(paragraph);
    });

    divStora.appendChild(divStoraTotal);

    //LÅNGA HERR

    let headline2 = document.createElement("h3");
    let divStoraHerr = document.createElement("div");
    divStoraHerr.classList.add("storaResultatHerr");
    if (document.querySelector("#Herr").checked == false) {
      divStoraHerr.classList.add("hidden");
    }

    headline2.textContent = "Långa Loppet Tider Klass: Herr";
    divStoraHerr.appendChild(headline2);

    let filterStoraHerr = rankedTimesLanga.filter(function(team) {
      return team.klass == "Herr";
    });

    filterStoraHerr.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divStoraHerr.appendChild(paragraph);
    });
    divStora.appendChild(divStoraHerr);

    //LÅNGA DAM

    let headline3 = document.createElement("h3");
    let divStoraDam = document.createElement("div");
    divStoraDam.classList.add("storaResultatDam");
    if (document.querySelector("#Dam").checked == false) {
      divStoraDam.classList.add("hidden");
    }

    headline3.textContent = "Långa Loppet Tider Klass: Dam";
    divStoraDam.appendChild(headline3);

    let filterStoraDam = rankedTimesLanga.filter(function(team) {
      return team.klass == "Dam";
    });

    filterStoraDam.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divStoraDam.appendChild(paragraph);
    });
    divStora.appendChild(divStoraDam);

    //LÅNGA MIX

    let headline4 = document.createElement("h3");
    let divStoraMix = document.createElement("div");
    divStoraMix.classList.add("storaResultatMix");
    if (document.querySelector("#Mix").checked == false) {
      divStoraMix.classList.add("hidden");
    }
    headline4.textContent = "Långa Loppet Tider Klass: Mix";
    divStoraMix.appendChild(headline4);

    let filterStoraMix = rankedTimesLanga.filter(function(team) {
      return team.klass == "Mixed";
    });

    filterStoraMix.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divStoraMix.appendChild(paragraph);
    });
    divStora.appendChild(divStoraMix);

    //MELLAN

    let headline5 = document.createElement("h3");
    let divMellanTotal = document.createElement("div");
    divMellanTotal.classList.add("mellanResultatTotal");
    if (document.querySelector("#Total").checked == false) {
      divMellanTotal.classList.add("hidden");
    }

    headline5.textContent = "Mellan Loppet Tider";
    divMellanTotal.appendChild(headline5);

    rankedTimesMellan.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divMellanTotal.appendChild(paragraph);
    });
    divMellan.appendChild(divMellanTotal);

    //MELLAN HERR

    let headline6 = document.createElement("h3");
    let divMellanHerr = document.createElement("div");
    divMellanHerr.classList.add("mellanResultatHerr");
    if (document.querySelector("#Herr").checked == false) {
      divMellanHerr.classList.add("hidden");
    }
    headline6.textContent = "Mellan Loppet Tider Klass: Herr";
    divMellanHerr.appendChild(headline6);

    let filterMellanHerr = rankedTimesMellan.filter(function(team) {
      return team.klass == "Herr";
    });

    filterMellanHerr.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divMellanHerr.appendChild(paragraph);
    });
    divMellan.appendChild(divMellanHerr);

    //MELLAN DAM

    let headline7 = document.createElement("h3");
    let divMellanDam = document.createElement("div");
    divMellanDam.classList.add("mellanResultatDam");
    if (document.querySelector("#Dam").checked == false) {
      divMellanDam.classList.add("hidden");
    }
    headline7.textContent = "Mellan Loppet Tider Klass: Dam";
    divMellanDam.appendChild(headline7);

    let filterMellanDam = rankedTimesMellan.filter(function(team) {
      return team.klass == "Dam";
    });

    filterMellanDam.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divMellanDam.appendChild(paragraph);
    });
    divMellan.appendChild(divMellanDam);

    //MELLAN MIX

    let headline8 = document.createElement("h3");
    let divMellanMix = document.createElement("div");
    divMellanMix.classList.add("mellanResultatMix");
    if (document.querySelector("#Mix").checked == false) {
      divMellanMix.classList.add("hidden");
    }
    headline8.textContent = "Mellan Loppet Tider Klass: Mix";
    divMellanMix.appendChild(headline8);

    let filterMellanMix = rankedTimesMellan.filter(function(team) {
      return team.klass == "Mixed";
    });
    filterMellanMix.map(function(team, i) {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${i + 1}: Team ${team.id}: ${
        team.officielltid
      } deltagare ${team.deltagare1} och ${team.deltagare2}`;
      divMellanMix.appendChild(paragraph);
    });
    divMellan.appendChild(divMellanMix);

    //APPEND

    div.appendChild(divStora);
    div.appendChild(divMellan);
    resultatDiv.appendChild(div);
    raceSelect.value = "langa";
  })();
});

raceSelect.addEventListener("change", e => {
  raceSelect = document.querySelector(".raceSelect");
  if (raceSelect.value == "langa") {
    lopp = "langa";
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
  raceClock1.insertAdjacentElement("afterend", div);
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
  raceClock2.insertAdjacentElement("afterend", div);
  data.starttid = raceStartTime2;
  let parent = raceClock2.parentElement;
  parent.removeChild(raceClock2);
  patchFetchData(`/starttid/${lopp}/2 `, data);
  startWatch2();
});
raceClock4.addEventListener("click", () => {
  raceStartTime4 = new Date();
  let data = {};
  let div = document.createElement("div");
  div.classList.add("clock4");
  raceClock4.insertAdjacentElement("afterend", div);
  data.starttid = raceStartTime4;
  let parent = raceClock4.parentElement;
  parent.removeChild(raceClock4);
  patchFetchData(`/starttid/${lopp}/3 `, data);
  startWatch4();
});
raceClock3.addEventListener("click", () => {
  raceStartTime3 = new Date();
  let data = {};
  let div = document.createElement("div");
  div.classList.add("clock3");
  raceClock3.insertAdjacentElement("afterend", div);
  data.starttid = raceStartTime3;
  let parent = raceClock3.parentElement;
  parent.removeChild(raceClock3);
  patchFetchData(`/starttid/mellan/ingen`, data);
  startWatch3();
});



buttonWrapper.addEventListener("click", e => {
  if (e.target.className == "teamButton") {
    (async function() {
      e.target.classList.add("pressed");
      const goalTime = new Date();
      const team = e.target.textContent;
      let startgrupp;
      //data = {};
      //data.maltid = goalTime;
      //await patchFetchData("/deltagarelopp/" + lopp + "/" + team, data); //patch måltid
      await (async function() {
        let teamData = await getFetchData("/deltagare/" + lopp + "/" + team); //get startgrupp
        if (lopp == "langa") {
          startgrupp = teamData.startgrupp;
        } else {
          startgrupp = "ingen";
        }
        await (async function() {
          let dataStart = await getFetchData(
            "/starttid/" + lopp + "/" + startgrupp
          ); //get starttid

          let resVar;
          if (lopp == "langa") {
            resVar = ".resLanga";
          } else {
            resVar = ".resMellan";
          }
          let resultatLista = document.querySelector(resVar);
          let result = Date.parse(goalTime) - Date.parse(dataStart);
          result = secToHHMMSS(msecToSec(result));
          let data = {};
          data.maltid = goalTime;
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
  } else if (e.target.className == "teamButton pressed") {
    let confirmed = confirm(
      "Är du säker, detta kommer radera tid från team " + e.target.textContent
    );
    if (confirmed == true) {
      const team = e.target.textContent;
      let data = {};
      data.maltid = "";
      data.officielltid = "";
      data.finished = false;
      data.delete = true;
      (async function() {
        await patchFetchData("/deltagarelopp/" + lopp + "/" + team, data);
        (async function() {
          let rankedTimes = await getFetchData(`/rankadetider/${lopp}`);

          let resVar;
          if (lopp == "langa") {
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
    (async function() {
      e.target.classList.add("pressed");
      const goalTime = new Date();
      const team = e.target.textContent;
      let startgrupp;
      //data = {};
      //data.maltid = goalTime;
      //await patchFetchData("/deltagarelopp/" + lopp + "/" + team, data); //patch måltid
      await (async function() {
        let teamData = await getFetchData("/deltagare/" + lopp + "/" + team); //get startgrupp
        if (lopp == "langa") {
          startgrupp = teamData.startgrupp;
        } else {
          startgrupp = "ingen";
        }
        await (async function() {
          let dataStart = await getFetchData(
            "/starttid/" + lopp + "/" + startgrupp
          ); //get starttid

          let resVar;
          if (lopp == "langa") {
            resVar = ".resLanga";
          } else {
            resVar = ".resMellan";
          }
          let resultatLista = document.querySelector(resVar);
          let result = Date.parse(goalTime) - Date.parse(dataStart);
          result = secToHHMMSS(msecToSec(result));
          let data = {};
          data.maltid = goalTime;
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
  } else if (e.target.className == "teamButton pressed") {
    let confirmed = confirm(
      "Är du säker, detta kommer radera tid från team " + e.target.textContent
    );
    if (confirmed == true) {
      const team = e.target.textContent;
      let data = {};
      data.maltid = "";
      data.officielltid = "";
      data.finished = false;
      data.delete = true;
      (async function() {
        await patchFetchData("/deltagarelopp/" + lopp + "/" + team, data);
        (async function() {
          let rankedTimes = await getFetchData(`/rankadetider/${lopp}`);

          let resVar;
          if (lopp == "langa") {
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
  let time = secToHHMMSS(
    (Date.parse(new Date()) - Date.parse(raceStartTime1)) / 1000
  );
  document.querySelector(".clock1").innerHTML = time;
}

function startWatch1() {
  runClock1 = setInterval(displayTime1, 1000);
}

function stopWatch1() {
  clearInterval(runClock1);
}
function displayTime2() {
  let time = secToHHMMSS(
    (Date.parse(new Date()) - Date.parse(raceStartTime2)) / 1000
  );
  document.querySelector(".clock2").innerHTML = time;
}

function startWatch2() {
  runClock2 = setInterval(displayTime2, 1000);
}

function stopWatch2() {
  clearInterval(runClock2);
}
function displayTime3() {
  let time = secToHHMMSS(
    (Date.parse(new Date()) - Date.parse(raceStartTime3)) / 1000
  );
  document.querySelector(".clock3").innerHTML = time;
}

function startWatch3() {
  runClock3 = setInterval(displayTime3, 1000);
}

function stopWatch3() {
  clearInterval(runClock3);
}
function displayTime4() {
  let time = secToHHMMSS(
    (Date.parse(new Date()) - Date.parse(raceStartTime4)) / 1000
  );
  document.querySelector(".clock4").innerHTML = time;
}

function startWatch4() {
  runClock4 = setInterval(displayTime4, 1000);
}

function stopWatch4() {
  clearInterval(runClock4);
}

function msecToSec(msec) {
  return msec / 1000;
}

function hideRes() {
  document.querySelector(".storaResultatTotal").classList.add("hidden");
  document.querySelector(".storaResultatHerr").classList.add("hidden");
  document.querySelector(".storaResultatDam").classList.add("hidden");
  document.querySelector(".storaResultatMix").classList.add("hidden");
  document.querySelector(".mellanResultatTotal").classList.add("hidden");
  document.querySelector(".mellanResultatHerr").classList.add("hidden");
  document.querySelector(".mellanResultatDam").classList.add("hidden");
  document.querySelector(".mellanResultatMix").classList.add("hidden");
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
