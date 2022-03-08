const todoInput=document.querySelector('.todo-input')
const todoButton=document.querySelector('.todo-button')
const todoList=document.querySelector('.todo-list')
const filterOption=document.querySelector('.filter-todo')
// const elements=document.getElementsByClassName('.filter-todo')

document.addEventListener('DOMContentLoaded',getTodos)
filterOption.addEventListener("click", filterTodo)

const addTodo=()=>{
    event.preventDefault();
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo")
    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.append(newTodo);
    ///adding todos
    saveLocalTodos(todoInput.value);

    
    //CHECK MARK BUTTON
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fa fa-check" aria-hidden="true"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton);
    //CHECK MARK BUTTON
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fa fa-trash" aria-hidden="true"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton);
    //append todo list
    todoList.appendChild(todoDiv)
    //clear input value
    todoInput.value="";
}

const deleteCheck=(e)=>{
    const item =e.target;
    if(item.classList[0]==='trash-btn'){
        const todo=item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo)
        todo.addEventListener("transitionend",()=>{
            todo.remove()
        })

    }
    if(item.classList[0]==='complete-btn'){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(e){

    const todos = todoList.childNodes


    todos.forEach(function(todo,idx){
        if (idx==0){
        }else{
            switch(e.target.value){
                case "all":
                    todo.style.display = "flex" 
                    break;
                case "completed":
                    // console.log(todo)
                    if (todo.classList.contains("completed")){
                        todo.style.display = "flex"
                    }else{
                        todo.style.display = "none"
                    }
                    break
                case "uncompleted":
                    // console.log(todo)
                    if (!todo.classList.contains("completed")){
                        todo.style.display = "flex"
                    }else{
                        todo.style.display = "none"
                    }
                    break
            }
        }
    })
}
function saveLocalTodos(todo){
    //check-the todos
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
      }
    todos.forEach(function(todo){
        const todoDiv=document.createElement("div");
        todoDiv.classList.add("todo")
        const newTodo=document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add("todo-item");
        todoDiv.append(newTodo);
    
        
        //CHECK MARK BUTTON
        const completedButton=document.createElement('button');
        completedButton.innerHTML='<i class="fa fa-check" aria-hidden="true"></i>'
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton);
        //CHECK MARK BUTTON
        const trashButton=document.createElement('button');
        trashButton.innerHTML='<i class="fa fa-trash" aria-hidden="true"></i>'
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton);
        //append todo list
        todoList.appendChild(todoDiv)
    })

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
      }
    //   const todoIndex=todo
    const todoIndex=todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem('todos',JSON.stringify(todos))
}

todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);





