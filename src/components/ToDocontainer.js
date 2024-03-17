import React, { useEffect, useState } from 'react';
import Input from './Input.js';
import '../styles/ToDocontainer.css';
import Item from './Item.js';
import { v4 as uuidv4 } from 'uuid';

export default function ToDocontainer() {
  const getLocalItems=()=>{
    let task=localStorage.getItem('tasks');
    if(task){
      return JSON.parse(task);
    }
    else
    return [];
  }

  const [inputText,setInputText]=useState("");
  const [items,setItems]=useState(getLocalItems());
  

  useEffect(()=>{
    // localStorage.clear();
    localStorage.setItem("tasks",JSON.stringify(items));
  },[items]);

 function handleOnchange(e){
     setInputText(e.target.value);
 }

 
  function handleInput(){
    if(inputText.trim()===""){
      alert("Enter your task");
      return;
    }
    setItems(preItems=>[
      ...preItems,{
        id:uuidv4(),
        text:inputText,
      }
    ])
     setInputText("")
    }

    function updateItem(updateditems){
      setItems(updateditems);
    }
  
   function handleEdit(editItem){
    setItems(
      items.map((elem)=>{
        if(elem.id===editItem.id)
        return editItem;
      else
      return elem;
      })
    )
   }

   function onDelete(id) {
    const updateditems=items.filter((elem)=>{
         return  elem.id!==id;
    })
    updateItem(updateditems);
  }

  return (
    <div className="ToDo_App">
    <Input inputText={inputText} handleInput={handleInput} handleOnchange={handleOnchange}/>
    <Item items={items}  handleEdit={handleEdit} onDelete={onDelete} />
    </div>
  )
}

