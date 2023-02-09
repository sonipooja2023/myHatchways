
import axios from 'axios';
import React, { useState, useEffect } from 'react' ;
import './hatch.css';
import Input from './Input';
import Grades from './Grades';

//--------Approch 2--any data will show---No restriction---


function Hatchways2() {

const [data,setData]=useState([]);
const [searchStr,setSearchStr]=useState("");
const [cardClickedId, setCardClicked] = useState([]);


useEffect(()=>{
axios.get("https://api.hatchways.io/assessment/students")
.then(function(response){
    setData(response.data.students);
})
.catch(function(error){
   console.log(error);
})},[])

function toggleShowGrade(clickId){
    let copyIdArr=[...cardClickedId]; 
    let idArr;
    if(copyIdArr.includes(clickId))
    {    
        idArr=copyIdArr.findIndex(i=>i===clickId);
        copyIdArr.splice(idArr,1);
        console.log(copyIdArr,"remove");
        return setCardClicked(copyIdArr);
    }
    
        copyIdArr.push(clickId);
        console.log(copyIdArr,"add")
        setCardClicked(copyIdArr);
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
                   <li>Average: {(i.grades.reduce((avg,num)=>parseInt(avg)+parseInt(num),0))/i.grades.length}{"%"}</li>
                  </ul>
                  
                 </div>
                <div className='expand-btn'>
                    <button id="toggle-icon" onClick={()=>toggleShowGrade(i.id)}>{cardClickedId.includes(i.id) ? isButtonExpanded(i.id) : "+"}</button>        
               </div>
               </div>
              
               <div className='show-grades'>  
                 {cardClickedId.includes(i.id)
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
export default Hatchways2;

