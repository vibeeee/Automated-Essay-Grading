import '../App.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
            <div className='text-center container'>
                    <div className='intro'>
                    The issue spotting quizzes and exams are perhaps one of the most beneficial daily or topic review exercises that any law student can perform. The pro essay quizzes and exams are created by law professors from real law school exams and are timed for the real exam experience. After each topic learned, do an issue spotting essay exam for practice. Then review your scores and compare with the professor's model answer.
                    </div>
                    <hr></hr>
                    <h4>Property</h4>

                    <h5 className='subtopic '>Personal Property</h5>
                    <div className='question-container'>
                      <a href='/start/0'  className='btn start-btn'>Lost and Mislaid Property <br></br>
                      <span className='details'> 1 Question ∙ 20 Minutes </span>
                      </a>
                    </div>
                    
                    <h5 className='subtopic '>Non Possessory Rights in Real Property</h5>
                    <div className='question-container'>
                      <a href='/start/1'  className='btn start-btn'>Covenants and Equitable Servitudes<br></br>
                       <span className='details'> 1 Question ∙ 20 Minutes </span>
                      </a>
                      <a href='/start/2'  className='btn start-btn'>Easements: Scope, Duration and Transfer<br></br>
                      <span className='details'> 1 Question ∙ 20 Minutes </span>
                      </a>
                      <a href='/start/3'  className='btn start-btn'>Intro to Non Posessory and Easement Creation<br></br>
                      <span className='details'> 1 Question ∙ 20 Minutes </span>
                      </a>
                    </div>
                    <h4>Contracts</h4>
                    <h5 className='subtopic '>Damages</h5>

                    <div className='question-container'>
                      <a href='/start/4'  className='btn start-btn'>Intro to Damages and Expectation Damages<br></br>
                      <span className='details'> 1 Question ∙ 20 Minutes </span>
                      
                      </a>
                    </div>
            
            </div>
        
    </div>
  );
}

export default Home;
