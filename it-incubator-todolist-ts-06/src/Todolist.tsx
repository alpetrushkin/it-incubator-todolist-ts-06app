import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import Input from "./component/Input";
import EditableSpan from "./component/EditableSpan";

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   id: string
   title: string
   tasks: Array<TaskType>
   removeTask: (taskId: string, todolistId: string) => void
   changeFilter: (value: FilterValuesType, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
   removeTodolist: (id: string) => void
   filter: FilterValuesType
   updateTask: (todoListID: string, taskID: string, newTitle: string) => void
   updateTodoList: (todoListID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

   const removeTodolist = () => props.removeTodolist(props.id)

   const onAllClickHandler = () => props.changeFilter("all", props.id);
   const onActiveClickHandler = () => props.changeFilter("active", props.id);
   const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

   const addNewTaskHandler = (newTitle: string) => {
      props.addTask(newTitle, props.id)
   }

   const updateTaskHandler = (newTitle: string) => {
     props.updateTodoList(props.id, newTitle)
   }

   return <div>
      <h3>
         <EditableSpan title={props.title} updateTask={updateTaskHandler}/>
         <button onClick={removeTodolist}>x</button>
      </h3>
      <div>
         <Input callback={addNewTaskHandler}/>

      </div>
      <ul>
         {
            props.tasks.map(t => {
               const onClickHandler = () => props.removeTask(t.id, props.id)
               const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  let newIsDoneValue = e.currentTarget.checked;
                  props.changeTaskStatus(t.id, newIsDoneValue, props.id);
               }

               const updateTaskHandler = (newTitle: string) => {
                  props.updateTask(props.id, t.id, newTitle)
               }

               return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                  <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                  <EditableSpan title={t.title} updateTask={updateTaskHandler}/>
                  <button onClick={onClickHandler}>x</button>
               </li>
            })
         }
      </ul>
      <div>
         <button className={props.filter === 'all' ? "active-filter" : ""}
                 onClick={onAllClickHandler}>All
         </button>
         <button className={props.filter === 'active' ? "active-filter" : ""}
                 onClick={onActiveClickHandler}>Active
         </button>
         <button className={props.filter === 'completed' ? "active-filter" : ""}
                 onClick={onCompletedClickHandler}>Completed
         </button>
      </div>
   </div>
}


