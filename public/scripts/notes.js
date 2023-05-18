const noteTitle = document.getElementById('note-title');
const noteTextarea = document.getElementById('note-textarea');
const saveIcon = document.getElementById('save-icon');
const writeIcon = document.getElementById('write-icon');

const titleInput = document.querySelector('.note-title');
const textArea = document.querySelector('.note-textarea');

const populateForm = (note) => {
    titleInput.value = note.title;
    textArea.value = note.text;
};

const addCardClickListener = (note) => {
    const card = document.querySelector(`.list-group-item[data-title="${note.title}"]`);
    card.addEventListener('click', () => {
        populateForm(note);
    });
};

const createCard = (note) => {
    const card = document.createElement('li');
    card.classList.add('list-group-item');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.innerHTML = `${note.title}<i class="fas fa-trash text-danger delete-note mx-5" data-title="${note.title}"></i>`;

    card.appendChild(cardHeader);

    const notesContainer = document.getElementById('notes-container');
    notesContainer.appendChild(card);
};

// Get a list of existing notes from the server
const getNotes = () =>
    fetch('/api/notes')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((note) => {
                createCard(note);
                addDeleteListener(note);
            });
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });

// Post a new note to the page
const postNote = (note) =>
    fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: note.title, text: note.text }),
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data);
            createCard({ title: note.title }); // Display only the note title in the card
        })
        .catch((error) => {
            console.error('Error:', error);
        });

// When the page loads, get all the notes
getNotes();

// Function to validate the notes that were submitted
const validateNote = (newNote) => {
    const { username, topic, note } = newNote;

    // Object to hold our error messages until we are ready to return
    const errorState = {
        username: '',
        note: '',
        topic: '',
    };

    // Bool value if the username is valid
    const utest = username.length >= 4;
    if (!utest) {
        errorState.username = 'Invalid username!';
    }

    // Bool value to see if the note being added is at least 15 characters long
    const noteContentCheck = note.length > 15;
    if (!noteContentCheck) {
        errorState.note = 'note must be at least 15 characters';
    }

    // Bool value to see if the topic is either UX or UI
    const topicCheck = topic.includes('UX' || 'UI');
    if (!topicCheck) {
        errorState.topic = 'Topic not relevant to UX or UI';
    }

    const result = {
        isValid: !!(utest && noteContentCheck && topicCheck),
        errors: errorState,
    };

    // Return result object with a isValid boolean and an errors object for any errors that may exist
    return result;
};

// Helper function to deal with errors that exist in the result
const showErrors = (errorObj) => {
    const errors = Object.values(errorObj);
    errors.forEach((error) => {
        if (error.length > 0) {
            alert(error);
        }
    });
};

// Helper function to send a POST request to the diagnostics route
const submitDiagnostics = (submissionObj) => {
    fetch('/api/diagnostics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionObj),
    })
        .then((response) => response.json())
        .then(() => showErrors(submissionObj.errors))
        .catch((error) => {
            console.error('Error:', error);
        });
};

const checkFormInputs = () => {
    const titleInput = document.querySelector('.note-title');
    const textArea = document.querySelector('.note-textarea');

    const hasText = titleInput.value.trim() !== '' && textArea.value.trim() !== '';

    const saveIcon = document.getElementById('save-icon');
    saveIcon.style.display = hasText ? 'inline' : 'none';
};

const deleteCardFromHTML = (deleteButton) => {
    const card = deleteButton.closest('.list-group-item');
    card.remove();
};

const deleteNoteFromDB = (noteTitle) => {
    fetch('/api/notes', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: noteTitle }),
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

const addDeleteListener = (note) => {
    const deleteButton = document.querySelector(`.delete-note[data-title="${note.title}"]`);
    deleteButton.addEventListener('click', () => {
        deleteNoteFromDB(note.title);
        deleteCardFromHTML(deleteButton);
    });
};

saveIcon.addEventListener('click', (event) => {
    event.preventDefault();

    const titleInput = document.querySelector('.note-title');
    const textArea = document.querySelector('.note-textarea');

    const newNote = {
        title: titleInput.value,
        text: textArea.value,
    };

    postNote(newNote);

    titleInput.value = '';
    textArea.value = '';
});

writeIcon.addEventListener('click', (event) => {
    event.preventDefault();

    const titleInput = document.querySelector('.note-title');
    const textArea = document.querySelector('.note-textarea');

    titleInput.value = '';
    textArea.value = '';
});

titleInput.addEventListener('input', checkFormInputs);
textArea.addEventListener('input', checkFormInputs);

checkFormInputs();
