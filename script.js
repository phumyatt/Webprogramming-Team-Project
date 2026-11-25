
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar a");

  const authPanel = document.getElementById("authPanel");
  const dashboard = document.getElementById("dashboard");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  const loginMessage = document.getElementById("loginMessage");
  const registerMessage = document.getElementById("registerMessage");

  const usersKey = "thaitaste_demo_users";
  const sessionKey = "thaitaste_demo_session";

  function getUsers() {
    return JSON.parse(localStorage.getItem(usersKey) || "[]");
  }

  async function hashPassword(password) {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error("Secure password hashing is unavailable. Open the project using localhost.");
    }

    const data = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hash))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function showLogin() {
    loginForm.hidden = false;
    registerForm.hidden = true;

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    loginMessage.textContent = "";
    registerMessage.textContent = "";
  }

  function showRegister() {
    loginForm.hidden = true;
    registerForm.hidden = false;

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    loginMessage.textContent = "";
    registerMessage.textContent = "";
  }

  function showDashboard(user) {
    authPanel.hidden = true;
    dashboard.hidden = false;

    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;

    document.getElementById("accountNav").textContent = "My Account";
  }

  function showAuth() {
    authPanel.hidden = false;
    dashboard.hidden = true;

    document.getElementById("accountNav").textContent = "Account";

    showLogin();
  }

  loginTab.addEventListener("click", showLogin);
  registerTab.addEventListener("click", showRegister);

  registerForm.addEventListener("submit", async event => {
    event.preventDefault();

    registerMessage.textContent = "";

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name) {
      registerMessage.textContent = "Please enter your name.";
      return;
    }

    if (password.length < 8) {
      registerMessage.textContent = "Password must contain at least 8 characters.";
      return;
    }

    if (password !== confirmPassword) {
      registerMessage.textContent = "Passwords do not match.";
      return;
    }

    const users = getUsers();

    if (users.some(user => user.email === email)) {
      registerMessage.textContent = "This email is already registered.";
      return;
    }

    try {
      const passwordHash = await hashPassword(password);

      const newUser = {
        name,
        email,
        passwordHash
      };

      users.push(newUser);

      localStorage.setItem(usersKey, JSON.stringify(users));
      sessionStorage.setItem(sessionKey, email);

      registerForm.reset();
      showDashboard(newUser);
    } catch (error) {
      registerMessage.textContent = error.message;
    }
  });

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    loginMessage.textContent = "";

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    try {
      const passwordHash = await hashPassword(password);
      const users = getUsers();

      const user = users.find(item =>
        item.email === email && item.passwordHash === passwordHash
      );

      if (!user) {
        loginMessage.textContent = "Incorrect email or password.";
        return;
      }

      sessionStorage.setItem(sessionKey, user.email);
      loginForm.reset();

      showDashboard(user);
    } catch (error) {
      loginMessage.textContent = error.message;
    }
  });

  document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem(sessionKey);
    showAuth();
  });

  const currentEmail = sessionStorage.getItem(sessionKey);

  if (currentEmail) {
    const user = getUsers().find(item => item.email === currentEmail);

    if (user) {
      showDashboard(user);
    } else {
      sessionStorage.removeItem(sessionKey);
      showAuth();
    }
  } else {
    showAuth();
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
});