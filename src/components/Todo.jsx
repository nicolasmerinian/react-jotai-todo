import './Todo.css';

const Todo = ({ todo, handleCompleted, handleDelete, handleSelected }) => {
    return (
        <li className={ todo.completed ? 'Todo todo-completed' : 'Todo' }>
            <input type="checkbox" checked={ todo.selected } onChange={ () => handleSelected(todo.id) } />
            <div className='todo-title'>{ todo.title }</div>
            <div className='todo-controls'>
                <div className='todo-complete' onClick={ () => handleCompleted(todo.id) }>&#x2713;</div>
                <div className='todo-delete' onClick={ () => handleDelete(todo.id) }>&times;</div>
            </div>
        </li>
    )
}

export default Todo