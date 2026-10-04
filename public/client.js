const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
const resultMsg = document.getElementById('resultMsg');

// validation
function validate(email, password) {
  if (!email || !password) {
    return 'Email and password are required.';
  }
  if (!email.includes('@')) {
    return 'Please enter a valid email address.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  return null;
}

// submit button
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMsg.textContent = ''; // prevents injected scripts
  resultMsg.textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // error handling
  const clientError = validate(email, password);
  if (clientError) {
    errorMsg.textContent = clientError;
    return;
  }

  // API
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.message || 'Login failed.';
      return;
    }

    resultMsg.textContent = data.message;
  } catch (err) {
    errorMsg.textContent = 'Could not reach server.';
  }
});
