import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";

// CYCLE DE VIE du composant App :
// 1. rendu initial (avec les valeurs d'état initiales)
// 2. exécution de l'action du `useEffect` : mise à jour de l'état
// 4. ce qui fait automatiquement un nouveau rendu

function App() {
  // déclarer l'état pour stocker les notes
  const [notes, setNotes] = useState(null);

  async function fetchNotes() {
    const response = await fetch("/notes");
    const data = await response.json();
    setNotes(data);
  }

  useEffect(function () {
    fetchNotes();
  }, []);

  return (
    <BrowserRouter>
      <aside className="Side">
        {notes !== null ? (
          <ol className="Notes-list">
            {notes.map((note) => (
              <li>
                <Link className="Note-link" to={`/notes/${note.id}`}>
                  {note.title}
                </Link>
              </li>
            ))}
          </ol>
        ) : null}
      </aside>
      <main className="Main"></main>
    </BrowserRouter>
  );
}

export default App;
