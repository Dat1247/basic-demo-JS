const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('notesTodo'));

if (todos) {
    todos.forEach(todo => {
        addTodos(todo)
    })
}

function addTodos(todo) {
    let todoText = input.value;
    if (todo) {
        todoText = todo.text;
    }
    if (todoText) {
        const todoEl = document.createElement('li');
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }
        todoEl.innerHTML = todoText;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();

        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoEl.remove();
            updateLS();
        })

        todosUl.appendChild(todoEl);
        input.value = "";
        updateLS();
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodos();
});

function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    });

    localStorage.setItem('notesTodo', JSON.stringify(todos));
}