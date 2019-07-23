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
    this._lastCreatedItemId = items.length;
    this._maxTodoItems = 10;

    this._render();

    this.on('click', 'add-todo-item', () => {
      const input = this.findElement('new-todo-item');

      if (this._items.length >= this._maxTodoItems || input.value === '') {
        return;
      }
      this._lastCreatedItemId++;
      this._items.push({
        id: this._lastCreatedItemId,
        checked: false,
        hidden: true,
        text: input.value
      });
      this._render();
    });

    this.on('click', 'performed-todo-item', (event) => {
      const itemElement = event.target.closest('[data-element="todo-item"]');
      const input = this.findElement('change-todo-item');

      this._findItemInArr(itemElement).checked = true;
      input.disabled = true;
      this._render();
    });

    this.on('click', 'edit-todo-item', (event) => {
      const itemElement = event.target.closest('[data-element="todo-item"]');
      const input = itemElement.children[0];
      const item = this._findItemInArr(itemElement);

      if (!item.hidden) {
        item.text = input.value
      }
      item.hidden = !item.hidden;
      this._render();
    });

    this.on('click', 'delete-todo-item', (event) => {
      const itemElement = event.target.closest('[data-element="todo-item"]');
      const delIndex = +itemElement.dataset.itemId;

      this._lastCreatedItemId--;
      this._items.splice(delIndex - 1, 1);
      this._items.forEach((item, index) => {
        item.id = index + 1;
      });
      this._render();
    });
  }

  _findItemInArr(li) {
    const currentItemId = +li.dataset.itemId;
    return this._items.find(item => item.id === currentItemId);
  }

  _getItemHtml(item) {
    return `
      <li data-element="todo-item" data-item-id="${item.id}">
        <input
          data-element="change-todo-item"
          type=${item.hidden ? 'checkbox' : 'text'}
          ${item.checked ? 'checked' : ''}
          ${item.hidden ? 'hidden' : ''}
          value="${item.text}"
          id="check" 
        >
        <label 
          data-element="performed-todo-item" 
          ${!item.hidden ? 'hidden' : ''}
          for="check"
        >
          <i class="material-icons checkbox">
            ${item.checked ? 'check_box' : 'check_box_outline_blank'}
          </i>
          ${item.text}
        </label>
        <button>
          <i data-element="edit-todo-item" class="material-icons">
            ${item.hidden ? 'edit' : 'save'}
          </i>
        </button>
        <button>
          <i data-element="delete-todo-item" class="material-icons">delete</i>
        </button>
      </li>
    `;
  }

  _render() {
    this._element.innerHTML = `
      <h1 class="heading"><span>Todo</span> Cat List</h1>
      <h3 
        ${this._items.length < this._maxTodoItems ? 'hidden' : ''}
        data-element="todo-max"
        class="heading-max"
      >
        Maximum item per list are created
      </h3>
      
      <div class="wrapper">
        <label for="newAction"></label>
        <input 
          ${this._items.length >= this._maxTodoItems ? 'disabled' : ''}
          data-element="new-todo-item" 
          placeholder="Add new action"
          id="newAction"
          type="text" 
        >
        <button 
          ${this._items.length >= this._maxTodoItems ? 'disabled' : ''}
          data-element="add-todo-item"
        >
          <i class="material-icons">add_box</i>
        </button>
      </div>
      
      <div class="line"></div>
      <ul data-element="todo-list">
        ${ this._items.map(item => 
      
          this._getItemHtml(item)
      
        ).join('')}
      </ul>
    `;
  }
}

const config = {
  element: rootNode,
  items: [
    {id: 1, checked: false, hidden: true, text: 'Find the cat'},
    {id: 2, checked: false, hidden: true, text: 'Prepare cat\'s carry'},
    {id: 3, checked: false, hidden: true, text: 'Bathe a cat'}
  ]
};

const todoApp = new TodoApp(config);