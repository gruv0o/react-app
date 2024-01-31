import { Children, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Note from "./components/Note";
import Modal from './components/Modal';
import { ConfirmationModal } from './components/Modal'
// CYCLE DE VIE du composant App :
// 1. rendu initial (avec les valeurs d'état initiales)
// 2. exécution de l'action du `useEffect` : mise à jour de l'état
// 4. ce qui fait automatiquement un nouveau rendu

function App() {
  // déclarer l'état pour stocker les notes
  const [notes, setNotes] = useState([]);
  const [creationConfirmed, setCreationConfirmed] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const onSaveSuccess = () => {
    fetchNotes();
    console.log("Les notes ont été mises à jour");
  };

  async function fetchNotes() {
    try {
    const response = await fetch("/notes?_sort=timestamp&_order=desc");
    if(!response.ok){
      throw new Error("Erreur lors du chargement des notes");
    } 

    const data = await response.json();
    setNotes(data);
    console.log(data);
    console.log(response);

  }catch (error){
    console.error('Erreur lors de la récuperation des notes:', error);
  }
}
  


  async function createNote(title, content,) {

    try{

    const noteTitle = title.trim() === '' || null ? "Sans nom" : title;
    
    const newNote = {
      title: noteTitle,
      content: content,
      timestamp: new Date().toISOString(),
    };
  
    
    const response = await fetch("/notes", {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: { "Content-type": "application/json" },
    });

    if(!response.ok){
      throw new Error('Erreur lors de la création de la note');
    }
    fetchNotes();
    setCreationConfirmed(true);
    setModalOpen(false);
    setShowConfirmation(true);

    console.log("Nouvelle Note!");
  } catch (error){
    console.error('Erreur:', error);
  }

}

const onSave = async () => {
    await createNote(newNote.title, newNote.content);
    setNewNote({ title: '', content: ''});
    fetchNotes();
  };


  useEffect(function () {
    fetchNotes();
    if(creationConfirmed){
      setTimeout(() => setCreationConfirmed(false), 3000)
    }
  }, [creationConfirmed]);


  async function deleteNote(noteID) {
    try{
      const response = await fetch(`/notes/${noteID}`, {method: 'DELETE'});
      if(!response.ok){
        throw new Error('Erreur lors de la suppresion de la note');
      }

      setNotes(notes.filter(note => Note.id !== noteID));
      fetchNotes();
      
    } catch (error){
      console.error('Erreur: ', error)
    }
  }  

  return (
    <BrowserRouter>
      <aside className="Side">
        <div>
          <input 
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div>
          <button className="Button Button-create-note" onClick={() => setModalOpen(true)}>
            Create Note
          </button>
          <Modal
              isOpen={isModalOpen}
              onClose={()=> setModalOpen(false)}
              onSave={onSave}
                >     
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value, content: newNote.content})}
                  />
          </Modal>
          <ConfirmationModal
            isOpen={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            message="Note créée avec succès !"

          />


          {notes != null ? (
            <ol className="Notes-list">
              {notes
              .filter(note => note.content.toLowerCase().includes(searchTerm.toLowerCase()))
              .slice()
              .sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((note) => (
                <li key={note.id} className="note-item">
                  <Link className="Note-link" to={`/notes/${note.id}`}>
                    {note.title}
                  <button onClick={() => deleteNote(note.id)} className="delete-button">
                    Supprimer
                  </button>
                  </Link>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </aside>
      <main className="Main">
        <Routes>
          <Route path="/" element="Sélectionner une note" />
          <Route path="/notes/:id" element={<Note onSaveSuccess={onSaveSuccess}/>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

    </BrowserRouter>
  );
}
export default App;
