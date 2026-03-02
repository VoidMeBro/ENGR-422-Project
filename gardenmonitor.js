
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


const ctx = document.getElementById("growthChart");

const growthChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["6AM","8AM","10AM","12PM","2PM","4PM","6PM"],
    datasets: [{
      label: "Soil Moisture",
      data: [55, 60, 58, 65, 63, 70, 68],
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.2)",
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    animation: {
      duration: 2000
    },
    plugins: {
      legend: { display: false }
    }
  }
});


setInterval(() => {
  const moisture = Math.floor(Math.random() * 20) + 55;
  const temp = Math.floor(Math.random() * 5) + 22;
  const sun = Math.floor(Math.random() * 4) + 6;

  document.getElementById("moistureValue").innerText = moisture + "%";
  document.getElementById("tempValue").innerText = temp + "°C";
  document.getElementById("sunValue").innerText = sun + "h";

  document.getElementById("moistureBar").style.width = moisture + "%";
  document.getElementById("tempBar").style.width = (temp * 3) + "%";
  document.getElementById("sunBar").style.width = (sun * 10) + "%";

}, 4000);
