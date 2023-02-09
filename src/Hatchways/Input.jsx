import React from 'react';
import './input.css';
import {useState} from 'react';
function Input({searchStr,setSearchStr}){

return (
    <div>
        <input id="search-input" value={searchStr} type="text" onChange={((e)=>setSearchStr(e.target.value))} placeholder="search" />
    </div>
)

}
export default Input;