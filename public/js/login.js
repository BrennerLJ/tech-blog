// handle login form submission
const loginFormHandler = async (event) => {
  event.preventDefault();

  // get the username and password input
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(username, password);

  // check if username and password are provided
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: password }),
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

  const email = document.querySelector('#email-signup').value.trim();
  const name = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.log(username, password);

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
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
