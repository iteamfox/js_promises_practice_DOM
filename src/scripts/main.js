'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was resolved'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearInterval(timer);
      resolve('First promise was rejected');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('sucsess');
  div.textContent = message;
  document.body.appendChild(div);
};

const errorHundler = (error) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = error.message;
  document.body.appendChild(div);
};

firstPromise.then(successHandler).catch(errorHundler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler).catch(errorHundler);
