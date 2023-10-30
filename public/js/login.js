document.addEventListener('DOMContentLoaded', function() {
  const loginCard = document.getElementById('loginCard');
  const signupCard = document.getElementById('signupCard');
  const showSignup = document.getElementById('showSignup');
  const showLogin = document.getElementById('showLogin');

  showSignup.addEventListener('click', function(e) {
      e.preventDefault();
      loginCard.style.display = 'none';
      signupCard.style.display = 'block';
  });

  showLogin.addEventListener('click', function(e) {
      e.preventDefault();
      signupCard.style.display = 'none';
      loginCard.style.display = 'block';
  });
});


const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  