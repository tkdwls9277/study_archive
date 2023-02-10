const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");
    
const TODOS_LS="todos";

let todos = [];

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);

    const cleanTodo = todos.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });
    todos = cleanTodo;
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(text){
    const li = document.createElement("li"),
        delBtn = document.createElement("button"),
        span = document.createElement("span"),
        newId = todos.length+1;

    delBtn.innerText="X";
    delBtn.addEventListener("click",deleteTodo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id=newId;
    todoList.appendChild(li);
    const todoObj = {
        text : text,
        id : newId,
    };
    todos.push(todoObj);
    saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value="";
}

function loadTodos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if(loadedTodos !== null){
        const parsedTodos = JSON.parse(loadedTodos);
        parsedTodos.forEach(function(todo){
            paintTodo(todo.text);
        })
    }
}

function init(){
    loadTodos();
    todoForm.addEventListener("submit",handleSubmit);
}

init();