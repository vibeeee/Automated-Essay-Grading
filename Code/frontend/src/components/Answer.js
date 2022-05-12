import '../App.css';
import {useEffect,useState } from "react"

var results = require('../output.json')

function label(){
  var spans = ""
  for (let i = 0; i < results.std_sentences.length; i++) {
    for(var key in results.topics){
      var value = results.topics[key];
      var found = false;
      if(value.includes(results.std_sentences[i])){
        spans+=  "<span class='"+ String(key) + "' id = '" + 'std_sent'+String(i) + "'> " +  results.std_sentences[i] + "</span>";
        found = true;
      }else{
        if(found = false){
          spans+= "<span> " + results.std_sentences[i] + "</span>"
        }else{
          continue;
        }
      }
    }
  }
  document.getElementById("std_answer").innerHTML = spans


  var prof_spans = ""
  for (let i = 0; i < results.prof_sentences.length; i++) {
    for(var key in results.prof_topics){
      var value = results.prof_topics[key];
      var found = false;
      if(value.includes(results.prof_sentences[i])){
        prof_spans+=  "<span class='"+ String(key) +  "'> " + results.prof_sentences[i] + "</span>";
        found = true;
      }else{
        if(found = false){
          prof_spans+= "<span> " + results.prof_sentences[i] + "</span>"
        }else{
          continue;
        }
      }
    }
  }
  document.getElementById("prof_answer").innerHTML = prof_spans
  

}
function addStr(str, index, stringToAdd){
  return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}
function label_grammar(){
var i = 0;
var totalLength = 0;

  for(const key in results.grammar_results){
    var length = results.std_sentences[i].length
    totalLength += length;
    var value = results.grammar_results[key]
    const opening = "<span className = 'error'>"
    if(value.startLocation > totalLength){
      
    }else{
      var span = document.querySelector('#std_sent'+String(i))
      var str = span.textContent
  
      var inner = str.slice(0, value.startLocation -totalLength-1) + "<span class = 'error'>"  + str.slice(value.startLocation - totalLength-1) + "</span>"
      span.innerHTML = inner;
      
    }
    i++


  }

  /*for (const span in descendents){
    var spanLength = span.innerText.length
    var error = "error"+String(index)
    if(results.grammar_results[error].startLocation > spanLength){
      var str = span.innerText
      str = addStr(str, results.grammar_results[error].startLocation, "<span className = 'error'>");
      str = addStr(str, results.grammar_results[error].endLocation, "</span>" )
      span.innerHTML = str;
    }else{
      continue;
    }
  }*/


}

export default function Answer(props) {


useEffect (() =>{

    label();
    label_grammar();

})
if(props.data === "Student"){
    return (
        <div id="std_answer">
                
        </div>
      );
}
else if(props.data === "Professor"){
    return (
        <div id="prof_answer">

        </div>
    );
}
  
}

