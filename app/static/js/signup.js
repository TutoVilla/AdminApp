var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm_password");
var passwordmsg = document.getElementById("passwordmsg");

confirm_password.addEventListener("input", () => {
  if (password.value !== confirm_password.value) {
    passwordmsg.textContent = "Passwords Don't Match";
  } else {
    passwordmsg.textContent = "";
  }
});

password.addEventListener("input",() => {
    if (password.value !== confirm_password.value) {
      passwordmsg.textContent = "Passwords Don't Match";
    } else {
      passwordmsg.textContent = "";
    }
  });