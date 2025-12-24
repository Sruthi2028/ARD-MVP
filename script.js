function calculateARD() {
  let policy = Number(document.getElementById("policy").value);
  let approval = Number(document.getElementById("approval").value);
  let infra = Number(document.getElementById("infra").value);
  let budget = Number(document.getElementById("budget").value);
  let coordination = Number(document.getElementById("coordination").value);

  let ard = Math.round(
    (policy + approval + infra + budget + coordination) / 5
  );

  document.getElementById("score").innerText = ard;

  let statusText = "";
  let color = "";

  if (ard <= 20) {
    statusText = "Strong Administration";
    color = "green";
  } else if (ard <= 40) {
    statusText = "Minor Execution Gaps";
    color = "limegreen";
  } else if (ard <= 60) {
    statusText = "Moderate Administrative Drift";
    color = "orange";
  } else if (ard <= 80) {
    statusText = "High Administrative Drift";
    color = "orangered";
  } else {
    statusText = "Administrative Failure";
    color = "red";
  }

  document.getElementById("status").innerText = statusText;
  document.getElementById("status").style.color = color;

  let bar = document.getElementById("progressBar");
  bar.style.width = ard + "%";
  bar.style.background = color;
}
