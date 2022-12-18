import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
   title: string
   updateTask: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanType) => {
   const [edit, setEdit] = useState(true)
   let [newTitle, setNewTitle] = useState("")
   console.log(newTitle)

   const onEditTaskHandler = () => {
      setEdit(!edit)
      props.updateTask(newTitle)
   }

   const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(event.currentTarget.value)
   }

   return (
      edit
         ? <span onDoubleClick={onEditTaskHandler}>{props.title}</span>
         : <input onChange={onChangeHandler} onBlur={onEditTaskHandler} autoFocus value={newTitle}/>
   );
};

export default EditableSpan;