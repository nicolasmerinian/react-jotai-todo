import React, { useState } from 'react';
import { atom, useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import Todo from './Todo';
import './Todolist.css';

const initialValues = atom([
    { id: nanoid(), title: 'Programming and learning!', completed: true, selected: false },
    { id: nanoid(), title: 'Clean my room', completed: false, selected: false },
]);

const Todolist = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useAtom(initialValues);

    function handleChange(e) {
        setNewTodo(e.target.value);
    }

    function handleCompleted(id) {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }

            return todo;
        });
        setTodos(newTodos);
    }

    function handleDelete(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    function handleRemoveSelected() {
        setTodos(todos.filter((todo) => !todo.selected));
    }

    function handleSelectAll() {
        const nbUnselected = todos.filter((todo) => !todo.selected).length;
        const selected = nbUnselected > 0 ? true: false;
        const newTodos = todos.map((todo) => {
            todo.selected = selected;
            return todo;
        });
        setTodos(newTodos);
    }

    function handleSelected(id) {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.selected = !todo.selected;
            }

            return todo;
        });
        setTodos(newTodos);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const todo = { id: nanoid(), title: newTodo, completed: false };
        setTodos([...todos, todo]);
        setNewTodo('');
    }

    return (
        <div className='Todolist'>
            <form onSubmit={ handleSubmit }>
                <input type='text' value={ newTodo } onChange={ handleChange } />
                <button type='submit' disabled={ newTodo.trim() === '' }>Add</button>
            </form>
            <div className='todo-filters'>
                <button disabled={ todos.length === 0 } onClick={ handleSelectAll }>Toggle select all</button>
                <button 
                    disabled={ todos.filter(todo => todo.selected).length === 0 } 
                    onClick={ handleRemoveSelected }>
                        Clear all selected
                </button>
            </div>
            <ul>
                { todos.map((todo) => (
                    <Todo
                        key={ todo.id }
                        todo={ todo }
                        handleCompleted={ handleCompleted }
                        handleDelete={ handleDelete }
                        handleSelected={ handleSelected } />
                )) }
            </ul>
        </div>
    )
}

export default Todolist;