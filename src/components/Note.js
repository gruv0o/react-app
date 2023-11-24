import { useParams } from "react-router-dom";

function Note() {
  const { id } = useParams();

  return id;
}

export default Note;
