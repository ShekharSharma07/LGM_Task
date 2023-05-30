
//selectors
let todoInput = document.querySelector('.todo-input');
let todoButtton = document.querySelector('.todo-button');
let todoList = document.querySelector('.todo-list');

//event listener
document.addEventListener('DOMContentLoaded',getTodos);
todoButtton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck);


//function

function addTodo(event) {
    //prevent from submitting
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to localstorage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //apend to ul
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";

}

function deleteCheck(e) {
    //e is the event
    //e.target will give class list of item in todo ..where at classlist[0] will have clicked element name
    const item = e.target;

    // delete todo
    if (item.classList[0] === "trash-btn") {
        //item.classList[0] will point to elem clicked 
        // item=trash-btn & item.parentelm=whole todoitem
        const todo = item.parentElement
        //animation
        todo.classList.add("fall");

        //Remove from local storage
        removeLocalTodos(todo);

        //todo.remove will wait till fall transition ends 
        todo.addEventListener('transitionend', function () {
            todo.remove();
        }
        );

    }

    //checkmark
    if (item.classList[0] === "complete-btn") {

        const todo = item.parentElement;
        // With each click, classList.toggle() will add the CSS class if it does not exist in the classList array
        //  and return true. If the CSS class exists, the method will remove the class and return false.
        todo.classList.toggle('completed');
    }
}

function saveLocalTodos(todo) { //todo has task name

    //check if already have todos in localstorage and we dont overwrite it
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        //if we have then get in todos by parsing(to remove string) todos which is in Json format
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //push new todo data in todos
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos() {
    //check if already have todos and we dont overwrite it
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        //if we have then get in todos by parsing(to remove string) todos which is in Json format
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        //here todo in foreach loop has text value exp: todos=[gym,party]
        //todo is iterator(string type) over todos array

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //apend to ul
        todoList.appendChild(todoDiv);



    });

}

//remove from local
function removeLocalTodos(todo){    //here todo is complete todo

    //check if already have todos and we dont overwrite it
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        //if we have then get in todos by parsing(to remove string) todos which is in Json format
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //children[0] point to todoinput task & .innertext will give the task name
    const task= todo.children[0].innerText;

    //index of task to be deleted in localstorage array todos
    const indexofTask=todos.indexOf(task);

    //splice will remove element in todos from indexoftask , how many from indexof
    todos.splice(indexofTask,1); // ,1 means only till given index ,2 means 2 elemt from given index

    localStorage.setItem('todos',JSON.stringify(todos));

}