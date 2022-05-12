import {useEffect, useState} from "react"
import { Route, Router, useNavigate } from "react-router-dom";
import '../App.css';
import Results from './Results'
import { useParams } from 'react-router-dom'

var minutesElapsed, secondsElapsed;

function Quiz({data}) {

  const {id} = useParams()
  const questions = ["Sandy saw a signed “Moon” poster for sale on craigslist and realized that it was hers and that she had mistakenly left it in the desk drawer she had sold years before. Sandy believes she has a claim to the poster. \nWhat are her rights?",
                      "Daniel and Mike owned adjacent residences, each on its own lot, in Mowtown. Both lots bordered side and back on other lots, and on the front, to the north, by Jazz Road. Both men had recently retired. Daniel rented his house to a young family and moved away to live with his son in Citytown. Mike continued to live in his home. After about six months, Mike decided to convert his garage to a den. He built a carport at the rear of his house and laid an asphalt driveway down the side of the house to the carport. The driveway encroached five feet onto Daniel’s lot all along its length. The renters didn’t appear to notice anything, and Daniel never visited his old home. Seven years later, Daniel was in Mowtown for a company reunion and drove by his old house. He noticed the asphalt driveway and was sure it encroached on his property. A survey documented the encroachment, and Daniel brought an appropriate action to cause Mike to remove the encroaching portion of the driveway. \nIn a jurisdiction whose statutory period for adverse possession is five years, what will be the result of the action brought by Daniel?",
                      "Manuel and Paulo owned adjacent ranches in Scorpion Desert. Manuel Ranch was to the north of Paulo Ranch, and deeper into the canyon; the only public road in the area ran along the southern border of Paulo Ranch. For years, Manuel and Paulo had had an understanding that Manuel could use a ten-foot wide dirt road running along the western edge of Paulo’s ranch for ingress and egress to Manuel Ranch from the public road. In 1965, Jose bought both ranches but continued to operate them as separate entities; the foreman and hands of Manuel Ranch continued to use the dirt road across Paulo Ranch to get from Manuel Ranch to the public road. In 1975, Jose sold Manuel Ranch to Alejandro; included in the deed was the following: “Alejandro, his heirs and assigns, shall have the use of the dirt road running along the western border of Paulo Ranch for ingress and egress to Manuel Ranch.”\nAssume for the purposes of this question only that Jose did not sell Paulo Ranch to Pedro. Instead, in 1987 Jose sold Paulo Ranch to Raul, who continued to operate it as a ranch. In 1989, Pedro purchased Manuel Ranch from Alejandro, and obtained government approval for the same type of planned residential community as described in the previous question. In order to accommodate the expected vehicular traffic in and out of the subdivision, Pedro asked permission from Raul to pave a 30 foot-wide asphalt road along the same area where the dirt road runs. Raul denied Pedro permission, and Pedro instituted an appropriate action to obtain judicial approval for the road improvement. If Raul succeeds in resisting Pedro’s action, it will be because:",
                      "Several like-minded persons, including Seth, purchased land surrounding Lake Waban. The former owner of all the parcels wished to preserve Lake Waban in its natural setting for camping and fishing, and so inserted into the deeds, by which each purchaser took title, language sufficient to create an equitable restriction prohibiting the construction of any permanent structure thereon or the use for any purpose other than camping, fishing or related recreation. Pat took possession of the parcel owned by Seth, established various hiking trails thereon, hand-graded a campsite, and occupied and used the property in a manner and for a period sufficient to acquire title to it by adverse possession.\nAssume for purposes of this question only that Seth made no attempt to convey the property to anyone. Instead, Pat executed a written contract of sale and a warranty deed conveying his interest in the parcel to Frank. Frank subsequently commenced construction of a lodge and boat launching facility on the parcel. Gary, owner of an adjacent parcel who had purchased from the original owner and had utilized his parcel for camping and fishing for 20 years, brought an appropriate action to enjoin Frank’s construction.\nWhat is the likely outcome of Gary’s action?",
                      "Silver Lake Aquatic Merchandise (SLAM), a retailer of personal Waveski and speedboats, agreed to sell to Bilge a Waveski 2000 model personal Waveski for $10,000. The written contract specified delivery within 30 days and a down payment of $2,000, but did not contain a liquidated damages clause. Two weeks after making the down payment, Bilge told SLAM that he lost his job and could not afford to go through with the purchase, and asked for his down payment back.\nSLAM, which could get as many of the Waveski models as it required from the manufacturer for a wholesale price of $7,000, put the Waveski that was going to be delivered to Bilge back in its inventory. SLAM then sold it to Thompson for $9,500.\nBilge sues SLAM to get back his deposit, and SLAM counterclaims for damages. How would you calculate the damages? "
  ]

  const navigate = useNavigate();
  let question = questions[id]
  
  
  // count down start from 20 minutes
let min = 20;
var countDownDate =new Date().getTime() + min*60*1000 ;


var minutes, seconds;
// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime() ;
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Time over";
        
    }
}, 1000);

  minutesElapsed = 20 - minutes;
  secondsElapsed = 59 - seconds;
  

  return (
    
    <div className="Quiz">
      <div className='container'>
        <h4 className="d-inline" >Question One&nbsp;&nbsp;</h4> 
        <div className="timer-container">
        <span id="timer"></span>
      </div>
      
      <hr/>
      <h6 id ="question" className="question">{question}</h6>
        <form method = 'post'  >
          <label className='text-input-box' >
            <textarea name = 'std_answer' className='form-control text-input'  onChange={(e)=> data = e.target.value}/>
          </label>
          <div className="d-inline" id = "countdown"></div>
          <input className = 'submit-btn cyan-btn btn btn-info' type="submit" value="Scan My Answer"/>

        
        </form>
        
      </div>
    </div>
  );
  
}

export {minutesElapsed, secondsElapsed}
export default Quiz;
