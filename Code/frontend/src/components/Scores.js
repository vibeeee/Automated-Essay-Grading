import '../App.css';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";


var results = require('../output.json')



  function score(scoreName, score){

    return(
        <div className="single-chart">
        <svg viewBox="0 0 36 36" class="circular-chart">
          <path className="circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path className="circle"
            stroke-dasharray={score+", 100"}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              style={{ stroke: score > 80 ? "#4CC790" : score > 60 ? "#ff9f00" : score <60  ? "#ed4141" : "" }}
          />
          <text x="18" y="20.35" className="percentage">{score}%</text>
        </svg>
        <div className="d-block text-center">{scoreName}</div>
      </div>
    );


  }

export default function Scores() {
    
    const simInfo = props => (
        <Tooltip className='half-black'{...props}>Comparitive analysis of relationship of words between teacher and student answer.</Tooltip>
      );

    const cohInfo = props => (
        <Tooltip className='half-black'{...props}>Meaning, logic and connection of each phrase and sentence in answer.</Tooltip>
    );

    const structInfo = props => (
        <Tooltip className='half-black' {...props}>Include all required components. </Tooltip>
    );
   
    const gramInfo = props => (
        <Tooltip className='half-black' {...props}>Structure, syntax and semantics.</Tooltip>
    )

    let simScore = 85;
    let cohScore = 47;
    let structScore = 65;
    let gramScore = results.grammarScore;
    let numberOfWords = 150
    let totalWordsRequirement = 200
  return (

    <div className="Scores">
        <div className = 'flex-wrapper'>
          <OverlayTrigger placement="top" overlay={simInfo}>
            {score("Similarity", simScore)}
          </OverlayTrigger>
          
          <OverlayTrigger  placement="top" overlay={cohInfo}>
            {score("Coherence", cohScore)}
          </OverlayTrigger>
          <OverlayTrigger  placement="top" overlay={structInfo}>
            {score("Structure", structScore)}
          </OverlayTrigger>
          <OverlayTrigger  placement="top" overlay={gramInfo}>
            {score("Grammar", gramScore)}
          </OverlayTrigger>
    
        </div>
        



    </div>
  );
}


