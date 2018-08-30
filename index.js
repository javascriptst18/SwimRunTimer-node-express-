const express = require('express'); 
const fs = require('fs');
const app = express(); 

const PORT = process.env.PORT || 3000;

app.use(express.static('public')); 
app.use(express.urlencoded({ extended: false })); 


app.get('/', function(request, res, err) {
   res.sendFile('index.html');
});

app.get('/state', function(request, res, err) {
  fs.readFile('public/db.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

//GET for starttime for a specfic team (groupnumber in req)

app.get('/starttid/:lopp/:grupp', function(req, res, err) {
  fs.readFile('public/db.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    
    let response = JSON.parse(data);

      //Check what starttime is requested and returns the corresponding time

    if(req.params.lopp == 'langa' && req.params.grupp == 1){
      
      res.send(JSON.stringify(response.starttid[0].starttid));
    }
    else if(req.params.lopp == 'langa' && req.params.grupp == 2){
      res.send(JSON.stringify(response.starttid[1].starttid));  
    }
    else if(req.params.lopp == 'langa' && req.params.grupp == 3){
      res.send(JSON.stringify(response.starttid[3].starttid));  
    }
    else if(req.params.lopp == 'mellan' && req.params.grupp == 1){
      res.send(JSON.stringify(response.starttid[2].starttid));  
    }
    else if(req.params.lopp == 'mellan' && req.params.grupp == 2){
      res.send(JSON.stringify(response.starttid[4].starttid));  
    }

    
  });
});

//GET for getting all participants

app.get('/deltagare', function(request, res, err) {
  fs.readFile('public/db.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);

    res.send(JSON.stringify(response.deltagare)); 
  });
});

//GET for ranked finish times for a specfic race

app.get('/rankadetider/:lopp', function(request, res, err) {
  fs.readFile('public/db.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);

    if(request.params.lopp == 'langa'){
      response = response.deltagareLoppStora;
    }else{
      response = response.deltagareLoppMellan;
    }
    
    let filterResponse = response.filter(function(team){ 
      return team.officielltid;
    });
    let orderFilterResponse = filterResponse.sort(function(a,b){
      
      a = a.officielltid.split(':');
      b = b.officielltid.split(':');
      a = a[0] * 60 * 60 + a[1] * 60 + a[2];
      b = b[0] * 60 * 60 + b[1] * 60 + b[2];
      return a -b;
    })
    
    res.send(JSON.stringify(orderFilterResponse));
  });
});

//GET for all participants i a specfic race

app.get('/deltagare/:lopp', function(req, res, err) {
  fs.readFile('public/db.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);
    if(req.params.lopp == 'langa'){
      res.send(JSON.stringify(response.deltagareLoppStora));
    }
    else if(req.params.lopp == 'mellan'){
      res.send(JSON.stringify(response.deltagareLoppMellan));  
    }
    
  });
});

//GET all data for a specific team

app.get('/deltagare/:lopp/:grupp', function(req, res, err) {
  fs.readFile('public/db.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    let response = JSON.parse(data);
    if(req.params.lopp == 'langa'){
     let answer = response.deltagareLoppStora.filter(function(team){
      return req.params.grupp == team.id;
      });

      res.send(JSON.stringify(answer[0]));
      
    }
    else if(req.params.lopp == 'mellan'){
      let answer = response.deltagareLoppMellan.filter(function(team){
        return req.params.grupp == team.id;
        });

        res.send(JSON.stringify(answer[0])); 
    }
  });
});

//PATCH sends a new starttime for a group, and check if that group already has started

app.patch('/starttid/:lopp/:grupp', function(req, res, err) {
  fs.readFile('./public/db.json', 'utf-8', function(err, data) {
    let temp = JSON.parse(data);
    
    
      if (req.params.lopp == 'langa') {
        
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

      }else if(req.params.lopp == 'mellan'){
        if(req.params.grupp == 1 && temp.starttid[2].started === false){
          if (req.body.starttid) {
            temp.starttid[2].starttid = req.body.starttid;
            temp.starttid[2].started = true;
          }
        }
        else if(req.params.grupp == 2 && temp.starttid[4].started === false){
          if (req.body.starttid) {
            temp.starttid[4].starttid = req.body.starttid;
            temp.starttid[4].started = true;
          }
        }
      }  
    
    fs.writeFile('./public/db.json', JSON.stringify(temp), function(err) {
      if (err) throw err;
      res.send('ok')
 
    });
  });

});

//

app.patch('/deltagarelopp/:lopp/:team', function(req, res, err) {
  fs.readFile('./public/db.json', 'utf-8', function(err, data) {
    let temp = JSON.parse(data);
    if(req.params.lopp == 'langa'){
    temp.deltagareLoppStora.map(function(team) {
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
  if(req.params.lopp == 'mellan'){
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

    fs.writeFile('./public/db.json', JSON.stringify(temp), function(err) {
      if (err) throw err;
      res.send('ok');
    });
  });

});

//DELETE resets all JSON data for E2E testing purposes

app.delete('/hardreset', function(req, res, err) {
  fs.readFile('./public/backup.json', 'utf-8', function(err, data) {
    let temp = JSON.parse(data);
    
    fs.writeFile('./public/db.json', JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send('ok')
    });
  });
});

/* 
    FIVE BELOW DELETE, reset individual race incase of false start
*/

app.delete('/reset/1', function(req, res, err) {
  fs.readFile('./public/db.json', 'utf-8', function(err, data) {
    let temp = JSON.parse(data);

    temp.starttid[0].starttid = ';
    temp.starttid[0].started = false;
    
    fs.writeFile('./public/db.json', JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send('ok')
    });
  });
});

app.delete('/reset/2', function(req, res, err) {
  fs.readFile('./public/db.json', 'utf-8', function(err, data) {
    let temp = JSON.parse(data);

    temp.starttid[1].starttid = ';
    temp.starttid[1].started = false;
    
    fs.writeFile('./public/db.json', JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send('ok')
    });
  });
});


app.delete('/reset/3', function(req, res, err) {
  fs.readFile('./public/db.json', 'utf-8', function(err, data) {
    let temp = JSON.parse(data);

    temp.starttid[3].starttid = ';
    temp.starttid[3].started = false;
    
    fs.writeFile('./public/db.json', JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send('ok')
    });
  });
});

app.delete('/reset/4', function(req, res, err) {
  fs.readFile('./public/db.json', 'utf-8', function(err, data) {
    let temp = JSON.parse(data);

    temp.starttid[2].starttid = ';
    temp.starttid[2].started = false;
    
    fs.writeFile('./public/db.json', JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send('ok')
    });
  });
});

app.delete('/reset/5', function(req, res, err) {
  fs.readFile('./public/db.json', 'utf-8', function(err, data) {
    let temp = JSON.parse(data);

    temp.starttid[4].starttid = ';
    temp.starttid[4].started = false;
    
    fs.writeFile('./public/db.json', JSON.stringify(temp), function(err) {
      if (err) throw err;
      
      res.send('ok')
    });
  });
});


app.listen(PORT);
