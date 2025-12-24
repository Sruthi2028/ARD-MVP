function calculateARD() {
  const planned = Number(document.getElementById("planned").value);
  const actual = Number(document.getElementById("actual").value);

  if (!planned || !actual || planned <= 0) {
    alert("Please enter valid Planned and Actual values");
    return;
  }

  // ARD formula
  const ard = Math.abs(planned - actual) / planned * 100;
  const ardValue = ard.toFixed(2);

  // Effectiveness (inverse of ARD)
  const effectiveness = Math.max(0, 100 - ard);

  document.getElementById("score").innerText =
    "ARD: " + ardValue + "%";

  document.getElementById("progress").style.width =
    effectiveness + "%";

  let statusText = "";

  if (ard <= 20)
    statusText = "Low Administrative Drift (Highly Effective)";
  else if (ard <= 40)
    statusText = "Moderate Administrative Drift";
  else
    statusText = "High Administrative Drift";

  document.getElementById("status").innerText =
    "Status: " + statusText;
}
