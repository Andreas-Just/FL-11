let rootNode = document.getElementById('root');

class Component {
  constructor({ element }) {
    this._element = element;
  }

  on(eventName, dataElementName, callback) {
    this._element.addEventListener(eventName, (event) => {
      const newItemTextElement = event.target.closest(
        `[data-element="${dataElementName}"]`
      );
      if (!newItemTextElement) {
        return;
      }
      callback(event);
    });
  }

  findElement(elementName) {
    return this._element.querySelector(`[data-element="${elementName}"]`);
  }
}

class TodoApp extends Component {
  constructor({ element, items }) {
    super({ element });
    this._items = items;

    this._render();

    this.on('click', 'add-todo-action', (event) => {
      const input = this.findElement('new-todo-action');

      if (this._items.length >= 5 || input.value === '') {
        return;
      }
      this._items.push({
        checked: false,
        text: input.value
      });
      this._render();
    });

    /*this.on('click', 'performed-todo-action', (event) => {
      const tag = event.target;

      if (tag.tagName === 'LABEL') {
        tag.children[0].textContent = 'check_box';
        tag.control.checked = true;
        tag.control.disabled = true;
      } else {
        tag.textContent = 'check_box';
        tag.parentElement.previousElementSibling.checked = true;
        tag.parentElement.previousElementSibling.disabled = true;
      }
    });*/
  }

  _getItemHtml(item) {
    return `
      <li data-element="todo-item">
        <input
          ${item.checked ? 'checked' : ''}
          type="checkbox"
          id="check" 
          hidden
        >
        <label data-element="performed-todo-action" for="check">
          <i class="material-icons checkbox">
            ${item.checked ? 'check_box' : 'check_box_outline_blank'}
          </i>
          ${ item.text }
        </label>
        <button><i class="material-icons edit">edit</i></button>
        <button><i class="material-icons delete">delete</i></button>
      </li>
    `;
  }

  _render() {
    this._element.innerHTML = `
      <h1 class="heading"><span>Todo</span> Cat List</h1>
      <h3 
        ${this._items.length < 5 ? 'hidden' : ''}
        data-element="todo-max"
        class="heading-max"
      >
        Maximum item per list are created
      </h3>
      
      <div class="wrapper">
        <label for="newAction"></label>
        <input 
          ${this._items.length >= 5 ? 'disabled' : ''}
          data-element="new-todo-action" 
          placeholder="Add new action"
          id="newAction"
          type="text" 
        >
        <button 
          ${this._items.length >= 5 ? 'disabled' : ''}
          data-element="add-todo-action"
        >
          <i class="material-icons">add_box</i>
        </button>
      </div>
      
      <div class="line"></div>
      <ul data-element="todo-list">
        ${ this._items.map(item => 
      
          this._getItemHtml(item)
      
        ).join('')}
        
        <li data-element="todo-item">
          <input type="text" data-element="change-todo-action"
          id="item_${2}">
          <label for="item_${2}"></label>
          <button><i class="material-icons save">save</i></button>
        </li>
      </ul>
    `;
  }
}

const config = {
  element: rootNode,
  items: [
    {checked: false, text: 'Find the cat'},
    {checked: false, text: 'Prepare cat\'s carry'},
    {checked: false, text: 'Bathe a cat'}
  ]
};

const todoApp = new TodoApp(config);