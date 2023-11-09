import { useEffect, useState } from "react";

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
    console.log(data);
  }

  useEffect(function () {
    fetchNotes();
  }, []);

  return (
    <>
      <aside className="Side">
        {notes !== null ? notes.map((note) => <div></div>) : null}
      </aside>
      <main className="Main"></main>
    </>
  );
}

export default App;
