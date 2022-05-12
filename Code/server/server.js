const express = require("express");
const bodyParser = require('body-parser');
const path = require('path'); 
const {spawn} = require('child_process')
const fs = require('fs');
var results = require('./output.json')


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));


// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});


app.post('/quiz/:id', (req, res) => {
    id = req.params.id
    std_answer = req.body.std_answer;
    console.log("Question: "+ id)
    console.log(std_answer)
    
    // spawn new child process to call the python script
    const python = spawn('python3', ['input.py', '-i', id, '-s', std_answer]);

    // collect data from script
    python.stdout.on('data', function (data) {
      console.log('Piping data from python script ...');
    });

    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`Child process close all stdio with code ${code}`);

    fs.copyFile('./output.json', '../frontend/src/output.json', (err) => {
      if (err) throw err;
      console.log('File was copied to destination');
      console.log(results);
      res.redirect('/results');
    });
    console.log("Success");
   
    });


    
});

app.listen(3001, function(){
    console.log("Server is running on port 3001.")
});