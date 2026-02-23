// რეგისტრაცია
function register() {
  let username = document.getElementById("reg-username").value.trim();
  let password = document.getElementById("reg-password").value.trim();

  if (username && password) {
    // მარტივი hash (base64) — უკეთესია ვიდრე პირდაპირი ტექსტი
    let hashedPassword = btoa(password);
    localStorage.setItem("user_" + username, hashedPassword);

    Swal.fire({
      title: "რეგისტრაცია წარმატებულია 🎉",
      text: "შესვლა შეგიძლია login გვერდზე",
      icon: "success",
      confirmButtonText: "კარგი"
    }).then(() => {
      window.location.href = "login.html";
    });
  } else {
    Swal.fire({
      title: "გთხოვ, შეავსე ყველა ველი!",
      icon: "warning",
      confirmButtonText: "კარგი"
    });
  }
}

// შესვლა
function login() {
  let username = document.getElementById("login-username").value.trim();
  let password = document.getElementById("login-password").value.trim();

  let savedPassword = localStorage.getItem("user_" + username);

  if (savedPassword && savedPassword === btoa(password)) {
    localStorage.setItem("loggedInUser", username);

    Swal.fire({
      title: "შესვლა წარმატებულია 🎉",
      text: "მოგესალმები " + username,
      icon: "success",
      confirmButtonText: "გაგრძელება"
    }).then(() => {
      window.location.replace("index.html"); // გადადის მთავარ tracker-ზე
    });
  } else {
    Swal.fire({
      title: "შეცდომა ❌",
      text: "მომხმარებელი ან პაროლი არასწორია!",
      icon: "error",
      confirmButtonText: "კარგი"
    });
  }
}