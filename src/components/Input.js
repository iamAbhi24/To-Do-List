import React from 'react'
import '../styles/Input.css';
import logo from '../img/icon.png';
// input component consist of text input(txtInput), add button(add-btn) and heading(h1) 
export default function Input({inputText,handleInput,handleOnchange}) {
//  function handleOnchange(e){
//   inputText=e.target.value;
//  }
  return (
    <div className='Input'>
      <div className="heading">
      <h2>To-Do List</h2>
      <img src={logo} alt="img"/>
      </div>
      <div className="txtInput">
        <input className='input' type="text" required placeholder='Add your task...'  value={inputText} onChange={handleOnchange} /> 
        <button className='add-btn' onClick={handleInput} >Add</button>
      </div>
    </div>
  )
}
