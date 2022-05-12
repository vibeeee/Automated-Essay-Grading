import '../App.css';
import { useParams } from 'react-router-dom'

function Start() {

  const {id} = useParams()
  const subtopic =["Lost and Mislaid Property",
            "Covenants and Equitable Servitudes",
            "Easements: Scope, Duration and Transfer",
            "Intro to Non Posessory and Easement Creation",
            "Intro to Damages and Expectation Damages"]

  const this_subtopic = subtopic[id]

  const quiz_url = "/quiz/" + id
  return (
    <div className="Start">
            <div className='text-center container'>
                    <h3>{this_subtopic}</h3>
                    <a href={quiz_url} id = 'start-btn' className='cyan-btn btn btn-info'>Start Quiz</a>
                
            </div>
        
    </div>
  );
}

export default Start;
