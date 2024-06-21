// function to handle the login form submission
const loginFormHandler = async (event) => {
  event.preventDefault();

  // get the values of username and password input
  const username = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(username, password);

  // check if both username and password are provided
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name: username, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if the response is ok, redirect to home page
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
      console.log(username, password);
    }
  }
};

// function to handle signup form
const signupFormHandler = async (event) => {
  event.preventDefault();

  // get the values of username and password input
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.log(username, password);

  // check if both username and password are provided
  if (username && password) {
    const response = await fetch('/api/users/signUp', {
      method: 'POST',
      body: JSON.stringify({ name: username, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if response is ok , redirect to home page
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// event listeners to the login and signup forms
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
