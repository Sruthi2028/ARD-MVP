// Load Google Charts
google.charts.load('current', { packages: ['corechart'] });

function calculateARD() {

  // Read inputs
  let plannedYear = Number(document.getElementById("plannedYear").value);
  let actualYear = Number(document.getElementById("actualYear").value);
  let plannedCost = Number(document.getElementById("plannedCost").value);
  let actualCost = Number(document.getElementById("actualCost").value);
  let scopeDrift = Number(document.getElementById("scope").value);
  let impactDrift = Number(document.getElementById("impact").value);

  // ---- TIME DRIFT ----
  let timeDiff = actualYear - plannedYear;
  let timeDrift =
    timeDiff <= 0 ? 0 :
    timeDiff <= 2 ? 25 :
    timeDiff <= 4 ? 50 : 75;

  // ---- COST DRIFT ----
  let costPercent = (actualCost - plannedCost) / plannedCost;
  let costDrift =
    costPercent <= 0.1 ? 10 :
    costPercent <= 0.3 ? 30 :
    costPercent <= 0.6 ? 60 : 80;

  // ---- FINAL ARD SCORE ----
  let ardScore = Math.round(
    (timeDrift + costDrift + scopeDrift + impactDrift) / 4
  );

  // ---- STATUS ----
  let status = "Low Drift";
  let cls = "low";

  if (ardScore >= 70) {
    status = "High Drift ⚠️";
    cls = "high";
  } else if (ardScore >= 40) {
    status = "Moderate Drift";
    cls = "moderate";
  }

  // ---- DISPLAY RESULT ----
  document.getElementById("result").innerHTML = `
    <h2>ARD Score: ${ardScore} / 100</h2>
    <p>Status: <b class="${cls}">${status}</b></p>
  `;

  // Draw chart
  drawChart(timeDrift, costDrift, scopeDrift, impactDrift);
}

// -------- COLORED CHART --------
function drawChart(time, cost, scope, impact) {

  let data = google.visualization.arrayToDataTable([
    ["Drift Type", "Score", { role: "style" }],
    ["Time Drift", time, "#2563eb"],     // Blue
    ["Cost Drift", cost, "#f59e0b"],     // Orange
    ["Scope Drift", scope, "#7c3aed"],   // Purple
    ["Impact Drift", impact, "#dc2626"]  // Red
  ]);

  let options = {
    title: "Administrative Reality Drift Breakdown",
    legend: "none",
    backgroundColor: "transparent",
    vAxis: {
      minValue: 0,
      maxValue: 100
    }
  };

  let chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);
}
