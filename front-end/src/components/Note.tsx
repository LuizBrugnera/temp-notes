import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { NoteService } from "./Services";
import loadingGif from "../assets/loading-gif.gif";
import { debounce } from "lodash";

interface Note {
  id: string;
  text: string;
}

const Note = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState<Note>({ id: "", text: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [bufferedText, setBufferedText] = useState("");
  const fetchInterval = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noteArea = useRef<HTMLTextAreaElement>(null);

  const fetchNote = useCallback(async () => {
    let fetchedNote = await NoteService.getNote(noteId!);
    if (!fetchedNote.id) {
      fetchedNote = await NoteService.createNote({
        id: noteId!,
        text: "Escreva aqui!",
      });
    }

    setNote(fetchedNote);
    setBufferedText(fetchedNote.text);
  }, [noteId]);

  const updateNote = useCallback(async () => {
    if (note.id && bufferedText !== note.text) {
      await NoteService.updateNote(note.id, { ...note, text: bufferedText });
      setNote((prevNote) => ({ ...prevNote, text: bufferedText }));
    }
  }, [note, bufferedText]);

  const debouncedUpdate = useCallback(debounce(updateNote, 1000), [updateNote]);

  const startFetchInterval = useCallback(() => {
    if (fetchInterval.current) {
      clearInterval(fetchInterval.current);
    }
    fetchInterval.current = setInterval(fetchNote, 5000);
  }, [fetchNote]);

  useEffect(() => {
    fetchNote();
    startFetchInterval();
    return () => {
      if (fetchInterval.current) {
        clearInterval(fetchInterval.current);
      }
    };
  }, [fetchNote, startFetchInterval]);

  useEffect(() => {
    console.log(note.id);
    if (note.id) {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
  }, [note]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBufferedText(event.target.value);
  };

  const handleTextKeyUp = () => {
    setBufferedText(noteArea.current!.value);
    debouncedUpdate();
    startFetchInterval();
  };

  return (
    <div className="container">
      <h1>Nota Compartilhada</h1>
      {isLoading ? (
        <img src={loadingGif} alt="Loading" />
      ) : (
        <>
          <p>ID: {note.id}</p>
          <textarea
            className="noteArea"
            value={bufferedText}
            onKeyUp={handleTextKeyUp}
            onChange={handleTextChange}
            readOnly={isLoading}
            ref={noteArea}
          />
        </>
      )}
    </div>
  );
};

export default Note;
