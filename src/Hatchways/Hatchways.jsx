
import axios from 'axios';
import React, { useState, useEffect } from 'react' ;
import './hatch.css';

function Hatchways() {

const [data,setData]=useState([]);
useEffect(()=>{
axios.get("https://api.hatchways.io/assessment/students")
.then(function(response){
    console.log(response.data.students);
    setData(response.data.students);
})
.catch(function(error){
   console.log(error);
})},[])
return(
    <div>
    {data.map(i=>{
        return(
           <div className='grid-main'>
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
             </div>
        )
    })}
        
           </div>
)

}
export default Hatchways;

