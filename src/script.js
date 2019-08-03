'use strict';

const on = (eventName, classElementName, callback) => {
  this.addEventListener(eventName, (event) => {
    const newItemTextElement = event.target.closest(
      `${classElementName}`
    );
    if (!newItemTextElement) {
      return;
    }
    callback(event);
  });
};

const findElement = (classElement, searchArea) => {
  return searchArea.querySelector(`${classElement}`);
};

const findAllElements = (classElement, searchArea) => {
  return searchArea.querySelectorAll(`${classElement}`);
};

// const nav = findElement('.header__nav', document);
on('click', '.header__item', (event) => {
  const li = event.target.parentElement;
  const liArr = findAllElements('.header__item', document);
  liArr.forEach(item => {
    if (item !== li) {
      item.classList.remove('open');
    }
  });
  if (li.classList.contains('open')) {
    li.classList.remove('open');
  } else {
    li.classList.add('open');
  }
});