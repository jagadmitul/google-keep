import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Note from './Note';
import NoteForm from './NoteForm';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { updateNotesOrder } from '../../store/notes/notesSlice';

const NoteList = () => {
    const dispatch = useDispatch();
    const { notes, gridView } = useSelector(state => state.notes);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const handleNoteEdit = useCallback((note) => {
        setCurrentNote(note);
        setIsFormOpen(true);
    }, []);

    const pinnedNotes = notes?.filter(note => note.pinned);
    const otherNotes = notes?.filter(note => !note.pinned);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination || (source.index === destination.index && source.droppableId === destination.droppableId)) {
            return;
        }

        const reorderedNotes = Array.from(notes);
        const [removed] = reorderedNotes.splice(source.index, 1);
        reorderedNotes.splice(destination.index, 0, removed);

        dispatch(updateNotesOrder(reorderedNotes));
    };

    const renderNotes = (notesArray, droppableId) => (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${gridView && `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}`}
                >
                    {notesArray.map((note, index) => (
                        <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{ ...provided.draggableProps.style }}
                                    onClick={(e) => handleNoteEdit(note)}
                                    className='h-fit mb-4'
                                >
                                    <Note note={note} />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="container mx-auto p-4">
                {pinnedNotes?.length > 0 && <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Pinned</h2>
                    {renderNotes(pinnedNotes, "pinnedNotes")}
                </div>}
                {otherNotes?.length > 0 && <div>
                    {pinnedNotes?.length > 0 && <h2 className="text-lg font-semibold mb-2">Others</h2>}
                    {renderNotes(otherNotes, "otherNotes")}
                </div>}
                <NoteForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    note={currentNote}
                />
            </div>
        </DragDropContext>
    );
};

export default NoteList;
