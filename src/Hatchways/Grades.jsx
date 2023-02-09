
import React from "react";
function Grades(props){

const {newGrades}=props;


    return(
        <div>  
          <ul>
             { 
              newGrades.map((i,idx)=>{
                 return <li key={idx}>Test {idx+1}: {" "}{i}%</li>;
                                   
             })}
         </ul>    
        </div>
    )
}
export default Grades;