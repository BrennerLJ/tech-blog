// handle login form submission
const loginFormHandler = async (event) => {
  event.preventDefault();

  // get the username and password input
  const username = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(username, password);

  // check if username and password are provided
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name: username, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // response is ok, redirect to home page
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
      console.log(username, password);
    }
  }
};

// handle signup
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.log(username, password);

  if (username && password) {
    const response = await fetch('/api/users/signUp', {
      method: 'POST',
      body: JSON.stringify({ name: username, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// event listeners to login and signup forms
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
