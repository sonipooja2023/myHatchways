import logo from './logo.svg';
import './App.css';
import ShowPic from './ShowPic/ShowPic.jsx'


function Slider(props) {
   const {picList}=props;
//const result=picList.map(i=>{
    //    return (
    //     <ShowPic 
    //     url={picList}
        // height="500px"
        // width="100%"
        // theme="light"
    //     />
    // )
//});

   return(
   <div className="App">       
        <ShowPic 
        url={picList}  
        />  
  </div>
  );
}

export default Slider;


