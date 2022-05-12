import '../App.css';
import {useEffect,useState } from "react"
import { useLocation } from "react-router-dom";
import { SquareFill } from 'react-bootstrap-icons';
import {minutesElapsed, secondsElapsed} from './Quiz';
import Answer from './Answer';
import Scores from './Scores';
var results = require('../output.json')



function key(){
  var keys = []
  var index = 0;
  for(const key in results.prof_topics){
    keys[index] = key.charAt(0).toUpperCase() + key.slice(1);
    index ++;
  }
  return(
    <div className='text-center key bg-white'>
      <SquareFill color ="#fafdc7"/> {keys[0]} &nbsp; &nbsp;
      <SquareFill color ="#caf9c5"/> {keys[1]} &nbsp; &nbsp;
      <SquareFill color ="#ffd1d1"/> {keys[2]} &nbsp; &nbsp;
      <SquareFill color ="#cffffe"/> {keys[3]} &nbsp; &nbsp;
      <SquareFill color ="#efdaf3"/> {keys[4]} &nbsp; &nbsp;
    </div>
  );
}


function Results() {

  const minutes = minutesElapsed;
  const seconds = secondsElapsed;



      //Comparative Semantic Analysis, Keywords (Topics) missing, Organizational Score, Spelling / Grammar Analysis, Coherence/Tone Score, Total Words
  return(
      <div className="Results">
          <div className='container'>
              <h1 className='text-center'>Results <span id = "time" class="badge badge-secondary"/></h1> 
              <h5 className='text-center'>Your Answer</h5>
          <Answer data="Student"/>
          {key()}
          <Scores/>
          <h5 className='text-center'>Professor Answer</h5>
          <Answer data="Professor"/>
          {key()}
          </div>
        
    </div>
  )
}


export default Results