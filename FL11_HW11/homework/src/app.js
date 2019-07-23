let rootNode = document.getElementById("root");

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
  constructor({ element }) {
    super({ element });
    this._numberOfItems = 0;

    this._render();

    this.on('click', 'add-todo-action', (event) => {
      const input = this.findElement('new-todo-action');
      const list = this.findElement('todo-list');
      const h3 = this.findElement('todo-max');

      if (this._numberOfItems < 3) {
        list.insertAdjacentHTML('beforeend', this._getItemHtml(input.value));
        input.value = '';
        this._numberOfItems++;
      }
      this.showMaxMessage(h3, input, event);
    });
  }

  showMaxMessage(h3, input, event) {
    if (this._numberOfItems >= 3) {
      h3.hidden = false;
      input.disabled = true;
      event.target.parentElement.disabled = true;
    } else {
      h3.hidden = true;
      input.disabled = false;
      event.target.parentElement.disabled = false;
    }
  }
  
  _getItemHtml(text) {
    return `
      <li data-element="todo-item">
        <i class="material-icons checkbox">check_box_outline_blank</i>
        <input type="checkbox" data-element="performed-todo-action"
               id="item_text" hidden>
        <label for="item_text">${ text }</label>
        <button><i class="material-icons edit">edit</i></button>
        <button><i class="material-icons delete">delete</i></button>
      </li>
    `;
  }

  _render() {
    this._element.innerHTML = `
      <h1 class="heading"><span>Todo</span> Cat List</h1>
      <h3 class="heading-max" data-element="todo-max" hidden>Maximum item per list are created</h3>
      <div class="wrapper">
        <label for="newAction"></label>
        <input type="text" placeholder="Add new action"
               data-element="new-todo-action" id="newAction">
        <button data-element="add-todo-action">
          <i class="material-icons">add_box</i>
        </button>
      </div>
      <div class="line"></div>
      <ul data-element="todo-list">
        
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
  element: rootNode
};

const todoApp = new TodoApp(config);