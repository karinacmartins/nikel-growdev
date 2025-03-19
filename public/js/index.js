const myModal = new bootstrap.Modal("#register-modal");
let loged = sessionStorage.getItem("loged");
const session = localStorage.getItem("session");

checkLoged();

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const session = document.getElementById("session-check").checked;

  const account = getAccount(email);

  if (!account) {
    alert("Usuário ou senha inválido.");
    return;
  }

  if (account) {
    if (account.password !== password) {
      alert("Usuário ou senha inválido.");
      return;
    }

    saveSession(email, session);
    sessionStorage.setItem("name", account.name);

    window.location.href = "home.html";
  }
});


document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();


  const name = document.getElementById("create-name-input").value;
  const email = document.getElementById("create-e-mail-input").value;
  const password = document.getElementById("password-create-input").value;

  if (email.length < 5) {
    alert("Cadastre um e-mail válido.");
    return;
  }

  if (password.length < 4) {
    alert("A senha deve ter no mínimo 4 caracteres.");
    return;
  }

  saveAccount({
    name: name,
    login: email,
    password: password,
    transactions: [],
  });

  myModal.hide();

  alert("Conta criada com sucesso!");
});

function checkLoged() {
  if(session) {
    sessionStorage.setItem("loged", session);
    loged = session;
  }
  if (loged) {
    saveSession(loged, session);
    window.location.href = "home.html";
  }
}

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("loged", data);
}

function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}
