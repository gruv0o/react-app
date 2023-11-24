import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Note.css";

function Note() {
const { id } = useParams();
const [note, setNote] = useState(null);

async function fetchNote(){
  const response = await fetch('/notes/'+id);
  const data = await response.json();
  setNote(data);
}



async function saveNote(){
  const response = await fetch('/notes/'+id, {
    method: "PUT",
    body: JSON.stringify(note),
    headers: {"Content-Type":"application/json" },
  });
  onSaveSuccess();
}

useEffect(() =>{

  fetchNote();

},[id]);

if(!note){
  return "Chargement..."
}


  return (
    <form className="Form" 
    onSubmit=
    {(event) => 
      {
        event.preventDefault();
        saveNote();
      }}
    >
      <input className="Note-editable Note-title" 
      type="text" 
      value={note.title}
      onChange={(event) => {
        console.log(event.target.value);
        setNote({...note, title: event.target.value});
      }}

      />
      <textarea 
      className="Note-editable Note-content"
      value={note.content}
      onChange={(event) => {
        console.log(event.target.value);
        setNote({...note,content: event.target.value});
      }}
      />
      <div className="Note-actions">
        <button className="Button">Enregistrer</button>
      </div>  
    </form>
  );
}

export default Note;
