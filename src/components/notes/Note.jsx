import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, duplicateNote, pinNote, updateNote } from '../../store/notes/notesSlice';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

const Note = ({ note }) => {
    const dispatch = useDispatch();

    const handleCheckboxChange = (taskIndex) => {
        const updatedTasks = note.tasks.map((task, index) =>
            index === taskIndex ? { ...task, completed: !task.completed } : task
        );

        // Sort the tasks based on completed and orderNumber
        const sortedTasks = updatedTasks.sort((a, b) => {
            if (a.completed && !b.completed) {
                return 1;
            } else if (!a.completed && b.completed) {
                return -1;
            } else {
                return a.orderNumber - b.orderNumber;
            }
        });

        const updatedNote = { ...note, tasks: sortedTasks };
        dispatch(updateNote(updatedNote));
    };

    // prevent NoteForm modal opening on button click event
    const handleIconClick = (e, action) => {
        e.stopPropagation();
        action();
    };

    return (
        <div className="h-fit cursor-pointer p-4 bg-white rounded-lg shadow-md" style={{ backgroundColor: note.color }}>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{note.title}</h2>
                <IconButton onClick={(e) => handleIconClick(e, () => dispatch(pinNote(note.id)))}>
                    {note.pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
                </IconButton>
            </div>
            {note.isChecklist ? (
                <div>
                    {note.tasks.map((task, index) => (
                        <div key={index} className="flex items-center mb-1">
                            <Checkbox
                                checked={task.completed}
                                onChange={() => handleCheckboxChange(index)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span className={`ml-2 ${task.completed ? 'line-through' : ''}`}>
                                {task.text}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>{note.note}</p>
            )}
            <div className="flex justify-end mt-4">
                <IconButton onClick={(e) => handleIconClick(e, () => dispatch(deleteNote(note.id)))}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={(e) => handleIconClick(e, () => dispatch(duplicateNote(note.id)))}>
                    <FileCopyIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Note;
