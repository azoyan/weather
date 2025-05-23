function perceivedTemperature(t, h, w, night, cloudy) {
  let result = t;
  if (h > 70) result -= (h - 70) * 0.05;
  if (h < 30) result += (30 - h) * 0.03;
  result -= w * 0.1;
  if (night) result -= 2;
  if (cloudy) result -= 1;
  return result.toFixed(1);
}

function updateResult() {
  const t = parseFloat(document.getElementById("temp").value);
  const h = parseFloat(document.getElementById("humidity").value);
  let w = parseFloat(document.getElementById("wind").value);

  const unit = document.querySelector('input[name="windUnit"]:checked').value;
  if (unit === "ms") {
    w *= 3.6; // м/с → км/ч
  }

  const night = document.getElementById("isNight").checked;
  const cloudy = document.getElementById("isCloudy").checked;

  if (!isNaN(t) && !isNaN(h) && !isNaN(w)) {
    const result = perceivedTemperature(t, h, w, night, cloudy);
    document.getElementById("result").textContent = `Ощущается как ${result} °C`;
  } else {
    document.getElementById("result").textContent = '';
  }
}

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", updateResult);
  input.addEventListener("change", updateResult);
});
updateResult();
