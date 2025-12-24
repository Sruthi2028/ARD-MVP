const policy = 70;
const publicResp = 55;
const economic = 65;

document.getElementById("policy").innerText = policy + "%";
document.getElementById("public").innerText = publicResp + "%";
document.getElementById("economic").innerText = economic + "%";

const ardScore = Math.round((policy + publicResp + economic) / 3);
const circle = document.querySelector(".progress-circle");
const ardValue = document.getElementById("ardValue");
const status = document.getElementById("ardStatus");

let current = 0;

const interval = setInterval(() => {
  if (current <= ardScore) {
    ardValue.innerText = current;
    circle.style.background =
      `conic-gradient(#ff4ecd ${current * 3.6}deg, #3f87ff ${current * 3.6}deg, #1a1a2e 0deg)`;
    current++;
  } else {
    clearInterval(interval);
  }
}, 20);

if (ardScore < 40) status.innerText = "⚠️ High Administrative Drift";
else if (ardScore < 70) status.innerText = "⚡ Moderate Administrative Drift";
else status.innerText = "✅ Low Administrative Drift";
