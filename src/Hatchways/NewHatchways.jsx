
import axios from 'axios';
import React, { useState, useEffect } from 'react' ;
import './hatch.css';
import Input from './Input';
import Grades from './Grades';

//--------First solution done by pooja---------
function Hatchways() {

const [data,setData]=useState([]);
const [searchStr,setSearchStr]=useState("");
//const [testScore,setTestScore]=useState([]) ;
const [isExpanded,setIsExpanded]=useState(false);
const [cardClicked, setCardClicked] = useState("");


useEffect(()=>{
axios.get("https://api.hatchways.io/assessment/students")
.then(function(response){
    console.log(response.data.students);
    response.data.students.map(i=>i.isExpanded=false)
    console.log(response.data.students);
    setData(response.data.students);
})
.catch(function(error){
   console.log(error);
})},[])

function showScore(e,id){
    e.preventDefault();
    setIsExpanded(isExpanded=>!isExpanded);
    setCardClicked(id);
}

function renderData(){
return(
    <div>
        <Input 
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        />
    {data.filter((item)=>{
        let concat=`${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()}`;
        if(concat.includes(searchStr.toLowerCase()))
        {
            return true;
        }
        else 
        {
            return false;
        }
     })
    .map(i=>{
        return(
            <div className="main">
             <div className='grid-main'>
               <div className='grid-data'>
                <img className="grid-pic" src={i.pic} alt=""></img>
                 <div className="grid-items">
                  <h4 className="grid-heading">{i.firstName.toUpperCase()}{" "}{i.lastName.toUpperCase()}</h4>
                  <ul className="grid-list">
                   <li>Email: {i.email}</li>
                   <li>Comapny: {i.company}</li>
                   <li>Skill: {i.skill}</li>
                   <li>Average: {(i.grades.reduce((avg,num)=>parseInt(avg)+parseInt(num),0))/i.grades.length}{"%"}</li>
                  </ul>
                  
                 </div>
                <div className='expand-btn'>
                {isExpanded && i.id===cardClicked
                   ? <button id="minus-icon" type="submit" onClick={(e)=>showScore(e,i.id)}>-</button>
                  : <button id="plus-icon" type="submit" onClick={(e)=>showScore(e,i.id)}>+</button>
                }         
               </div>
               </div>
               <div className='show-grades'>  
            <Grades 
            isExpanded={isExpanded}
            cardClicked={cardClicked}
            newGrades={i.grades} 
            newId={i.id}
            />
             </div>
             
            </div> 
            </div> 
        )
    })}
        
 </div>
)}
return(
<div>
    {(data ? renderData(data) : null)}
</div>
) 
}
export default Hatchways;

