const addNotesContainer = document.querySelector("#notes-container");
const addNotesInput = document.querySelector("#add-notes-input");
const addNoteBtn = document.querySelector(".add-note");

// funções
const showNotes = () => {
  clearNotes();
  getNotes().forEach((note) => {
    const noteElement = createNote(note.id, note.content, note.fixed);

    addNotesContainer.appendChild(noteElement);
  });
};

const clearNotes = () => {
  addNotesContainer.replaceChildren([]);
};

const adicionar = () => {
  const notes = getNotes();
  const noteObject = {
    id: generateId(),
    content: addNotesInput.value,
    fixed: false,
  };

  const noteElement = createNote(noteObject.id, noteObject.content);

  addNotesContainer.appendChild(noteElement);

  notes.push(noteObject);

  saveNotes(notes);

  addNotesInput.value = "";
};

const createNote = (id, content, fixed) => {
  const element = document.createElement("div");

  element.classList.add("notes");

  const textarea = document.createElement("textarea");

  textarea.value = content;

  textarea.placeholder = "Adicione sua tarefa...";

  element.appendChild(textarea);

  const pinIcon = document.createElement("i");

  pinIcon.classList.add(...["bi", "bi-pin"]);

  element.appendChild(pinIcon);
  const deleteIcon = document.createElement("i");

  deleteIcon.classList.add(...["bi", "bi-x-lg"]);

  element.appendChild(deleteIcon);

  const duplicateIcon = document.createElement("i");

  duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);

  element.appendChild(duplicateIcon);

  if (fixed) {
    element.classList.add("fixed");
  }

  // Eventos do elemento
  element.querySelector(".bi-pin").addEventListener("click", () => {
    toggleFixNote(id);
  });

  element.querySelector(".bi-x-lg").addEventListener("click", () => {
    deleteNote(id, element);
  });

  element
    .querySelector(".bi-file-earmark-plus")
    .addEventListener("click", () => {
      copyNote(id);
    });
  return element;
};

const toggleFixNote = (id) => {
  const notes = getNotes();

  const targetNotes = notes.filter((notes) => notes.id === id)[0];

  targetNotes.fixed = !targetNotes.fixed;
  saveNotes(notes);

  showNotes();
};

const deleteNote = (id, element) => {
  const notes = getNotes().filter((note) => note.id !== id);

  saveNotes(notes);

  addNotesContainer.removeChild(element);
};

const copyNote = (id) => {
  const notes = getNotes();

  const targetNotes = notes.filter((note) => note.id === id)[0];

  const objectNote = {
    id: generateId(),
    content: targetNotes.content,
    fixed: false,
  };

  const noteElement = createNote(
    objectNote.id,
    objectNote.content,
    objectNote.fixed
  );

  addNotesContainer.appendChild(noteElement);

  notes.push(objectNote);

  saveNotes(notes);
};
// localStorage
const getNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  const orderNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

  return orderNotes;
};

const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const generateId = () => {
  return Math.floor(Math.random() * 5000);
};
// eventos
addNoteBtn.addEventListener("click", () => adicionar());

// inicialização
showNotes();
