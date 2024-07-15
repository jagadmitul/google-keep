import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../../store/notes/notesSlice';
import { TwitterPicker } from 'react-color';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormLabel, IconButton, Switch } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

const NoteForm = ({ isOpen, onClose, note }) => {
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [color, setColor] = useState('#ffffff');
    const [orderNumber, setOrderNumber] = useState(1);
    const [tasks, setTasks] = useState([{ text: '', completed: false, orderNumber }]);
    const [isChecklist, setIsChecklist] = useState(false);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setNoteContent(note.note);
            setColor(note.color);
            setTasks(note.tasks);
            setIsChecklist(note.isChecklist);
        }
    }, [note]);

    const handleTaskChange = (index, value) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: value } : task
        );
        setTasks(updatedTasks);
    };

    const handleCheckboxChange = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        // Sort the tasks: completed tasks go to the bottom
        const sortedTasks = updatedTasks.sort((a, b) => a.completed - b.completed);
        setTasks(sortedTasks);
    };

    const handleAddTask = () => {
        setOrderNumber(orderNumber + 1);
        setTasks([...tasks, { text: '', completed: false, orderNumber: orderNumber + 1 }]);
    };

    const handleColorChange = (color) => {
        setColor(color.hex);
        setIsColorPickerOpen(false);
    };

    const handleSave = () => {
        const isNoteEmpty = !title && !noteContent && tasks.every(task => !task.text);
        if (isNoteEmpty) {
            onClose();
            return;
        }

        const noteData = {
            id: note ? note.id : new Date().getTime(),
            title,
            note: noteContent,
            color,
            tasks,
            isChecklist,
            pinned: note?.pinned || false,
        };

        if (note) {
            dispatch(updateNote(noteData));
        } else {
            dispatch(addNote(noteData));
        }

        onClose();
        setTitle('');
        setNoteContent('');
        setOrderNumber(1);
        setColor('#ffffff');
        setTasks([{ text: '', completed: false, orderNumber }]);
        setIsChecklist(false);
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{note ? 'Edit Note' : 'Add Note'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                {isChecklist ? (
                    tasks.map((task, index) => (
                        <div key={index} className="task-item">
                            <Checkbox
                                checked={task.completed}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <TextField
                                placeholder={`Task ${index + 1}`}
                                value={task.text}
                                onChange={(e) => handleTaskChange(index, e.target.value)}
                                fullWidth
                                variant="standard"
                            />
                        </div>
                    ))
                ) : (
                    <TextField
                        label="Note"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                    />
                )}
                <div className='flex justify-between'>
                    <div className=''>
                        <IconButton onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}><PaletteIcon /></IconButton>
                        {isColorPickerOpen && <TwitterPicker
                            color={color}
                            onChangeComplete={handleColorChange}
                        />}
                    </div>
                    <div className=''>
                        <Switch
                            checked={isChecklist}
                            onChange={() => setIsChecklist(!isChecklist)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <FormLabel className='mr-5'>Checklist</FormLabel>
                        {isChecklist && <Button onClick={handleAddTask} variant="outlined" color="primary">
                            Add Task
                        </Button>}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NoteForm;
