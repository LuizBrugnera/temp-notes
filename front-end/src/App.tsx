import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Note from "./components/Note";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:noteId" element={<Note />} />
      </Routes>
    </Router>
  );
}

export default App;
