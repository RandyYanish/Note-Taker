/** // TODO write notes js to include: 
    Save icon element send data in text boxes to db.json
    Add icon to push note to list
    Click list item to edit note
 */
const noteTitle = document.getElementById('note-title');
const noteTextarea = document.getElementById('note-textarea');

const createCard = (note) => {
    // Create card
    const cardEl = document.createElement('div');
    cardEl.classList.add('card', 'mb-3', 'm-3');
    cardEl.setAttribute('key', note.note_id);

  // Create card header
    const cardHeaderEl = document.createElement('h4');
    cardHeaderEl.classList.add(
        'card-header',
        'bg-primary',
        'text-light',
        'p-2',
        'm-0'
    );
    cardHeaderEl.innerHTML = `${note.username} </br>`;

  // Create card body
    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
    cardBodyEl.innerHTML = `<p>${note.note}</p>`;

  // Append the header and body to the card element
    cardEl.appendChild(cardHeaderEl);
    cardEl.appendChild(cardBodyEl);

  // Append the card element to the notes container in the DOM
    noteContainer.appendChild(cardEl);
};

// TODO: Get a list of existing notes from the server

// TODO: Post a new note to the page

// TODO: When the page loads, get all the tips

// TODO: Function to validate the notes that were submitted

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