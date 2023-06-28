import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddTodo = ({AddNewTodo}) => {
    const [newTodo, setNewTodo] = useState();
    const handleAddNewTodo = () =>{
        if(!newTodo){
            toast.error("Wow so easy!");
            return;
        }
        AddNewTodo({id : Math.floor(Math.random()*1000), title : newTodo})
        setNewTodo('');
    }
    const handleOnChangeText = (envent) => {
        setNewTodo(envent.target.value);
    }
    return (       
            <div className='add-todo'>
            <input value={newTodo} type='text'onChange={(envent) => handleOnChangeText(envent)}/>
            <button type='button' onClick={()=>handleAddNewTodo()}>Add</button>
            </div>      
    );
};

export default AddTodo;