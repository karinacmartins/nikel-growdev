const myModal = new bootstrap.Modal("#transaction-modal");
let loged = sessionStorage.getItem("loged");
const session = localStorage.getItem("session");

let data = {
  transactions: [],
};

document.getElementById("button-logout").addEventListener("click", logout);
document
  .getElementById("button-transaction")
  .addEventListener("click", function () {
    window.location.href = "transaction.html";
  });

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
    const value = parseFloat(document.getElementById("value-input").value) || 0;
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

    getCashIn();
    getCashOut();
    getTotal();

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
  } else {
    data = { transactions: [] };
  }

  getCashIn();
  getCashOut();
  getTotal();
}

function logout() {
  sessionStorage.removeItem("loged");
  localStorage.removeItem("session");
  window.location.href = "index.html";
}

function getCashIn() {
  const transactions = data.transactions;

  let cashIn = transactions.filter((item) => item.type === "1");

  cashIn.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (cashIn.length) {
    let cashInHtml = ``;
    let limit = cashIn.length > 5 ? 5 : cashIn.length;

    for (let index = 0; index < limit; index++) {
      cashInHtml += `
          <div class="row mb-4">
              <div class="col-12">
                  <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                  <div class="container p-0">
                      <div class="row">
                          <div class="col-12 col-md-8">
                              <p>${cashIn[index].description}</p>
                          </div>
                          <div class="col-12 col-md-3 d-flex justify-content-end">
                              <p>${cashIn[index].date}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`;
    }

    document.getElementById("cash-in-list").innerHTML = cashInHtml;
  }
}

function getCashOut() {
  const transactions = data.transactions;

  let cashOut = transactions.filter((item) => item.type === "2");

  cashOut.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (cashOut.length) {
    let cashOutHtml = ``;
    let limit = cashOut.length > 5 ? 5 : cashOut.length;

    for (let index = 0; index < limit; index++) {
      cashOutHtml += `
          <div class="row mb-4">
              <div class="col-12">
                  <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)}</h3>
                  <div class="container p-0">
                      <div class="row">
                          <div class="col-12 col-md-8">
                              <p>${cashOut[index].description}</p>
                          </div>
                          <div class="col-12 col-md-3 d-flex justify-content-end">
                              <p>${cashOut[index].date}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`;
    }

    document.getElementById("cash-out-list").innerHTML = cashOutHtml;
  }
}

function getTotal() {
  const transactions = data.transactions;
  let total = 0;

  transactions.forEach((item) => {
    if (item.type === "1") {
      total += item.value;
    } else {
      total -= item.value;
    }
  });

  document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

function saveData() {
  localStorage.setItem(data.login, JSON.stringify(data));
}
