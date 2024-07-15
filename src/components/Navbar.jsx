import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GridView, List } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Logo from '../assets/google-keep-header.png';
import { useDispatch } from 'react-redux';
import { gridViewToggle } from '../store/notes/notesSlice';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();
    const { gridView } = useSelector(state => state.notes);
    const [isGridView, setIsGridView] = useState(gridView);

    const toggleView = () => {
        dispatch(gridViewToggle(!isGridView))
        setIsGridView(!isGridView);
    };

    return (
        <nav className="h-14 fixed top-0 left-0 right-0 px-4 bg-white shadow z-50 flex justify-between items-center">
            <div className="left flex items-center">
                <Link to="/">
                    <img src={Logo} alt="Google Keep Logo" className="h-8 mr-2" />
                </Link>
                <h3 className="text-xl font-semibold text-gray-800">Keep</h3>
            </div>
            <div className="right flex items-center space-x-4">
                <IconButton onClick={toggleView}>
                    {isGridView ? <List /> : <GridView />}
                </IconButton>
            </div>
        </nav>
    );
};

export default Navbar;
