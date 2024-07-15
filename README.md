# Google Keep Clone

### Application Features:
- Display a list of notes. Each note should have a title and content.
- Content can be either simple text or a list with checkboxes.
- Allow users to complete tasks from the list by clicking on the checkbox.
- Once a task is checked, it should automatically move to the end of the list with a strikethrough.
- Enable users to reorganize the notes by drag and drop.
- Allow users to customize the background color for each note.

### Additional Features:
- Grid/List view for displaying notes.
- Duplicate note functionality.
- Delete note functionality.
- Pin note functionality.

## Components

### Note
Responsible for displaying individual notes. Handles checkbox changes, and actions such as delete, duplicate, and pinning notes.

### NoteEditor
A component that provides an interface to create and edit notes. Includes functionality for title, content, task list, color picker, and checklist.

### NoteForm
A modal form for adding or editing notes. Handles note title, content, color, checklist, and tasks.

## State Management

### Redux Toolkit
The application state is managed using Redux Toolkit. The `notesSlice` handles actions for adding, updating, deleting, duplicating, and pinning notes.

## CSS

### Tailwind CSS
The application uses Tailwind CSS for styling, with custom classes for light and dark themes, and specific components.

## Material UI
Material UI is used for in-built components and icons

## Usage

### Running the Application
1. Clone the repository:
   ```sh
   git clone https://github.com/jagadmitul/google-keep.git
   ```
2. Navigate to the project directory:
   ```sh
   cd google-keep
   ```
3. Install dependencies:
   ```sh
   yarn
   ```
4. Start the development server:
   ```sh
   yarn start
   ```

### Features

#### Note Editor
- Expandable input field for note creation.
- Title, content, task list, color picker, checklist, and pin options.
- Save and close functionalities.

#### Note Display
- Displays title and content or checklist.
- Tasks move to the bottom with strikethrough when checked.
- Drag and drop to reorganize notes.
- Options to delete, duplicate, and pin notes.

### Checklist
- Tasks can be added dynamically.
- Tasks can be checked and move to the end of the list.

### Color Picker
- Custom background colors for notes using the `react-color` library.

## Additional Information

### Drag and Drop
Implemented using `react-beautiful-dnd` for note reorganization.

### Grid/List View
Toggle between grid and list views for displaying notes.

## Conclusion

This project provides a robust implementation of a Google Keep-like note-taking application with modern React features, state management using Redux Toolkit, and a clean, responsive UI using Tailwind CSS. The additional features enhance user experience, making the app a powerful tool for managing notes and tasks.