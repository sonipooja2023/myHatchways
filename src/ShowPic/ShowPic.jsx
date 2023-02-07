import './showpic.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

function ShowPic(props) {
    const {url}=props;
    //console.log(url);
    // <AiOutlineArrowLeft/>
    // <AiOutlineArrowRight />
    
    //const [sliderPic,setSliderPic]=useState(0);
    const [myName,setMyName]=useState("ABC");
    const [userInput,setUserInput]=useState(null);
    // function prevPic(){
    //    return sliderPic>0 && setSliderPic(sliderPic-1);
    //    //return sliderPic>0 && setSliderPic(lastPic=>lastPic-1);

    // }
    // function nextPic(){
    //   return sliderPic <url.length-1 && setSliderPic(sliderPic+1);
    //   //return sliderPic <url.length-1 && setSliderPic(lastPic=>lastPic+1);

    // }
    // function setMyName(){
    //   setMyName(userInput);
    // }
    function handleClick(){
      if(userInput.length<3)
      {
        return alert("Please enter 3 or more characters");
      }
      setMyName(userInput);
    }
    return (
      <div> 
        <h1>{myName}</h1>
            <input type="text" onChange={(e)=>setUserInput(e.target.value)}/>
            <button onClick={()=>handleClick()}>Click Me</button>
          </div> 
      //  {/* <div className='carousel-main'>
      //      <div className='carousel'>
      //       <div className='leftArrow'>
      //         <button className="left-btn" onClick={prevPic}>
      //          prev slide
      //         </button>
      //       </div>
      //       <div className='centerImage'>
      //         <img src={url[sliderPic]} alt=""/>
      //       </div>
      //       <div className='rightArrow'>
      //         <button className="right-btn" onClick={nextPic}>
      //            next slide
      //         </button>
      //       </div>           
      //     </div> </div> */} 
                
       
    );

}

 ShowPic.propTypes={
   url: PropTypes.array.isRequired,
   userInput: PropTypes.string,
   //sliderPic: PropTypes.number.isRequired,
  //height: PropTypes.string,
  //width: PropTypes.string,
  theme: PropTypes.string
}
 ShowPic.defaultPropTypes={
  height:"700px",
  width:"100%",
  //theme: PropTypes.string
 }
export default ShowPic;
