const myModal = new bootstrap.Modal("#transaction-modal");
let loged = sessionStorage.getItem("loged");
const session = localStorage.getItem("session");
let data = {
  transactions: [],
};

document.getElementById("button-logout").addEventListener("click", logout);

document.addEventListener("DOMContentLoaded", function () {
  const name = sessionStorage.getItem("name");
  if (name) {
    document.getElementById("user-name").innerText = `Olá ${name},`;
  }
});

document
  .getElementById("transaction-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const description = document.getElementById("description-input").value;
    const value = parseFloat(document.getElementById("value-input").value);

    const date = document.getElementById("date-input").value;
    const type = document.querySelector(
      'input[name="type-input"]:checked'
    ).value;

    data.transactions.unshift({
      description: description,
      value: value,
      date: date,
      type: type,
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Transação cadastrada com sucesso!");
  });

checkLoged();

function checkLoged() {
  if (session) {
    sessionStorage.setItem("loged", session);
    loged = session;
  }
  if (!loged) {
    window.location.href = "index.html";
    return;
  }
  const dataUser = localStorage.getItem(loged);
  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  getTransactions();
}

function logout() {
  sessionStorage.removeItem("loged");
  localStorage.removeItem("session");
  window.location.href = "index.html";
}

function getTransactions() {
  const transactions = data.transactions;
  let transactionsHtml = ``;

  if (transactions.length) {
    transactions.forEach((item, index) => {
      let type = "Entrada";
      if (item.type === "2") {
        type = "Saída";
      }

      transactionsHtml += `
          <tr>
            <td>${item.date}</td>
            <td>${item.value.toFixed(2)}</td>
            <td>${type}</td>
            <td>${item.description}</td>
            <td><button class="btn delete-btn" data-index="${index}"><i class="bi bi-trash"></i></button></td>
          </tr>
        `;
    });
  }

  document.getElementById("transaction-list").innerHTML = transactionsHtml;

  
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index');  

      
      if (confirm("Você tem certeza que deseja excluir esta transação?")) {
        deleteTransaction(index); 
      }
    });
  });
}


function deleteTransaction(index) {
  
  data.transactions.splice(index, 1);  
  
  saveData(data);  
  getTransactions();

  alert("Transação excluída com sucesso!");
}

function saveData() {
  localStorage.setItem(data.login, JSON.stringify(data));
}
