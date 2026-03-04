const toggleBtn = document.getElementById("darkToggle");
const html = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem("theme",
    html.classList.contains("dark") ? "dark" : "light"
  );
});

const ctxChart = document.getElementById("chartCanvas");

const chartData = {
  moisture: [55, 60, 58, 65, 63, 70, 68], // %
  ec: [1.2, 1.3, 1.1, 1.4, 1.3, 1.5, 1.4], // mS/cm
  humidity: [45, 50, 55, 60, 58, 62, 61] //%
};

const chartLabels = ["6AM","8AM","10AM","12PM","2PM","4PM","6PM"];

let growthChart = new Chart(ctxChart, {
  type: "line",
  data: {
    labels: chartLabels,
    datasets: [{
      label: "Soil Moisture",
      data: chartData.moisture,
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.2)",
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    animation: { duration: 1500 },
    plugins: { legend: { display: false } }
  }
});

const tabButtons = document.querySelectorAll(".chart-tab-btn");
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
  
    tabButtons.forEach(b => b.classList.remove("bg-green-500", "text-white"));
    tabButtons.forEach(b => b.classList.add("bg-gray-200", "text-gray-800", "dark:bg-gray-700", "dark:text-white"));
    btn.classList.add("bg-green-500", "text-white");
    btn.classList.remove("bg-gray-200", "text-gray-800", "dark:bg-gray-700", "dark:text-white");

    const selected = btn.getAttribute("data-chart");

    let datasetLabel = "";
    let bgColor = "";
    let borderColor = "";
    if (selected === "moisture") {
      growthChart.data.datasets[0].data = chartData.moisture;
      datasetLabel = "Soil Moisture (%)";
      bgColor = "rgba(34,197,94,0.2)";
      borderColor = "#22c55e";
    } else if (selected === "ec") {
      growthChart.data.datasets[0].data = chartData.ec;
      datasetLabel = "Electroconductivity (mS/cm)";
      bgColor = "rgba(59,130,246,0.2)";
      borderColor = "#3b82f6";
    } else if (selected === "humidity") {
      growthChart.data.datasets[0].data = chartData.humidity;
      datasetLabel = "Humidity (%)";
      bgColor = "rgba(14,165,233,0.2)";
      borderColor = "#0ea5e9";
    }

    growthChart.data.datasets[0].label = datasetLabel;
    growthChart.data.datasets[0].backgroundColor = bgColor;
    growthChart.data.datasets[0].borderColor = borderColor;
    growthChart.update();
  });
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const searchValue = this.value.toLowerCase().trim();
  let matchFound = false;
  
  const searchableItems = document.querySelectorAll(".searchable-item");
  
  searchableItems.forEach(item => {
    const text = item.innerText.toLowerCase();

    if (text.includes(searchValue)) {
      item.style.display = ""; 
      item.style.opacity = "1";
      matchFound = true;
    } else {
      item.style.display = "none";
    }
  });

  
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach(alert => {
    const text = alert.innerText.toLowerCase();
    if (text.includes(searchValue)) {
      alert.style.display = "";
      matchFound = true;
    } else {
      alert.style.display = "none";
    }
  });
  
  const existingMessage = document.getElementById("noResults");
  if (!matchFound && searchValue !== "") {
    if (!existingMessage) {
      const message = document.createElement("p");
      message.id = "noResults";
      message.innerText = "No plants or alerts found 🌱";
      message.style.marginTop = "20px";
      message.style.color = "gray";
      document.querySelector("main").appendChild(message);
    }
  } else {
    if (existingMessage) existingMessage.remove();
  }
});

const addPlantBtn = document.getElementById("addPlantBtn");
const addPlantModal = document.getElementById("addPlantModal");
const modalClose = document.getElementById("modalClose");
const modalCancel = document.getElementById("modalCancel");
const modalAdd = document.getElementById("modalAdd");
const modalPlantName = document.getElementById("modalPlantName");
const modalPlantDesc = document.getElementById("modalPlantDesc");
const plantsContainer = document.getElementById("plantsContainer");

addPlantBtn.addEventListener("click", () => {
  modalPlantName.value = "";
  modalPlantDesc.value = "";
  addPlantModal.classList.remove("hidden");
});

modalClose.addEventListener("click", () => addPlantModal.classList.add("hidden"));
modalCancel.addEventListener("click", () => addPlantModal.classList.add("hidden"));

modalAdd.addEventListener("click", () => {
  const name = modalPlantName.value.trim();
  const desc = modalPlantDesc.value.trim();
  if (!name) return alert("Please enter a plant name.");

  const newPlant = document.createElement("div");
  newPlant.className = "stat-card plant-item searchable-item relative";

  newPlant.innerHTML = `
    <h3 class="font-bold text-lg">🌱 ${name}</h3>
    <p>${desc}</p>
    <button class="delete-btn absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">✖</button>
  `;

  plantsContainer.appendChild(newPlant);
  updateActivePlants();

  newPlant.querySelector(".delete-btn").onclick = function () {
  newPlant.remove();
  updateActivePlants(); 
};

  addPlantModal.classList.add("hidden");
});

const activePlantsValue = document.getElementById("activePlantsCount");

function updateActivePlants() {
  const totalPlants = plantsContainer.querySelectorAll(".plant-item").length;
  activePlantsValue.innerText = totalPlants;
}

updateActivePlants();

function setupDeleteButtons() {
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach(btn => {
    btn.onclick = function () {
      this.parentElement.remove();
      updateActivePlants(); 
    }
  });
}

setupDeleteButtons();

const yearSpan = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
yearSpan.innerText = currentYear;

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const rightSidebar = document.getElementById("rightSidebar");
  const sidebarClose = document.getElementById("sidebarClose");

  menuToggle.addEventListener("click", () => {
    rightSidebar.classList.remove("translate-x-full");
    rightSidebar.classList.add("translate-x-0");
  });

  sidebarClose.addEventListener("click", () => {
    rightSidebar.classList.add("translate-x-full");
    rightSidebar.classList.remove("translate-x-0");
  });

  document.addEventListener("click", (e) => {
    if (!rightSidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      rightSidebar.classList.add("translate-x-full");
      rightSidebar.classList.remove("translate-x-0");
    }
  });
});
