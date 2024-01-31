import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConfirmationModal } from "./Modal";
import "./Note.css";

function Note({ onSaveSuccess }) {
const { id } = useParams();
const [note, setNote] = useState(null);
const [showConfirmation, setShowConfirmation] = useState(false);

async function fetchNote(){
  const response = await fetch(`/notes/${id}`); // Alt + 96 pour `
  const data = await response.json();
  setNote(data);
}

async function saveNote(){
  const response = await fetch(`/notes/${id}`, {
    method: "PUT", 
    body: JSON.stringify(note),
    headers: {"Content-Type":"application/json" },
  });
  if(response.ok){
    if(onSaveSuccess){
  onSaveSuccess();
  setShowConfirmation(true);
    }
  }else{
    console.log("Erreur lors de la mise a jour des notes")
  }
}

useEffect(() =>{
fetchNote();
},[id]);

if(!note){
  return "Chargement..."
}


  return (
    <form className="Form" 
    onSubmit={(event) => {event.preventDefault();  saveNote();}}>
      <input 
      className="Note-editable Note-title" 
      type="text" 
      value={note.title}
      onChange={(event) => {
        setNote({...note, title: event.target.value});
      }}
      />
      <textarea 
      className="Note-editable Note-content"
      value={note.content}
      onChange={(event) => {
        setNote({...note,content: event.target.value});
      }}
      />
      <div className="Note-actions">
        <button className="Button">Enregistrer</button>
      </div> 
      <ConfirmationModal 
      isOpen={showConfirmation}
      onClose={() => setShowConfirmation(false)}
      message="Modifications sauvegardées"
      /> 
    </form>
  );
}

export default Note;
