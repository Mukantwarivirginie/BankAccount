// business logic

var banks = [];


var Bank = function(inputtedName, inputtedPinNumber, initialDeposit) {
  this.name = inputtedName;
  this.pinNumber = inputtedPinNumber;
  this.balance = initialDeposit;
  this.accountNumber = Math.floor(100000 + Math.random() * 900000);
}

// banks[masterAccount] = new Bank("Master", "1111", "0" );


Bank.prototype.withdraw = function(amount) {
  if (amount === "all") {
    this.balance = 0;
  } else if (this.balance > parseFloat(amount)) {
    this.balance -= parseFloat(amount);
  } else {
    alert("I'm sorry, your balance of " + this.balance + " is less than the withdrawal of " + amount);
  }
}


Bank.prototype.deposit = function(amount) {
  this.balance += parseFloat(amount);
}

var returnTotal = function() {
  var final = 0;
  for (i = 0; i < banks.length; i++) {
    final += banks[i].balance;
  }
  console.log(final);
}

var clearFields = function() {
  $('#initName').val('');
  $('#initPin').val('');
  $('#initDep').val('');
  $('#accountNumber').val('');
  $('#pin').val('');
  $('#amount').val('');
}

var clearAll = function() {
  clearFields();
  $('#output').text('');
}


// user logic
$(document).ready(function() {
  //New Account Form
  $('button#newAcct').click(function() {
    var inputName = $('#initName').val();
    var inputPin = $('#initPin').val();
    var inputDep = parseFloat($('#initDep').val());

    if (inputName !== "" && inputPin.length === 4 && inputDep >= 50) {
      var newBank = new Bank(inputName, inputPin, inputDep);

      banks.push(newBank);
      $("#output").text("");
      $("#output").append("Thanks " + newBank.name + ". Your new bank account number is account#" + newBank.accountNumber + ". It has a initial deposit of $" + newBank.balance + ".<br>");

    } else {
      alert("Please input proper information to start an account.");
    }
    clearFields();
  });
  //Make a transaction Form
  $('button#trans').click(function() {
    var accountNumber = $('#accountNumber').val();
    var pin = $('#pin').val();
    var amount = $('#amount').val();
    if (accountNumber.length === 6 && pin.length === 4 && amount !== "") {
        var found = 0;
        var index;
        for (var i = 0; i < banks.length; i ++) {
          if (banks[i].accountNumber === parseInt(accountNumber)) {
            if (banks[i].pinNumber === pin) {
              if ($("select#type").val() === "Withdraw") {
                banks[i].withdraw(amount);
                found = 1;
                index = i;
              } else if ($("select#type").val() === "Deposit") {
                banks[i].deposit(amount);
                found = 2;
                index = i;
              } else if ($("select#type").val() === "Balance") {
                found = 3;
                index = i;
              }
            }
          }
        }
        if (found === 0) {
            alert("Cannot find your account or invalid pin number");
        } else if (found === 1) {
          $("#output").append("Thanks using Epicodus Bank. You withdrew " + amount + " from bank account#" + banks[index].accountNumber + ". Your remaining balance is $" + banks[index].balance + ".<br>");
        } else if (found === 2) {
          $("#output").append("Thanks using Epicodus Bank. You deposited " + amount + " to bank account#" + banks[index].accountNumber + ". Your balance is $" + banks[index].balance + ".<br>");
        } else if (found === 3) {
          $("#output").append("Thanks using Epicodus Bank. Your balance is  $" + banks[index].balance + ".<br>");
        } else {
          alert("Please input proper information to make a transaction.");
        }
        clearFields();
        }
      });
  
      $('button#clearAll').click(function() {
        clearAll();
      });
  
    });
  
