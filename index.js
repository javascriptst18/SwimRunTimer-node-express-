const express = require("express"); // Import express package
const app = express(); // Create our application
const cors = require("cors");
const PORT = 3000; //localhost:3000
const fs = require("fs");
let id = 2;

app.use(express.static("public")); // All static files are sent from the public folder
app.use(express.json()); // So we can handle JSON-data from the user
app.use(express.urlencoded({ extended: false })); // So we can handle form-data from the user
app.use(cors());
app.options("*", cors());

app.get("/", function(request, res, err) {
  res.sendFile("index.html");
});

app.get("/state", function(request, res, err) {
  fs.readFile("public/db.json", "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.get("/starttid/:lopp/:grupp", function(req, res, err) {
  fs.readFile("public/db.json", "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    
    let response = JSON.parse(data);
    if(req.params.lopp == "stora" && req.params.grupp == 1){
      
      res.send(JSON.stringify(response.starttid[0].starttid));
    }
    else if(req.params.lopp == "stora" && req.params.grupp == 2){
      res.send(JSON.stringify(response.starttid[1].starttid));  
    }
    else if(req.params.lopp == "mellan"){
      res.send(JSON.stringify(response.starttid[2].starttid));  
    }

    
  });
});

app.get("/deltagare", function(request, res, err) {
  fs.readFile("public/db.json", "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);

    res.send(response.deltagare);
  });
});

app.get("/deltagare/:lopp", function(req, res, err) {
  fs.readFile("public/db.json", "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);
    if(req.params.lopp == "stora"){
      res.send(response.deltagareLoppStora);
    }
    else if(req.params.lopp == "mellan"){
      res.send(response.deltagareLoppMellan);  
    }
    
  });
});

app.get("/deltagare/:lopp/:grupp", function(req, res, err) {
  fs.readFile("public/db.json", "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);
    if(req.params.lopp == "stora"){
      res.send(response.deltagareLoppStora[req.params.grupp]);
    }
    else if(req.params.lopp == "mellan"){
      res.send(response.deltagareLoppMellan[req.params.grupp]);  
    }
    

    
  });
});

app.patch("/starttid/:lopp/:grupp", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);
    
    for(let i = 0; i<3; i++){
      if (temp.starttid[i].lopp == req.params.lopp) {
        if(req.params.grupp == 1){
          if (req.body.starttid) {
            temp.starttid[0].starttid = req.body.starttid;
          }
        }
        if(req.params.grupp == 2){
          if (req.body.starttid) {
            temp.starttid[1].starttid = req.body.starttid;
          }
        }
        if(req.params.grupp== "ingen"){
          if (req.body.starttid) {
            temp.starttid[2].starttid = req.body.starttid;
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
app.patch("/starttid/:lopp/", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);
    console.log("im here1");
      if (req.params.lopp == "mellan") { 
        console.log("im here2");
          if (req.body.starttid) {
            console.log("im here3");
            temp.starttid[2].starttid = req.body.starttid;
          }
      }
    
    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      res.send("ok")
    });
  });

});

app.patch("/deltagareloppstora/:team", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);
    
    temp.deltagareLoppStora.map(function(team) {
      if (team.id == req.params.team) {
        if (req.body.maltid) {
          team.maltid = req.body.maltid;
        }
      }
    });
    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      res.send("ok");
    });
  });

});

app.patch("/deltagareloppmellan/:team", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);
    
    temp.deltagareLoppMellan.map(function(team) {
      if (team.id == req.params.team) {
        if (req.body.maltid) {
          team.maltid = req.body.maltid;
        }
      }
    });
    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      res.send("ok")
    });
  });

});

app.patch("/deltagarelopplilla/:team", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);
    
    temp.deltagareLoppLilla.map(function(team) {
      if (team.id == req.params.team) {
        if (req.body.maltid) {
          team.maltid = req.body.maltid;
        }
      }
    });
    fs.writeFile("./public/db.json", JSON.stringify(temp), function(err) {
      if (err) throw err;
      res.send("ok")
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
      console.log("Saved!");
      res.send("ok")
    });
  });
});



app.delete("/todos/:id", function(req, res, err) {
  fs.readFile("./public/db.json", "utf-8", function(err, data) {
    let temp = JSON.parse(data);
    //let replacedData = [...temp];
    let filter = temp.filter(function(todos) {
      return todos.id != req.params.id;
    });

    fs.writeFile("./public/db.json", JSON.stringify(filter), function(err) {
      if (err) throw err;
      console.log("Saved!");
      res.send("ok")
    });
  });
});


app.listen(PORT);
