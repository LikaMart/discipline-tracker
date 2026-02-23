// სიგარეტის ქულები
const cigaretteBoxes = document.querySelectorAll("#cigarettes input");
const cigaretteScore = document.getElementById("cigarette-score");
let cigaretteHistory = JSON.parse(localStorage.getItem("cigaretteHistory")) || [];

cigaretteBoxes.forEach((box) => {
  box.addEventListener("change", updateCigaretteScore);
});

function updateCigaretteScore() {
  let checked = document.querySelectorAll("#cigarettes input:checked").length;
  let stars = 5 - checked; // ნაკლები სიგარეტი = მეტი ვარსკვლავი
  cigaretteScore.textContent = "⭐ ქულები: " + stars;
  localStorage.setItem("cigarettes", checked);

  cigaretteHistory.push({ date: new Date().toLocaleDateString(), stars: stars });
  localStorage.setItem("cigaretteHistory", JSON.stringify(cigaretteHistory));
  updateCharts();
}

// წონა
let weightHistory = JSON.parse(localStorage.getItem("weightHistory")) || [];

function saveWeight() {
  let weight = document.getElementById("weight").value;
  if (weight) {
    weightHistory.push({
      date: new Date().toLocaleDateString(),
      value: weight,
    });
    localStorage.setItem("weightHistory", JSON.stringify(weightHistory));
    document.getElementById("weight-log").textContent =
      "შენახული წონა: " + weight + " კგ";
    updateCharts();
  }
}

// ფოტო
function savePhoto() {
  let file = document.getElementById("photo").files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("photo", e.target.result);
      document.getElementById("photo-preview").innerHTML =
        `<img src="${e.target.result}" alt="დღიური ფოტო">`;
    };
    reader.readAsDataURL(file);
  }
}

// საჭმელი
function saveFood() {
  let bread = document.getElementById("bread").checked
    ? "ვჭამე პური"
    : "პური არ მიჭამია";
  let food = document.getElementById("food").value;
  localStorage.setItem("food", bread + " | " + food);
  document.getElementById("food-log").textContent = bread + " | " + food;
}

// ტკბილეული
const sweetBoxes = document.querySelectorAll("#sweets input");
const sweetScore = document.getElementById("sweet-score");
let sweetHistory = JSON.parse(localStorage.getItem("sweetHistory")) || [];

sweetBoxes.forEach((box) => {
  box.addEventListener("change", updateSweetScore);
});

function updateSweetScore() {
  let checked = document.querySelectorAll("#sweets input:checked").length;
  let stars = 5 - checked; // ნაკლები ტკბილეული = მეტი ვარსკვლავი
  sweetScore.textContent = "⭐ ქულები: " + stars;
  localStorage.setItem("sweets", checked);

  sweetHistory.push({ date: new Date().toLocaleDateString(), stars: stars });
  localStorage.setItem("sweetHistory", JSON.stringify(sweetHistory));
  updateCharts();
}

// გრაფიკების განახლება
function updateCharts() {
  new Chart(document.getElementById("weightChart"), {
    type: "line",
    data: {
      labels: weightHistory.map((entry) => entry.date),
      datasets: [
        {
          label: "წონა (კგ)",
          data: weightHistory.map((entry) => entry.value),
          borderColor: "#ff66b2",
          backgroundColor: "#ff99cc",
          fill: true,
        },
      ],
    },
  });

  new Chart(document.getElementById("cigaretteChart"), {
    type: "bar",
    data: {
      labels: cigaretteHistory.map((entry) => entry.date),
      datasets: [
        {
          label: "სიგარეტის ვარსკვლავები",
          data: cigaretteHistory.map((entry) => entry.stars),
          backgroundColor: "#ff66b2",
        },
      ],
    },
  });

  new Chart(document.getElementById("sweetChart"), {
    type: "bar",
    data: {
      labels: sweetHistory.map((entry) => entry.date),
      datasets: [
        {
          label: "ტკბილეულის ვარსკვლავები",
          data: sweetHistory.map((entry) => entry.stars),
          backgroundColor: "#ff99cc",
        },
      ],
    },
  });
}

// დღიური პროგრესი
let currentDay = parseInt(localStorage.getItem("currentDay")) || 0;
let bonusStars = parseInt(localStorage.getItem("bonusStars")) || 0;

function nextDay() {
  currentDay++;
  localStorage.setItem("currentDay", currentDay);
  document.getElementById("day-counter").textContent = "დღე: " + currentDay;

  let cigsChecked = document.querySelectorAll("#cigarettes input:checked").length;
  let sweetsChecked = document.querySelectorAll("#sweets input:checked").length;
  let bread = document.getElementById("bread").checked;
  let weight = document.getElementById("weight").value;

  let success = cigsChecked <= 2 && sweetsChecked <= 2 && !bread && weight;

  if (currentDay % 10 === 0 && success) {
    bonusStars++;
    localStorage.setItem("bonusStars", bonusStars);
    document.getElementById("bonus-stars").textContent =
      "🎁 ბონუს ვარსკვლავები: " + bonusStars;

    Swal.fire({
      title: "გილოცავ! 🎉",
      text: "მიიღე ბონუს ვარსკვლავი!",
      icon: "success",
      confirmButtonText: "კარგი"
    });
  }

  updateProgressBar();
}

function updateProgressBar() {
  let percent = (currentDay / 100);
  document.getElementById("progress-bar").style.width = (percent * 100) + "%";
  document.getElementById("progress-text").textContent =
    currentDay + " / 100 დღე";
}

// ჩატვირთვისას
window.onload = function () {
  // სიგარეტი
  let savedCigs = localStorage.getItem("cigarettes");
  if (savedCigs) {
    cigaretteBoxes.forEach((box, i) => {
      box.checked = i < savedCigs;
    });
    updateCigaretteScore();
  }

  // წონა
  let savedWeight = localStorage.getItem("weight");
  if (savedWeight) {
    document.getElementById("weight-log").textContent =
      "შენახული წონა: " + savedWeight + " კგ";
  }

  // ფოტო
  let savedPhoto = localStorage.getItem("photo");
  if (savedPhoto) {
    document.getElementById("photo-preview").innerHTML =
      `<img src="${savedPhoto}" alt="დღიური ფოტო">`;
  }

  // საჭმელი
  let savedFood = localStorage.getItem("food");
  if (savedFood) {
    document.getElementById("food-log").textContent = savedFood;
  }

  // ტკბილეული
  let savedSweets = localStorage.getItem("sweets");
  if (savedSweets) {
    sweetBoxes.forEach((box, i) => {
      box.checked = i < savedSweets;
    });
    updateSweetScore();
  }

  // დღიური პროგრესი
  document.getElementById("day-counter").textContent = "დღე: " + currentDay;
  document.getElementById("bonus-stars").textContent =
    "🎁 ბონუს ვარსკვლავები: " + bonusStars;

  updateProgressBar();
  updateCharts();
};