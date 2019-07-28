const rootNode = document.getElementById('root');
let todoItems = [];
if (JSON.parse(window.localStorage.getItem('todoItems'))===null) {
    todoItems = [];
} else {
    todoItems = JSON.parse(window.localStorage.getItem('todoItems'))
}
function addElement(parentNode,tag='div',before=null) {
    let elem = document.createElement(tag);
    parentNode.insertBefore(elem,before);
    return elem;
}
function onloadPage() {
    location.hash = 'main'
}
addEventListener('load',onloadPage)
let amountOfItem;
if (window.localStorage.getItem('amountOfItem')===null) {
    amountOfItem = 1;
} else {
    amountOfItem = parseInt(window.localStorage.getItem('amountOfItem'));
}
const counterOfItem = (() => {
    return () => {
        amountOfItem++;
    }
})()
let editedItem;
const editedItemCounter = (() => {
    return function (a) {
        editedItem=a;
        return editedItem;
    }
})()
let mainPage = addElement(rootNode);
mainPage.setAttribute('id','main');
let buttonAdd;
function renderList(todoItems) {
    for (let i = 0;i<todoItems.length;i++) {
        let ul = document.getElementById('list')
        let newItem = addElement(ul,'li')
        newItem.setAttribute('class','item')
        let checkbox = addElement(newItem);
        if (todoItems[i].isDone) {
            checkbox.setAttribute('class','checkbox-div-done')
            newItem.style.backgroundColor = '#7E807E'
        } else {
            checkbox.setAttribute('class','checkbox-div');
        }
        let text = addElement(newItem,'span');
        text.onclick = function () {
            location.hash = 'modify';
        }
        text.innerHTML = todoItems[i].description;
        let deleteButton = addElement(newItem);
        deleteButton.setAttribute('class','delete')
    }
}
function renderMainPage(){
    mainPage.innerHTML = ''
    let header = addElement(mainPage,'h2');
    header.setAttribute('class','header');
    header.innerHTML = 'Simple TODO application';
    buttonAdd = addElement(mainPage,'button');
    buttonAdd.innerHTML = 'Add new task';
    buttonAdd.setAttribute('id','button-add');
    let helpFunc = () => {
        location.hash = 'add-item'
    }
    buttonAdd.addEventListener('click' , helpFunc)
    let ul = addElement(mainPage,'ul');
    ul.setAttribute('id','list')
    ul.style.padding = '0px'
    ul.style.listStyle = 'none'
    if(todoItems.length===0) {
        ul.innerHTML = '';
        const MESSAGE_NODE = addElement(mainPage);
        MESSAGE_NODE.innerHTML = 'TODO is empty'
    } else {
        ul.innerHTML = '';
        let hasNotDoneArray = [];
        let hasDoneArray = [];
        for (let i=0;i<todoItems.length;i++) {
            if(todoItems[i].isDone === false) {
                hasNotDoneArray.push(todoItems[i])
            } else {
                hasDoneArray.push(todoItems[i])
            }
        }
        renderList(hasNotDoneArray)
        renderList(hasDoneArray)
    }
}
renderMainPage(todoItems)
let addItem = addElement(rootNode);
addItem.setAttribute('id','add-item');
let addItemInput,acceptEntering,cancelEntering;
(() => {
    addItem.style.display = 'none';
    let header = addElement(addItem,'h2');
    header.setAttribute('class','header');
    header.innerHTML = 'Add tasc';
    addItemInput = addElement(addItem,'input')
    addItemInput.setAttribute('id','enter-todo');
    let buttonsFields = addElement(addItem)
    buttonsFields.setAttribute('class','buttons-fields')
    acceptEntering = addElement(buttonsFields,'button')
    acceptEntering.setAttribute('id','sendEnteredTodo')
    acceptEntering.innerHTML = 'Save changes';
    let helpFunc =() => {
        location.hash = 'main'
    }
    acceptEntering.addEventListener('click',helpFunc)
    cancelEntering = addElement(buttonsFields,'button')
    cancelEntering.setAttribute('id','cancelEnteredTodo')
    cancelEntering.innerHTML = 'Cancel';
    cancelEntering.addEventListener('click',helpFunc)
})();
let modify = addElement(rootNode);
modify.setAttribute('id','modify');
let editItemInput,acceptEditing,cancelEditing;
(() => {
    modify.style.display = 'none';
    let header = addElement(modify,'h2');
    header.setAttribute('class','header');
    header.innerHTML = 'Modify Item';
    editItemInput = addElement(modify,'input')
    editItemInput.setAttribute('id','enter-todo');
    let buttonsFields = addElement(modify)
    buttonsFields.setAttribute('class','buttons-fields')
    acceptEditing = addElement(buttonsFields,'button')
    acceptEditing.setAttribute('id','sendEditedTodo')
    acceptEditing.innerHTML = 'Save changes';
    let helpFunc = () => {
        location.hash = 'main'
    }
    acceptEditing.addEventListener('click',modifyItem)
    acceptEditing.addEventListener('click',helpFunc)
    cancelEditing = addElement(buttonsFields,'button')
    cancelEditing.setAttribute('id','cancelEditedTodo')
    cancelEditing.innerHTML = 'Cancel';
    cancelEditing.addEventListener('click',helpFunc)
})();

function fillUpModifyInput(ev) {
    let target = ev.target;
    const COLLECTIONS_OF_ITEMS = document.querySelectorAll('ul>li>span');
    for(let i =0;i<COLLECTIONS_OF_ITEMS.length;i++) {
        if(COLLECTIONS_OF_ITEMS[i].innerHTML===target.innerHTML) {
            editItemInput.value = COLLECTIONS_OF_ITEMS[i].innerHTML;
            editedItemCounter(i);
        }
    }
}
function modifyItem() {
    if(isEmpty(editItemInput)) {
        return;
    }
    if(isEqual(editItemInput)) {
        return;
    }
    todoItems[editedItem].description = editItemInput.value;
    window.localStorage.setItem('amountOfItem',amountOfItem)
    window.localStorage.setItem('todoItems',JSON.stringify(todoItems));
    renderMainPage()
}
document.addEventListener('click',fillUpModifyInput)
function deletedItem(ev) {
    let target = ev.target;
    const COLLECTIONS_OF_ITEMS = document.querySelectorAll('ul>li>div.delete');
    for(let i =0;i<COLLECTIONS_OF_ITEMS.length;i++) {
        if(COLLECTIONS_OF_ITEMS[i]===target) {
            let choosenElem = target.parentNode.children[1].innerHTML
            for(let j =0;j<todoItems.length;j++) {
                if(todoItems[j].description === choosenElem) {
                    todoItems.splice(j,1);
                }
            }
        }
    }
    window.localStorage.setItem('amountOfItem',amountOfItem)
    window.localStorage.setItem('todoItems',JSON.stringify(todoItems));
    renderMainPage()
}
document.addEventListener('click',deletedItem)
function hashChange() {
    mainPage.style.display = 'none';
    addItem.style.display = 'none';
    modify.style.display = 'none';
    document.querySelector(location.hash).style.display = 'block'
}
window.addEventListener('hashchange',hashChange)
function isEmpty(inputNode) {
    if(inputNode.value==='') {
        window.alert('enter data in field');
        location.hash = 'add-item'
        return true;
    } else {
        return false;
    }
}
function isEqual(inputNode) {
    for(let i=0;i<todoItems.length;i++) {
        if(inputNode.value===todoItems[i].description){
            window.alert(`you can't add already exist item`)
            location.hash = 'add-item';
            return true;
        }
    }
    return false;
}
function addNewItem() {
    let obj = {};
    if(isEmpty(addItemInput)) {
        return;
    }
    if(isEqual(addItemInput)) {
        return;
    }
    obj.isDone = false;
    obj.id = amountOfItem;
    obj.description = addItemInput.value;
    todoItems.push(obj)
    addItemInput.value = '';
    window.localStorage.setItem('amountOfItem',amountOfItem)
    window.localStorage.setItem('todoItems',JSON.stringify(todoItems))
    counterOfItem()
}
acceptEntering.addEventListener('click',addNewItem)
acceptEntering.addEventListener('click',renderMainPage)
//checking
function pressCheckbox(ev) {
    if (ev.target.getAttribute('class')==='checkbox-div-done'||ev.target.getAttribute('class')==='checkbox-div') {
        let target = ev.target.parentNode.children[1];
        const COLLECTIONS_OF_ITEMS = document.querySelectorAll('ul>li');
        for(let i =0;i<COLLECTIONS_OF_ITEMS.length;i++) {
            if(COLLECTIONS_OF_ITEMS[i].children[1].innerHTML===target.innerHTML) {
                for (let j=0;j<COLLECTIONS_OF_ITEMS.length;j++) {
                    if (COLLECTIONS_OF_ITEMS[i].children[1].innerHTML === todoItems[j].description) {
                        todoItems[j].isDone = !todoItems[j].isDone;
                    }
                }
            }
        }
        window.localStorage.setItem('amountOfItem',amountOfItem)
        window.localStorage.setItem('todoItems',JSON.stringify(todoItems));
        renderMainPage()
    }
}
document.addEventListener('click',pressCheckbox)
//user alert
function renderUserAlert(descriptionMessage){
    // you required every element should be included to rootNode than this alert has written only for rootNode
    let overElement = addElement(rootNode)
    overElement.style.width = rootNode.offsetWidth+'px';
    overElement.style.height = rootNode.offsetHeight+'px';
    overElement.style.display = 'none';
    overElement.style.top = '0%';
    overElement.style.position = 'absolute';
    overElement.setAttribute('id','over-element')
    overElement.style.opacity = '0';
    overElement.style.left = '0%';
    rootNode.style.position = 'relative';
    let alertBody = addElement(rootNode);
    alertBody.style.backgroundColor = 'red'
    alertBody.style.color = 'white'
    alertBody.style.width = '300px'
    alertBody.style.height = '150px'
    alertBody.style.padding = '10px'
    alertBody.style.display = 'none';
    alertBody.setAttribute('id','alert-body')
    alertBody.style.position = 'fixed';
    alertBody.style.top = '30px';
    function isChrome() {
        return window.navigator.vendor==='Google Inc.'
    }
    if(isChrome()) {
        alertBody.style.left = '30px';
    } else {
        alertBody.style.right = '30px';
    }
    let messageBox = addElement(alertBody);
    let message = addElement(messageBox)
    messageBox.style.display = 'flex';
    messageBox.style.justifyContent = 'space-between';
    message.innerHTML = 'Danger';
    let closeIcon = addElement(messageBox);
    closeIcon.innerHTML = 'X';
    closeIcon.addEventListener('click',hideAlert);
    let description = addElement(alertBody)
    description.innerHTML = descriptionMessage;
}
function hideAlert() {
    let over = document.getElementById('over-element');
    if(over === null ) {
        return
        // I use return in this place because of if we press 'X' alert.style.display = 'none' but setTimeOut launch hideAlert in 2 seconds and it can not find alert and we get error
    }
    over.style.display = 'none';
    let alertBody = document.getElementById('alert-body');
    alertBody.style.display = 'none';
    over.parentNode.removeChild(over)
    alertBody.parentNode.removeChild(alertBody)
}
window.alert = function(descriptionMessage) {
    renderUserAlert(descriptionMessage);
    let over = document.getElementById('over-element');
    over.style.display = 'block';
    let alertBody = document.getElementById('alert-body');
    alertBody.style.display = 'block';
    const TIME_TO_HIDE = 2000;
    setTimeout(hideAlert,TIME_TO_HIDE)
}