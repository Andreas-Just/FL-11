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

const findElement = (selectorElement, searchArea) => {
  return searchArea.querySelector(`${selectorElement}`);
};

const findAllElements = (selectorElement, searchArea) => {
  return searchArea.querySelectorAll(`${selectorElement}`);
};

findElement('#header', document).classList.remove('header--nojs');

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

on('click', '.header__wrapper', (event) => {
  if (!event.target.closest('.header__toggle')) return;

  const div = event.target.parentElement;

  if (div.classList.contains('header__wrapper--closed')) {
    div.classList.remove('header__wrapper--closed');
    div.classList.add('header__wrapper--opened');
  } else {
    div.classList.add('header__wrapper--closed');
    div.classList.remove('header__wrapper--opened');
  }
  console.log(div);
});

/*
on('click', '.homework__github', (event) => {
  event.preventDefault();
  const link = document.getElementsByTagName("link");
  console.log(link);
});
*/
