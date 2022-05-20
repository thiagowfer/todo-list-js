// const database = [
//     {'task': 'lavar roupa', 'status': 'checked'},
//     {'task': 'arrumar a casa', 'status': ''},
//     {'task': 'arrumar o quarto', 'status': ''}
// ]

const setDatabase = (database) => localStorage.setItem('todoList', JSON.stringify(database))
const getDatabase = () => JSON.parse(localStorage.getItem('todoList')) ?? []

const createItem = (task, status, index) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = ` 
        <label class="todo__item">
            <input type="checkbox" ${status} data-index=${index}>
            <div>${task}</div>
            <input type="button" value="X" data-index=${index}>
        </label> 
    `
    document.getElementById('todoList').appendChild(item)
}

const createTask = (e) => {
    const key = e.key 
    if(key === 'Enter') {
        const database = getDatabase()
        database.push({'task' : e.target.value, 'status': ''})
        setDatabase(database)
        e.target.value = ''
        render()
    }
}

const updateItem = (index) => {
    const database = getDatabase()
    database[index].status = database[index].status === '' ? 'checked' : ''
    setDatabase(database)
    render()
}

const clickItem = (e) => {
    const element = e.target 
    if(element.type === 'button') {
        const index = element.dataset.index 
        const confirmDelete = confirm('Are you sure you want to delete this task?')
        if(confirmDelete) {
        removeItem(index)
        }
    } else if(element.type === 'checkbox') {
        const index = element.dataset.index 
        updateItem(index)
    }
}

const removeItem = (index) => {
    const database = getDatabase()
    database.splice(index, 1)
    setDatabase(database)
    render()
}

const cleanTasks = () => {
    const todoList = document.getElementById('todoList')
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const render = () => {
    cleanTasks()
    const database = getDatabase()
    database.forEach( (item, index) => createItem(item.task, item.status, index))
}

document.getElementById('newItem').addEventListener('keypress', createTask)
document.getElementById('todoList').addEventListener('click', clickItem)

render()