import React, {useState} from "react";


export const TodoItem = ({el,removeTodo, toggleCompleted, toggleImportant}) => {
    const [click, setClick] = useState(false)
    let rootClass = ['row', 'flex', 'todos-item']
    if (el.completed) {
        rootClass.push('completed')
    }
    if (el.important) {
        rootClass.push('important')
    }
    return (
        <div className={rootClass.join(' ')} key={el._id}>
            <div onClick={() => setClick(prev => !prev)} className="col todos-text">{el.text}</div>
            <div className={`col todos-btns ${click ? 'visibility' : 'hidden'}`}>
                <i onClick={() => toggleCompleted(el._id)}
                   className="material-icons blue-text">check</i>
                <i onClick={() => toggleImportant(el._id)}
                   className="material-icons orange-text">warning</i>
                <i onClick={() => removeTodo(el._id)} className="material-icons red-text">delete</i>
            </div>
        </div>)
}
