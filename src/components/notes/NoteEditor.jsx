import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../../store/notes/notesSlice';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PaletteIcon from '@mui/icons-material/Palette';
import CloseIcon from '@mui/icons-material/Close';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { TwitterPicker } from 'react-color';
import { Button, FormLabel, Switch } from '@mui/material';
import { Check } from '@mui/icons-material';

const NoteEditor = () => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [color, setColor] = useState('#ffffff');
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isChecklist, setIsChecklist] = useState(false);
    const [pinned, setPinned] = useState(false);
    const [orderNumber, setOrderNumber] = useState(1);
    const [tasks, setTasks] = useState([{ text: '', completed: false, orderNumber }]);
    const dispatch = useDispatch();

    const handleResetState = () => {
        setTitle('');
        setNote('');
        setOrderNumber(1);
        setIsColorPickerOpen(false)
        setIsChecklist(false)
        setColor('#ffffff');
        setTasks([{ text: '', completed: false, orderNumber }]);
        setIsExpanded(false);
    }

    const handleSave = () => {
        dispatch(addNote({
            id: new Date().getTime(),
            title,
            note,
            color,
            tasks,
            isChecklist,
            pinned,
        }));
        handleResetState();
    };

    const handleColorChange = (color) => {
        setColor(color.hex);
        setIsColorPickerOpen(false);
    };

    const handleAddTask = () => {
        setOrderNumber(orderNumber + 1);
        setTasks([...tasks, { text: '', completed: false, orderNumber }]);
    };

    const handleTaskChange = (index, value) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].text = value;
        setTasks(updatedTasks);
    };

    return (
        <div className='flex justify-center'>
            <div className={`note-editor ${isExpanded ? 'expanded' : ''}`} style={{ backgroundColor: color }}>
                {isExpanded ? (
                    <>
                        <div className="editor-header">
                            <TextField
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                fullWidth
                                variant="standard"
                            />
                            <IconButton onClick={() => setPinned(!pinned)}>
                                {pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
                            </IconButton>
                        </div>
                        {isChecklist ? (
                            <>
                                {tasks.map((task, index) => (
                                    <div key={index} className="task-item">
                                        <TextField
                                            key={index}
                                            label={`Task ${index + 1}`}
                                            value={task.text}
                                            onChange={(e) => handleTaskChange(index, e.target.value)}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </div>
                                ))}
                                {isChecklist && <Button onClick={handleAddTask} variant="outlined" color="primary">
                                    Add Task
                                </Button>}
                            </>
                        ) : (
                            <TextField
                                placeholder="Take a note..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                fullWidth
                                variant="standard"
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
                                <IconButton onClick={handleResetState}><CloseIcon /></IconButton>
                                <IconButton onClick={handleSave}><Check /></IconButton>
                            </div>
                        </div>
                    </>
                ) : (
                    <TextField
                        onClick={() => setIsExpanded(true)}
                        placeholder="Take a note..."
                        fullWidth
                        variant="standard"
                        className='note-input'
                    />
                )}
            </div>
        </div>
    );
};

export default NoteEditor;
