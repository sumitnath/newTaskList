// ui content
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load event listner
loadEventListners();

//load all event listener
function loadEventListners(){
  // DOM Load event
  document.addEventListener('DOMContentLoaded',getTasks);
  // Add task event
  form.addEventListener('submit',addTask)
  // remove task event
  tasklist.addEventListener('click',removeTask);
  // clear All task
  clearBtn.addEventListener('click',clearTasks);
  //Filter task events
  filter.addEventListener('keyup',filterTasks);
}

//Get Tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
    tasks.forEach(function(task){
    //Create Li element
    const li = document.createElement('li');
    //Add class
    li.className ='collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    tasklist.appendChild(li);
  });
}



//Add task
function addTask(e){
  if(taskInput.value === ''){
    alert ('Add Task')
  }
  //create li element
  const li = document.createElement('li')
  //create class name
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value))
  // create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  //Append li to ul
  tasklist.appendChild(li)
  // store in lS
  storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value ='';
  e.preventDefault(); 
}

// store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  }else{
    tasks= JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
if(e.target.parentElement.classList.contains('delete-item')){
  if(confirm('Are you sure')){
    e.target.parentElement.parentElement.remove();
    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  } 
 } 
}

// Remove from Ls
function removeTaskFromLocalStorage(taskItem){
 // console.log(taskItem)
 let tasks;
 if(localStorage.getItem('tasks') === null){
   tasks = [];
 }else{
   tasks = JSON.parse(localStorage.getItem('tasks'));
 }
 tasks.forEach(function(task,index){
 if(taskItem.textContent === task){
   // At position of index, remove 1: 
   tasks.splice(index, 1);
  }
 });
 localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks(){
//   if(confirm('Are you sure')){
// tasklist.innerHTML ='';
// }
while(tasklist.firstChild){
  tasklist.removeChild(tasklist.firstChild)
 }
// clear from LS
clearTasksFromLocalstorage();
}
// Clear Tasks from Ls
function clearTasksFromLocalstorage(){
  localStorage.clear();
}
//Filter Tasks
function filterTasks(e){
const text = e.target.value.toLowerCase();
//console.log(text);
document.querySelectorAll('.collection-item').forEach(function(task){
  const item = task.firstChild.textContent;
  if(item.toLowerCase().indexOf(text) != -1){
    task.style.display = 'block';
  }else{
    task.style.display = 'none';
  }
 }) 
}



