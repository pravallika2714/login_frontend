const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const forgotForm = document.getElementById('forgotForm');
const loginError = document.getElementById('loginError');
const signupError = document.getElementById('signupError');
const forgotError = document.getElementById('forgotError');
const formTitle = document.getElementById('formTitle');
const formContainer = document.getElementById('formContainer');
const dashboard = document.getElementById('dashboard');

function toggleForm(form) {
  loginForm.style.display = form === 'login' ? 'block' : 'none';
  signupForm.style.display = form === 'signup' ? 'block' : 'none';
  forgotForm.style.display = form === 'forgot' ? 'block' : 'none';
  formTitle.textContent = form === 'signup' ? 'Create Account' :
                          form === 'forgot' ? 'Recover Password' :
                          'Personal Book App';
}

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;

  const stored = JSON.parse(localStorage.getItem(user));
  if (stored && stored.password === pass) {
    showDashboard();
  } else {
    loginError.style.display = 'block';
    setTimeout(() => loginError.style.display = 'none', 3000);
  }
});

signupForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('newUser').value;
  const email = document.getElementById('newEmail').value;
  const pass = document.getElementById('newPass').value;
  const confirm = document.getElementById('confirmPass').value;

  if (pass !== confirm || localStorage.getItem(user)) {
    signupError.style.display = 'block';
    setTimeout(() => signupError.style.display = 'none', 3000);
    return;
  }

  localStorage.setItem(user, JSON.stringify({ email, password: pass }));
  alert('🎉 Signup successful! Please log in.');
  toggleForm('login');
});

forgotForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('forgotUser').value;
  const stored = JSON.parse(localStorage.getItem(user));
  if (stored) {
    alert(`📩 Password for "${user}" is: ${stored.password}`);
    toggleForm('login');
  } else {
    forgotError.style.display = 'block';
    setTimeout(() => forgotError.style.display = 'none', 3000);
  }
});

function showDashboard() {
  formContainer.style.display = 'none';
  dashboard.style.display = 'block';
}

function logout() {
  dashboard.style.display = 'none';
  formContainer.style.display = 'block';
  toggleForm('login');
}
