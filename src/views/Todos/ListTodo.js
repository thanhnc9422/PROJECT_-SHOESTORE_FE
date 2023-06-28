import React, { useState } from 'react';
import AddTodo from './AddTodo';
import "./ListTodo.scss";
import { toast } from 'react-toastify';
import NavigationBar from '../../components/navigationbar/NavigationBar';
import Color from '../../HOC/Color';
import img from '../../assets/images/Diagnose.Women_.Mothers_and_children_with_ADHD.Article.9569.overwhelmed_mother-1.jpg'

const ListTodo = () => {
    const [check, setCheck] = useState();
    const [editTodo, setEditTodo] = useState();
    const [todos, setTodos] = useState([
        {id: 'todo1', title: 'lam bai tap ve nha'},
        {id: 'todo2', title: 'di choi'}
    ])

    const AddNewTodo = (newTodo) => {
        setTodos([...todos,newTodo]);
        toast.success("Wow so easy!");
    }
    const handleDelete = (todoDelete) => {
        setTodos(todos.filter(todos => todoDelete.id !== todos.id));
        toast.success("Delete success!");

    }
    const handleEdit = (todoEdit) =>{
        if(todoEdit.id === check){
            setCheck('');
        }else{
            setCheck(todoEdit.id);
        }
    }
    const handleChangeTitle = (event, todoChange) =>{
        const todoCopy = todos.map(todos => {
      if(todos.id === todoChange.id){
        return {...todos, title : event.target.value}
      }
      return todos;
        })
setTodos(todoCopy);
    }
    return (
       
        <div className='app-todos'>
        
         <NavigationBar/>
            <AddTodo AddNewTodo = {AddNewTodo}/>
            <div className='show-todos'>
            {todos.map(todos => 
            <div className='show-item-todo'>
               {check === todos.id ? <input type='text' value= {todos.title} onChange={(event)=>handleChangeTitle(event, todos)}></input> : todos.title}  
                <button onClick={() => handleEdit(todos)}>Edit</button> <button onClick={() => handleDelete(todos)}>Delete</button>
            </div>
         )}
            </div>
            <div>
       
               <img src = './images/shoe1.png'/>
            </div> 
        </div>
    );
};

// export default ListTodo;
export default Color(ListTodo);