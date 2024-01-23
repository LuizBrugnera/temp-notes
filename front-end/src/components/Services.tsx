interface Note {
  id: string;
  text: string;
}

export const NoteService = {
  getNotes: async () => {
    const response = await fetch(`http://localhost:3005/api/v1/conotes`);
    const data = await response.json();
    return data;
  },
  getNote: async (noteId: string) => {
    const response = await fetch(
      `http://localhost:3005/api/v1/conotes/${noteId}`
    );
    const data = await response.json();
    return data;
  },
  createNote: async (note: Note) => {
    const response = await fetch(`http://localhost:3005/api/v1/conotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    return data;
  },
  updateNote: async (noteId: string, note: Note) => {
    const response = await fetch(
      `http://localhost:3005/api/v1/conotes/${noteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }
    );
    const data = await response.json();
    return data;
  },
  upsert: async (note: Note) => {
    const response = await fetch(
      `http://localhost:3005/api/v1/conotes/upsert`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }
    );
    const data = await response.json();
    return data;
  },
  deleteNote: async (noteId: string) => {
    const response = await fetch(
      `http://localhost:3005/api/v1/conotes/${noteId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  },
};
