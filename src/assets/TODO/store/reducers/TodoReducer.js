
import {
    TODOLIST,
    ADD_TO_COMPLETED,
    UNDO_COMPLETEDLIST,
    DELETE_TODO,
    DELETE_COMPLETED 
} from "../actions/Todo";

const intialState = { 
    todoList: [],
    completedList:[]
};

const TodoReducer = (state = intialState, action) => {

    switch (action.type){
           case TODOLIST:

                 return {...state, todoList: state.todoList.concat(action.value)};
     
            case ADD_TO_COMPLETED:

                // const completedListCopy = [...state.completedList];
                // const todosCopy = [...state.todoList];
                // const todoIdx = todosCopy.findIndex(todo => todo.id === action.todoId);
                // console.log('CompletedList',state.completedList);          
                //       return {
                //           ...state,
                //           completedList: [...state.completedList, todosCopy[todoIdx] ],
                //           todoList: state.todoList.filter(todo => todo.id !== action.todoId)
                //       }

                const todosCopy = [...state.todoList]
                const todoIdx = todosCopy.findIndex(todo => todo.id === action.todoId)
                console.log('completed',state.completedList);          
                console.log(action.todoId);          
                      return {
                          ...state,
                          completedList: [...state.completedList, todosCopy[todoIdx] ],
                          todoList: state.todoList.filter(todo => todo.id !== action.todoId)
                      }
                
            case UNDO_COMPLETEDLIST:

                const completedListsCopy = [...state.completedList];
                const completedListIdx = completedListsCopy.findIndex(completed => completed.id === action.completedId);
                //console.log('TODOList',state.todoList);          
                return {
                    ...state,
                    todoList: [...state.todoList, completedListsCopy[completedListIdx] ],
                    completedList: state.completedList.filter(completed => completed.id !== action.completedId)
                }

            case DELETE_TODO:

                return {...state, todoList: state.todoList.filter(todo => todo.id !== action.itemId)};
             
            case DELETE_COMPLETED:

                return {...state,  completedList: state.completedList.filter(completed => completed.id !== action.itemId)};

            default:
                return state;
    }
    return state;
}

export default TodoReducer;

