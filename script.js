google.charts.load('current', { packages: ['corechart'] });

function calculateARD() {

  let plannedYear = Number(document.getElementById("plannedYear").value);
  let actualYear = Number(document.getElementById("actualYear").value);
  let plannedCost = Number(document.getElementById("plannedCost").value);
  let actualCost = Number(document.getElementById("actualCost").value);
  let scopeDrift = Number(document.getElementById("scope").value);
  let impactDrift = Number(document.getElementById("impact").value);

  // Time Drift
  let timeDiff = actualYear - plannedYear;
  let timeDrift =
    timeDiff <= 0 ? 0 :
    timeDiff <= 2 ? 25 :
    timeDiff <= 4 ? 50 : 75;

  // Cost Drift
  let costPercent = (actualCost - plannedCost) / plannedCost;
  let costDrift = 0;

  if (costPercent <= 0) costDrift = 0;
  else if (costPercent <= 0.1) costDrift = 10;
  else if (costPercent <= 0.3) costDrift = 30;
  else if (costPercent <= 0.6) costDrift = 60;
  else costDrift = 80;

  // Final ARD Score
  let ardScore = Math.round(
    (timeDrift + costDrift + scopeDrift + impactDrift) / 4
  );

  // Status + Interpretation
  let status = "";
  let interpretation = "";
  let cls = "";

  if (ardScore <= 20) {
    status = "Low Drift";
    interpretation = "Strong administration";
    cls = "low";
  } else if (ardScore <= 40) {
    status = "Low Drift";
    interpretation = "Minor execution gaps";
    cls = "low";
  } else if (ardScore <= 60) {
    status = "Moderate Drift";
    interpretation = "Moderate drift detected";
    cls = "moderate";
  } else if (ardScore <= 80) {
    status = "High Drift";
    interpretation = "High administrative drift";
    cls = "high";
  } else {
    status = "Critical Drift ⚠️";
    interpretation = "Administrative failure";
    cls = "high";
  }

  document.getElementById("result").innerHTML = `
    <h2>ARD Score: ${ardScore} / 100</h2>
    <p>Status: <b class="${cls}">${status}</b></p>
    <p class="interpretation"><b>Interpretation:</b> ${interpretation}</p>
  `;

  drawChart(timeDrift, costDrift, scopeDrift, impactDrift);
}

function drawChart(time, cost, scope, impact) {

  let data = google.visualization.arrayToDataTable([
    ["Drift Type", "Score", { role: "style" }],
    ["Time Drift", time, "#2563eb"],
    ["Cost Drift", cost, "#f59e0b"],
    ["Scope Drift", scope, "#7c3aed"],
    ["Impact Drift", impact, "#dc2626"]
  ]);

  let options = {
    title: "Administrative Reality Drift Breakdown",
    legend: "none",
    backgroundColor: "transparent",
    vAxis: { minValue: 0, maxValue: 100 }
  };

  let chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}
