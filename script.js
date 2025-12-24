function calculateARD() {
  const startYear = +document.getElementById("startYear").value;
  const plannedYear = +document.getElementById("plannedYear").value;
  const planned = +document.getElementById("plannedMilestones").value;
  const completed = +document.getElementById("completedMilestones").value;
  const feedback = +document.getElementById("citizenFeedback").value;
  const budgetUsed = +document.getElementById("budgetUsed").value;

  if (!startYear || !plannedYear || !planned || !completed || !feedback || !budgetUsed) {
    alert("Please fill all fields correctly");
    return;
  }

  const currentYear = new Date().getFullYear();

  // Execution %
  const execution = (completed / planned) * 100;

  // Expected progress by time
  const expected =
    ((currentYear - startYear) / (plannedYear - startYear)) * 100;

  // Drift components
  const timeDrift = Math.max(0, expected - execution);
  const budgetDrift = Math.max(0, budgetUsed - execution);
  const sentimentDrift = 100 - feedback;

  const avgDrift = (timeDrift + budgetDrift + sentimentDrift) / 3;

  const ardScore = Math.max(0, Math.min(100, Math.round(100 - avgDrift)));

  animateARD(ardScore);
}

function animateARD(score) {
  const circle = document.querySelector(".progress-circle");
  const value = document.getElementById("ardValue");
  const status = document.getElementById("ardStatus");

  let current = 0;

  const interval = setInterval(() => {
    if (current <= score) {
      value.innerText = current;
      circle.style.background =
        `conic-gradient(#ff4ecd ${current * 3.6}deg, #3f87ff ${current * 3.6}deg, #1a1a2e 0deg)`;
      current++;
    } else {
      clearInterval(interval);
    }
  }, 15);

  if (score < 40)
    status.innerText = "🚨 High Administrative Reality Drift";
  else if (score < 70)
    status.innerText = "⚠️ Moderate Administrative Reality Drift";
  else
    status.innerText = "✅ Healthy Administrative Execution";
}
