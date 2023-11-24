import { useParams } from "react-router-dom";

import "./Note.css";

function Note() {
  const { id } = useParams();

  return (
    <form className="Form">
      <input className="Note-editable Note-title" type="text" />
      <textarea className="Note-editable Note-content" />
      <div className="Note-actions">
        <button className="Button">Enregistrer</button>
      </div>
    </form>
  );
}

export default Note;
