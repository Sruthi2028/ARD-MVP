function calculateARD() {
  const planned = document.getElementById("planned").value;
  const actual = document.getElementById("actual").value;

  if (planned === "" || actual === "") {
    alert("Please enter both values");
    return;
  }

  const ardScore = Math.abs(planned - actual);
  const effectiveness = 100 - ardScore;

  document.getElementById("score").innerText =
    "ARD Effectiveness: " + effectiveness + "%";

  document.getElementById("progress").style.width =
    effectiveness + "%";

  let statusText = "";

  if (effectiveness >= 75)
    statusText = "Highly Effective Administration";
  else if (effectiveness >= 50)
    statusText = "Moderately Effective Administration";
  else
    statusText = "High Administrative Drift";

  document.getElementById("status").innerText =
    "Status: " + statusText;
}
