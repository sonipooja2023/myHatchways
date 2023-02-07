
import './App.css';
import axios from 'axios';
//import CircularProgress from '@mui/material/CircularProgress';
import React,  { useState, useEffect } from 'react' ;
// { sliderClasses } from '@mui/material';
import Edit from './Edit';
import {v4 as uuid4} from 'uuid'

function TableUpdate() {
  const [data,setData] = useState([]);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [uniqueId,setUniqueId]=("");
  const [fav,setFav] = useState([]);
  const [unfavFlag,setUnfavFlag] = useState(false);
  const [favFlag,setFavFlag] = useState(0);
  const [currenDetails, setCurrentDetails] = useState({})
  const [isEditClicked, setIsEditClicked] = useState([false, {}])
  const [editedName, setEditedName] = useState('')
  const [editedEmail, setEditedEmail] = useState('')

  const unique_Id =uuid4();
  //console.log(uniqueId);

  //--------Add Data to table---------

  function handleSubmit(e){
  e.preventDefault();
  let copyData=[...data];
  const newObj={name:name,email:email,uId:unique_Id};
  copyData.push(newObj);
  console.log(copyData);
  setData(copyData);
} 
  //--------Remove Data from table---------

 function handleRemove(e,removeEmail){
  e.preventDefault();
  let copyData=[...data];
  let idx=copyData.findIndex((i=>i.email===removeEmail))
  console.log(idx);
  console.log(copyData,"before remove");
  let newArr=[...copyData.slice(0,idx),...copyData.slice(idx+1)]
  setData(newArr);
 }

function handleUpdate(e,newObj){
  e.preventDefault();
  setIsEditClicked([true, {...newObj}]);
  setCurrentDetails({name: newObj.name, email: newObj.email})
}

//------------Add updated data to table------------
function handleEditClick(e) {
    // e.preventDefault()
    let copyData = [...data]
    let index = copyData.findIndex((obj) => {
      return obj.email === isEditClicked[1].email
    })
    console.log(index, 'index')
    copyData[index].name = editedName
    copyData[index].email = editedEmail
    setData(copyData)
    setIsEditClicked([false, {}])
    setCurrentDetails({})
  }
function handleEditClick2(newName, newEmail) {
    console.log(newName, newEmail, 'handleData')
    let copyData = [...data]
    let index = copyData.findIndex((item) => {
      return item.email === isEditClicked[1].email
    })
    // console.log(index, 'index')
    copyData[index].name = newName
    copyData[index].email = newEmail
    setData(copyData)
    setIsEditClicked([false, {}])
    setCurrentDetails({})
  }

//---------Add and show favorite name above table-------
function handleFavorite(e,favEmail){
    e.preventDefault();
     let copyData=[...data];
     let idx=copyData.findIndex((i=>i.email===favEmail));
     let favName=copyData[idx].name;
     let newFav=[...fav];
     newFav.push(favName);
     setFav(newFav);
     //setFavFlag(true);
   }
//---------Remove unfavorite name from favorite list-------
   function handleUnfavorite(e,unfavEmail){
    e.preventDefault();
   // setFavFlag(false);
     let copyData=[...data];
     let newFav=[...fav];
     let idx=copyData.findIndex((i=>i.email===unfavEmail));
      let favName=copyData[idx].name;
      let favIdx=newFav.findIndex((i=>i===favName));
      //let newArr=[];
     if(favIdx>=0)
       {
       // newFav.splice(favIdx,1);  
       newFav=[...newFav.slice(0,favIdx),...newFav.slice(favIdx+1)];
      // setFavFlag(true);
       } 
        else{
          newFav=[...newFav];
        // setUnfavFlag(unfavFlag=>!unfavFlag);
       }  
       setFav(newFav);
   }


  return(
    
<div className="app">
  <form>
  
    <div style={{margin:"40px"}}>
    Register Here!!!
    </div>
    <div style={{margin:"20px"}}>
       <label>Name</label><input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter Name here"/>  
    </div>
    <div style={{margin:"20px"}}>
       <label>Email</label><input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email here"/>
    </div>
    <div style={{margin:"20px"}}>
      <button type="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>
    </div>
    
    <div style={{margin:"40px"}}>List of Favorite:
      <p>{fav +""}</p> 
    </div>
    {data.map((i,idx)=>{
      return (
      <table id="table-data">
        <tbody>
        <tr>
        <td>{idx+1}</td>
        <td>{i.name}</td>
        <td>{i.email}</td>
        <td><button type="submit" onClick={(e)=>handleRemove(e,i.email)}>Remove</button> </td>
        <td><button type="submit" onClick={(e)=>handleUpdate(e,i)}>Update</button></td>
        {/* <td><button type="submit" onClick={(e)=>handleEdit(e,i.email,i.name)}>Edit</button></td> */}
        <td><button type="submit" disabled={favFlag} onClick={(e)=>handleFavorite(e,i.email)}>Fav</button></td>
        <td><button type="submit" disabled={unfavFlag} onClick={(e)=>handleUnfavorite(e,i.email)}>Unfav</button></td>
        </tr>
        </tbody>  
       </table> 
       
     ) })}  
     {/* {showForm && newFormEdit(newEdit)}   */}
     
  </form> 
  
  {isEditClicked[0]? <Edit currentDetails={currenDetails} handleEditClick2={handleEditClick2}/>: null}
   
</div>
  )  
}
export default TableUpdate;
 
