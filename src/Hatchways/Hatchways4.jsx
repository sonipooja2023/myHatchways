
import axios from 'axios';
import React, { useState, useEffect } from 'react' ;
import './hatch.css';
import Input from './Input';
import Grades from './Grades';

//--------Approach 4-- using isExpanded approach---


function Hatchways4() {

const [data,setData]=useState([]);
const [searchStr,setSearchStr]=useState("");
//const [cardClickedId, setCardClicked] = useState("");
//const [isExpanded,setIsExpanded]=useState(false);

useEffect(()=>{
axios.get("https://api.hatchways.io/assessment/students")
.then(function(response){
   // console.log(response.data.students);
    response.data.students.map(i=>i.isExpanded=false);
    console.log(response.data.students);
    setData(response.data.students);
})
.catch(function(error){
   console.log(error);
})},[])


function toggleShowGrade(clickId){
    let copyData=[...data];
    let idx=copyData.findIndex(i=>i.id===clickId);
    copyData[idx].isExpanded=!copyData[idx].isExpanded;
    setData(copyData);
   // setIsExpanded(isExpanded=>!isExpanded);
     
}
function isButtonExpanded(clickId)
{
  return "-";
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
    .map((i,idx)=>{
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
                   <li key={i.id}>Average: {(i.grades.reduce((avg,num)=>parseInt(avg)+parseInt(num),0))/i.grades.length}{"%"}</li>
                  </ul>
                  
                 </div>
                <div className='expand-btn'>
                    <button id="toggle-icon" onClick={()=>toggleShowGrade(i.id)}>{i.isExpanded ? isButtonExpanded(i.id) : "+"}</button>        
               </div>
               </div>
              
               <div className='show-grades'>  
                 {i.isExpanded
                  ? <Grades 
                      newGrades={i.grades} 
                    /> 
                  :  null}
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
export default Hatchways4;

