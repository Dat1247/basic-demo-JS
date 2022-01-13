const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('noteText'));

if (notes) {
    notes.forEach(note => {
        addNewNotes(note);
    })
}

addBtn.addEventListener('click', () => {
    addNewNotes();
});

function addNewNotes(text = "") {
    const note = document.createElement('div');
    note.classList.add('notes');

    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fa fa-edit"></i></button>
            <button class="delete"><i class="fa fa-trash"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}">
        </div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    `;

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');

    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        updateLS();
    })

    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('noteText', JSON.stringify(notes));
}