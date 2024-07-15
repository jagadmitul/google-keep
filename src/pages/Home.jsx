import React from 'react';
import NoteEditor from '../components/notes/NoteEditor';
import NoteList from '../components/notes/NoteList';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4 my-16">
                <NoteEditor />
                <NoteList />
            </div>
        </div>
    );
};

export default Home;
