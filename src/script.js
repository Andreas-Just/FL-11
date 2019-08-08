'use strict';
// const URL = '../FL11_HW3/homework/index.html';

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

on('click', '.header__item', (event) => {
  if (event.target.className === 'header__link') {
    event.preventDefault();
  }
  const li = event.target.parentElement;
  const liArr = findAllElements('.header__item', document);
  liArr.forEach(item => {
    if (item !== li) {
      item.classList.remove('open');
    }
  });
  if (!li.classList.contains('open') && li.children.length > 1) {
    li.classList.add('open');
  } else {
    li.classList.remove('open');
  }
});

/*
on('click', '.homework__github', (event) => {
  event.preventDefault();
  const link = document.getElementsByTagName("link");
  console.log(link);
});
*/
