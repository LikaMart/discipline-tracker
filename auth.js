// რეგისტრაცია
function register() {
  let username = document.getElementById("reg-username").value;
  let password = document.getElementById("reg-password").value;

  if (username && password) {
    localStorage.setItem("user_" + username, password);
    alert("რეგისტრაცია წარმატებით დასრულდა!");
    window.location.href = "login.html";
  } else {
    alert("გთხოვ, შეავსე ყველა ველი!");
  }
}

// შესვლა
function login() {
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;

  let savedPassword = localStorage.getItem("user_" + username);

  if (savedPassword && savedPassword === password) {
    alert("შესვლა წარმატებით შესრულდა!");
    localStorage.setItem("loggedInUser", username);
    window.location.href = "index.html"; // გადადის მთავარ tracker-ზე
  } else {
    alert("მომხმარებელი ან პაროლი არასწორია!");
  }
}