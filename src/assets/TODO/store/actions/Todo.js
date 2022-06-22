// unique identifiers
export const TODOLIST = 'TODOLIST'; 
export const ADD_TO_COMPLETED = 'ADD_TO_COMPLETED'; 
export const UNDO_COMPLETEDLIST = 'UNDO_COMPLETEDLIST';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_COMPLETED = 'DELETE_COMPLETED';

// export const toggleTodo = (id,value) => {
//     return { type :  TODOLIST, id:id, value:value }
// }
export const addTodo = (value) => {
    return { type :  TODOLIST,  value:value }
}

export const addCompleted = (id) => {
    return { type :  ADD_TO_COMPLETED,  todoId:id }
}

export const undoCompleted = (id) => {
    return { type :  UNDO_COMPLETEDLIST,  completedId:id }
}

export const deleteTodo = (id) => {
    return { type :  DELETE_TODO,  itemId:id }
}

export const deleteCompleted = (id) => {
    return { type :  DELETE_COMPLETED,  itemId:id }
}