import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        gridView: true
    },
    reducers: {
        addNote: (state, action) => {
            state.notes.push({ ...action.payload });
        },
        updateNote: (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
        },
        pinNote: (state, action) => {
            const note = state.notes.find(note => note.id === action.payload);
            if (note) {
                note.pinned = !note.pinned;
            }
        },
        gridViewToggle: (state, action) => {
            state.gridView = action.payload;
        },
        deleteNote: (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload);
            if (index !== -1) {
                state.notes.splice(index, 1);
            }
        },
        duplicateNote: (state, action) => {
            const noteToDuplicate = state.notes.find(note => note.id === action.payload);
            if (noteToDuplicate) {
                state.notes.push({ ...noteToDuplicate, id: new Date().getTime() });
            }
        },
        updateNotesOrder: (state, action) => {
            state.notes = action.payload;
        },
    },
});

export const { addNote, deleteNote, updateNote, duplicateNote, updateNotesOrder, pinNote, gridViewToggle } = notesSlice.actions;
export default notesSlice.reducer;
