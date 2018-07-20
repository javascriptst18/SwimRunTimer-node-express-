const express = require("express"); // Import express package
const app = express(); // Create our application

const PORT = process.env.PORT || 3000;
const fs = require("fs");


app.use(express.static("public")); // All static files are sent from the public folder
app.use(express.json()); // So we can handle JSON-data from the user
app.use(express.urlencoded({ extended: false })); // So we can handle form-data from the user


app.get("/", function(request, res, err) {
  res.sendFile("index.html");
});

app.get("/state", function(request, res, err) {
  fs.readFile("public/db.json", "utf-8", function(err, data) {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.get("/starttid/:lopp/:grupp", function(req, res, err) {
  fs.readFile("public/db.json", "utf-8", function(err, data) {
    if (err) {
      throw err;
    }
    
    let response = JSON.parse(data);
    if(req.params.lopp == "langa" && req.params.grupp == 1){
      
      res.send(JSON.stringify(response.starttid[0].starttid));
    }
    else if(req.params.lopp == "langa" && req.params.grupp == 2){
      res.send(JSON.stringify(response.starttid[1].starttid));  
    }
    else if(req.params.lopp == "langa" && req.params.grupp == 3){
      res.send(JSON.stringify(response.starttid[3].starttid));  
    }
    else if(req.params.lopp == "mellan"){
      res.send(JSON.stringify(response.starttid[2].starttid));  
    }

    
  });
});

app.get("/deltagare", function(request, res, err) {
  fs.readFile("public/db.json", "utf-8", function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);

    res.send(JSON.stringify(response.deltagare));
  });
});


app.get("/rankadetider/:lopp", function(request, res, err) {
  fs.readFile("public/db.json", "utf-8", function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);

    if(request.params.lopp == "langa"){
      response = response.deltagareLoppStora;
    }else{
      response = response.deltagareLoppMellan;
    }
    
    let filterResponse = response.filter(function(team){ 
      return team.officielltid;
    });
    let orderFilterResponse = filterResponse.sort(function(a,b){
      
      a = a.officielltid.split(":");
      b = b.officielltid.split(":");
      a = a[0] * 60 * 60 + a[1] * 60 + a[2];
      b = b[0] * 60 * 60 + b[1] * 60 + b[2];
      return a -b;
    })
    
    res.send(JSON.stringify(orderFilterResponse));
  });
});




app.get("/deltagare/:lopp", function(req, res, err) {
  fs.readFile("public/db.json", "utf-8", function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);
    if(req.params.lopp == "langa"){
      res.send(JSON.stringify(response.deltagareLoppStora));
    }
    else if(req.params.lopp == "mellan"){
      res.send(JSON.stringify(response.deltagareLoppMellan));  
    }
    
  });
});

app.get("/deltagare/:lopp/:grupp", function(req, res, err) {
  fs.readFile("public/db.json", "utf-8", function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);
    if(req.params.lopp == "langa"){
     let answer = response.deltagareLoppStora.filter(function(team){
      return req.params.grupp == team.id;
      });

      res.send(JSON.stringify(answer[0]));
      
    }
    else if(req.params.lopp == "mellan"){
      let answer = response.deltagareLoppMellan.filter(function(team){
        return req.params.grupp == team.id;
        });

        res.send(JSON.stringify(answer[0])); 
    }
    

    
  });
});

app.patch("/starttid/:lopp/:grupp", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);
    
    for(let i = 0; i<4; i++){
      if (temp.starttid[i].lopp == req.params.lopp) {
        
        if(req.params.grupp == 1 && temp.starttid[0].started === false){
          if (req.body.starttid) {
            temp.starttid[0].starttid = req.body.starttid;
            temp.starttid[0].started = true;
          }
        }
        else if(req.params.grupp == 2 && temp.starttid[1].started === false){
          if (req.body.starttid) {
            temp.starttid[1].starttid = req.body.starttid;
            temp.starttid[1].started = true;
          }
        }
        else if(req.params.grupp == 3 && temp.starttid[3].started === false){
          if (req.body.starttid) {
            temp.starttid[3].starttid = req.body.starttid;
            temp.starttid[3].started = true;
          }
        }
        else if(req.params.grupp == "ingen" && temp.starttid[2].started === false){
          if (req.body.starttid) {
            temp.starttid[2].starttid = req.body.starttid;
            temp.starttid[2].started = true;
          }
        }
        
      }
    }
    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      res.send("ok")
 
    });
  });

});


app.patch("/deltagarelopp/:lopp/:team", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);
    if(req.params.lopp == "langa"){
    temp.deltagareLoppStora.map(function(team) {
      if (team.id == req.params.team) { // && team.finished == false
        if (req.body.finished || req.body.delete == true) {
          team.finished = req.body.finished;
        }
        if (req.body.maltid || req.body.delete == true) {
          team.maltid = req.body.maltid;
        }
        if (req.body.officielltid || req.body.delete == true) {
          team.officielltid = req.body.officielltid;
        }     
      }
    });
  }
  if(req.params.lopp == "mellan"){
    temp.deltagareLoppMellan.map(function(team) {
      if (team.id == req.params.team) {
        if (req.body.finished || req.body.delete == true) {
          team.finished = req.body.finished;
        }
        if (req.body.maltid || req.body.delete == true) {
          team.maltid = req.body.maltid;
        }
        if (req.body.officielltid || req.body.delete == true) {
          team.officielltid = req.body.officielltid;
        }   
      }
    });
  }

    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      res.send("ok");
    });
  });

});


app.post("/deltagare", function(req, res, err) {
  let newTeam = req.body;
  newTeam.id = 14;  //FIXAS
  id++;
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);
    //let replacedData = [...temp];
    temp.deltagare.push(newTeam);

    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send("ok")
    });
  });
});



app.delete("/hardreset", function(req, res, err) {
  fs.readFile("./public/backup.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);
    
    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send("ok")
    });
  });
});

app.delete("/reset/1", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);

    temp.starttid[0].starttid = "";
    temp.starttid[0].started = false;
    
    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send("ok")
    });
  });
});

app.delete("/reset/2", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);

    temp.starttid[1].starttid = "";
    temp.starttid[1].started = false;
    
    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send("ok")
    });
  });
});


app.delete("/reset/3", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);

    temp.starttid[3].starttid = "";
    temp.starttid[3].started = false;
    
    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send("ok")
    });
  });
});

app.delete("/reset/4", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);

    temp.starttid[2].starttid = "";
    temp.starttid[2].started = false;
    
    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send("ok")
    });
  });
});


app.listen(PORT);
